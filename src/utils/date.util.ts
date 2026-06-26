import { AD2BS, BS2AD, type DateFormat } from "./nepali-functions.utils";
import {
  BS_CALENDAR_DATA,
  EPOCH,
  MONTH_EN,
  MONTH_SHORT_EN,
  MONTH_NP,
  MONTH_SHORT_NP,
  NUMBER_NP,
  WEEK_EN,
  WEEK_SHORT_EN,
  WEEK_NP,
  WEEK_SHORT_NP,
} from "../constant/nepaliDate.constant";

export interface NepaliDateMapEntry {
  year: number;
  days: number[];
  totalDays: number;
  daysTillNow: number;
}

function buildNepaliDateMap(): NepaliDateMapEntry[] {
  return Object.entries(BS_CALENDAR_DATA)
    .map(([year, days]) => ({
      year: Number(year),
      days,
      totalDays: days.reduce((sum, d) => sum + d, 0),
      daysTillNow: 0,
    }))
    .sort((a, b) => a.year - b.year);
}

let ndTotalDays = 0;
export const NEPALI_DATE_MAP: NepaliDateMapEntry[] = buildNepaliDateMap();
NEPALI_DATE_MAP.forEach((entry) => {
  ndTotalDays += entry.totalDays;
  entry.daysTillNow = ndTotalDays;
});

export function formatDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function createDate(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}

export function getLastDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function convertAD2BS(
  date: Date | string,
  format?: DateFormat,
  returnFormat?: DateFormat,
) {
  format = format || "YYYY-MM-DD";
  returnFormat = returnFormat || format;

  if (date instanceof Date) {
    date = formatDate(date);
  }

  date = date.split("T")[0];
  return AD2BS(date, format, returnFormat);
}

export function convertBS2AD(date: Date | string, format?: DateFormat) {
  format = format || "YYYY-MM-DD";

  if (date instanceof Date) {
    date = formatDate(date);
  }

  date = date.split("T")[0];
  return BS2AD(date, format, format);
}

/**
 * Pads a number with a leading zero if it's less than 10.
 */
function pad(n: number): string {
  return n < 10 ? `0${String(n)}` : String(n);
}

/**
 * Converts a string of digits into Nepali digits.
 */
function npDigit(str: string): string {
  let res = "";
  for (let i = 0; i < str.length; i += 1) {
    res += NUMBER_NP[str.charCodeAt(i) - 48];
  }
  return res;
}

type DateFormatter = (date: NepaliDate) => string;

function yearEn(size: number): DateFormatter {
  return (date: NepaliDate): string => {
    if (size <= 2) return String(date.getYear()).substring(2);
    if (size === 3) return String(date.getYear()).substring(1);
    return String(date.getYear());
  };
}

function yearNp(size: number): DateFormatter {
  return (date: NepaliDate): string => {
    if (size <= 2) return npDigit(String(date.getYear()).substring(2));
    if (size === 3) return npDigit(String(date.getYear()).substring(1));
    return npDigit(String(date.getYear()));
  };
}

function monthEn(size: number): DateFormatter {
  return (date: NepaliDate): string => {
    if (size === 1) return String(date.getMonth() + 1);
    if (size === 2) return pad(date.getMonth() + 1);
    if (size === 3) return MONTH_SHORT_EN[date.getMonth()];
    return MONTH_EN[date.getMonth()];
  };
}

function monthNp(size: number): DateFormatter {
  return (date: NepaliDate): string => {
    if (size === 1) return npDigit(String(date.getMonth() + 1));
    if (size === 2) return npDigit(pad(date.getMonth() + 1));
    if (size === 3) return MONTH_SHORT_NP[date.getMonth()];
    return MONTH_NP[date.getMonth()];
  };
}

function dateEn(size: number): DateFormatter {
  return (date: NepaliDate): string => {
    if (size === 1) return String(date.getDate());
    if (size === 2) return pad(date.getDate());
    if (size === 3) return WEEK_SHORT_EN[date.getDay()];
    return WEEK_EN[date.getDay()];
  };
}

function dateNp(size: number): DateFormatter {
  return (date: NepaliDate): string => {
    if (size === 1) return npDigit(String(date.getDate()));
    if (size === 2) return npDigit(pad(date.getDate()));
    if (size === 3) return WEEK_SHORT_NP[date.getDay()];
    return WEEK_NP[date.getDay()];
  };
}

function pass(seq: string): DateFormatter {
  return (): string => seq;
}

const fn: Record<string, (size: number) => DateFormatter> = {
  Y: yearEn,
  y: yearNp,
  M: monthEn,
  m: monthNp,
  D: dateEn,
  d: dateNp,
};

function isSpecial(ch: string): boolean {
  return ch in fn;
}

function tokenize(formatStr: string): DateFormatter[] {
  let inQuote = false;
  let seq = "";
  let special = "";
  let specialSize = 0;
  const tokens: DateFormatter[] = [];

  for (const ch of formatStr) {
    if (ch === special) {
      specialSize += 1;
      continue;
    }

    if (special !== "") {
      tokens.push(fn[special](specialSize));
      special = "";
      specialSize = 0;
    }

    if (ch === '"') {
      inQuote = !inQuote;
      continue;
    }

    if (!isSpecial(ch) || inQuote) {
      seq += ch;
    } else {
      if (seq) {
        tokens.push(pass(seq));
        seq = "";
      }
      special = ch;
      specialSize = 1;
    }
  }

  if (seq) {
    tokens.push(pass(seq));
  } else if (special) {
    tokens.push(fn[special](specialSize));
  }

  return tokens;
}

/**
 * Formats a NepaliDate using the specified format string.
 */
export function formatNepaliDate(nepaliDate: NepaliDate, formatStr: string): string {
  return tokenize(formatStr)
    .map((f) => f(nepaliDate))
    .join("");
}

function _parse(dateString: string): [number, number, number] {
  const parts = dateString.split(/[-./]/, 3);
  const [year, month = 1, day = 1] = parts.map((d) => {
    const n = parseInt(d, 10);
    if (Number.isNaN(n)) {
      throw new Error("Invalid date");
    }
    return n;
  });
  if (year < NEPALI_DATE_MAP[0].year || year >= NEPALI_DATE_MAP[0].year + NEPALI_DATE_MAP.length) {
    throw new Error("Nepal year out of range");
  }
  if (month < 1 || month > 12) {
    throw new Error("Invalid nepali month must be between 1 - 12");
  }
  const daysInMonth = NEPALI_DATE_MAP[year - NEPALI_DATE_MAP[0].year].days[month - 1];
  if (day < 1 || day > daysInMonth) {
    throw new Error(
      `Invalid nepali date must be between 1 - ${String(daysInMonth)} in ${String(year)} ${String(month)}`
    );
  }
  return [year, month - 1, day];
}

export class NepaliDate {
  public timestamp!: Date;
  public year!: number;
  public month!: number;
  public day!: number;

  constructor(yearOrDate?: Date | NepaliDate | number | string, month?: number, day?: number) {
    if (yearOrDate == undefined) {
      this.setEnglishDate(new Date());
    } else if (typeof yearOrDate === "object") {
      if (yearOrDate instanceof Date) {
        this.setEnglishDate(yearOrDate);
      } else if (yearOrDate instanceof NepaliDate) {
        this.timestamp = yearOrDate.timestamp;
        this.year = yearOrDate.year;
        this.month = yearOrDate.month;
        this.day = yearOrDate.day;
      } else {
        throw new Error("Invalid argument syntax");
      }
    } else if (typeof yearOrDate === "string") {
      this.set(..._parse(yearOrDate));
    } else if (typeof yearOrDate === "number" && month !== undefined && day !== undefined) {
      this.set(yearOrDate, month, day);
    } else if (typeof yearOrDate === "number") {
      this.setEnglishDate(new Date(yearOrDate));
    } else {
      throw new Error("Invalid argument syntax");
    }
  }

  private setEnglishDate(date: Date): void {
    this.timestamp = date;
    const utcTime = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    let daysCount = Math.floor((utcTime - EPOCH) / 86400000);
    let idx = Math.floor(daysCount / 366);
    while (daysCount >= NEPALI_DATE_MAP[idx].daysTillNow) {
      idx += 1;
    }
    const prevTillNow = NEPALI_DATE_MAP[idx - 1]?.daysTillNow ?? 0;
    daysCount -= prevTillNow;
    const tmp = NEPALI_DATE_MAP[idx];
    this.year = tmp.year;
    this.month = 0;
    while (daysCount >= tmp.days[this.month]) {
      this.month += 1;
      daysCount -= tmp.days[this.month - 1];
    }
    this.day = daysCount + 1;
  }

  public set(year: number, month: number, date: number): void {
    const idx = year + Math.floor(month / 12) - NEPALI_DATE_MAP[0].year;
    if (idx < 0 || idx >= NEPALI_DATE_MAP.length) {
      throw new Error("Nepal year out of range!");
    }
    const tmp = NEPALI_DATE_MAP[idx];
    let d = tmp.daysTillNow - tmp.totalDays;
    const m = month % 12;
    const mm = m < 0 ? 12 + m : m;
    for (let i = 0; i < mm; i += 1) {
      d += tmp.days[i];
    }
    d += date - 1;
    const utcTimestamp = EPOCH + d * 86400000;
    const utcDate = new Date(utcTimestamp);
    this.setEnglishDate(utcDate);
  }

  public format(formatStr: string): string {
    return formatNepaliDate(this, formatStr);
  }

  public clone(): NepaliDate {
    return new NepaliDate(this);
  }

  public toString(): string {
    return `${String(this.year)}/${String(this.month + 1)}/${String(this.day)}`;
  }

  public getEnglishDate(): Date {
    return this.timestamp;
  }

  public parse(dateString: string): void {
    this.set(..._parse(dateString));
  }

  public getYear(): number {
    return this.year;
  }

  public getMonth(): number {
    return this.month;
  }

  public getDay(): number {
    return this.timestamp.getDay();
  }

  public getDate(): number {
    return this.day;
  }

  public getHours(): number {
    return this.timestamp.getHours();
  }

  public getMinutes(): number {
    return this.timestamp.getMinutes();
  }

  public getSeconds(): number {
    return this.timestamp.getSeconds();
  }

  public getMilliseconds(): number {
    return this.timestamp.getMilliseconds();
  }

  public getTime(): number {
    return this.timestamp.getTime();
  }

  public setYear(year: number): void {
    this.set(year, this.month, this.day);
  }

  public setMonth(month: number): void {
    this.set(this.year, month, this.day);
  }

  public setDate(day: number): void {
    this.set(this.year, this.month, day);
  }

  public addDays(days: number): NepaliDate {
    const newTimestamp = new Date(this.timestamp.getTime() + days * 86400000);
    return new NepaliDate(newTimestamp);
  }

  public addMonths(months: number): NepaliDate {
    let newYear = this.year;
    let newMonth = this.month + months;
    newYear += Math.floor(newMonth / 12);
    newMonth = newMonth % 12;
    if (newMonth < 0) {
      newMonth += 12;
      newYear -= 1;
    }
    const yearIndex = newYear - NEPALI_DATE_MAP[0].year;
    if (yearIndex < 0 || yearIndex >= NEPALI_DATE_MAP.length) {
      throw new Error("Resulting date is out of supported range");
    }
    const daysInNewMonth = NEPALI_DATE_MAP[yearIndex].days[newMonth];
    const newDay = Math.min(this.day, daysInNewMonth);
    return new NepaliDate(newYear, newMonth, newDay);
  }

  public addYears(years: number): NepaliDate {
    const newYear = this.year + years;
    if (newYear < NEPALI_DATE_MAP[0].year || newYear >= NEPALI_DATE_MAP[0].year + NEPALI_DATE_MAP.length) {
      throw new Error("Resulting date is out of supported range");
    }
    const yearIndex = newYear - NEPALI_DATE_MAP[0].year;
    const daysInMonth = NEPALI_DATE_MAP[yearIndex].days[this.month];
    const newDay = Math.min(this.day, daysInMonth);
    return new NepaliDate(newYear, this.month, newDay);
  }

  public static minimum(): Date {
    return new Date(EPOCH);
  }

  public static maximum(): Date {
    return new Date(EPOCH + NEPALI_DATE_MAP[NEPALI_DATE_MAP.length - 1].daysTillNow * 86400000);
  }

  public daysInMonth(year?: number, month?: number): number {
    if (month !== undefined && (month < 0 || month > 11)) {
      throw new Error("Invalid month index, must be between 0-11");
    }
    const yearIndex = (year ?? this.year) - NEPALI_DATE_MAP[0].year;
    return NEPALI_DATE_MAP[yearIndex].days[month ?? this.month];
  }

  public isLeapYear(): boolean {
    const yearIndex = this.year - NEPALI_DATE_MAP[0].year;
    return NEPALI_DATE_MAP[yearIndex].totalDays >= 366;
  }

  public getWeeksInMonth(): number {
    const firstDay = new NepaliDate(this.year, this.month, 1);
    const firstDayOfWeek = firstDay.getDay();
    const totalDays = this.daysInMonth();
    return Math.ceil((firstDayOfWeek + totalDays) / 7);
  }

  public diff(date: NepaliDate, unit: "year" | "month" | "day"): number {
    switch (unit) {
      case "day":
        return Math.floor((this.timestamp.getTime() - date.timestamp.getTime()) / 86400000);
      case "month": {
        const yearDiff = this.year - date.year;
        const monthDiff = this.month - date.month;
        return yearDiff * 12 + monthDiff;
      }
      case "year":
        return this.year - date.year;
      default:
        throw new Error("Invalid unit for diff calculation");
    }
  }

  public startOfDay(): NepaliDate {
    const date = new Date(this.timestamp);
    date.setHours(0, 0, 0, 0);
    return new NepaliDate(date);
  }

  public endOfDay(): NepaliDate {
    const date = new Date(this.timestamp);
    date.setHours(23, 59, 59, 999);
    return new NepaliDate(date);
  }

  startOfWeek(startOfWeek = 0): NepaliDate {
    if (startOfWeek < 0 || startOfWeek > 6 || !Number.isInteger(startOfWeek)) {
      throw new Error("startOfWeek must be an integer between 0 and 6");
    }
    const currentDay = this.getDay();
    const daysToSubtract = (currentDay - startOfWeek + 7) % 7;
    const result = this.clone().startOfDay();
    return result.addDays(-daysToSubtract);
  }

  endOfWeek(startOfWeek = 0): NepaliDate {
    if (startOfWeek < 0 || startOfWeek > 6 || !Number.isInteger(startOfWeek)) {
      throw new Error("startOfWeek must be an integer between 0 and 6");
    }
    const weekStart = this.startOfWeek(startOfWeek);
    const result = weekStart.addDays(6);
    return result.endOfDay();
  }

  public startOfMonth(): NepaliDate {
    return new NepaliDate(this.year, this.month, 1);
  }

  public endOfMonth(): NepaliDate {
    const daysInMonth = this.daysInMonth();
    return new NepaliDate(this.year, this.month, daysInMonth).endOfDay();
  }

  public startOfYear(): NepaliDate {
    return new NepaliDate(this.year, 0, 1);
  }

  public endOfYear(): NepaliDate {
    const yearIndex = this.year - NEPALI_DATE_MAP[0].year;
    const daysInChaitra = NEPALI_DATE_MAP[yearIndex].days[11];
    return new NepaliDate(this.year, 11, daysInChaitra).endOfDay();
  }

  public static getMonthName(month: number, short = false, nepali = false): string {
    if (month < 0 || month > 11) {
      throw new Error("Invalid month index, must be between 0-11");
    }
    if (nepali) {
      return short ? MONTH_SHORT_NP[month] : MONTH_NP[month];
    }
    return short ? MONTH_SHORT_EN[month] : MONTH_EN[month];
  }

  public static getDayName(day: number, short = false, nepali = false): string {
    if (day < 0 || day > 6) {
      throw new Error("Invalid day index, must be between 0-6");
    }
    if (nepali) {
      return short ? WEEK_SHORT_NP[day] : WEEK_NP[day];
    }
    return short ? WEEK_SHORT_EN[day] : WEEK_EN[day];
  }

  public static isValid(year: number, month: number, day: number): boolean {
    try {
      if (year < NEPALI_DATE_MAP[0].year || year >= NEPALI_DATE_MAP[0].year + NEPALI_DATE_MAP.length) {
        return false;
      }
      if (month < 0 || month > 11) {
        return false;
      }
      const yearIndex = year - NEPALI_DATE_MAP[0].year;
      const daysInMonth = NEPALI_DATE_MAP[yearIndex].days[month];
      if (day < 1 || day > daysInMonth) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  public isValid(): boolean {
    return NepaliDate.isValid(this.year, this.month, this.day);
  }

  public static getCalendarDays(
    year: number,
    month: number
  ): {
    prevRemainingDays: number;
    prevMonth: { year: number; month: number; days: number[] };
    currentMonth: { year: number; month: number; days: number[] };
    nextMonth: { year: number; month: number; days: number[] };
    remainingDays: number;
  } {
    if (!NepaliDate.isValid(year, month, 1)) {
      throw new Error("Invalid year or month");
    }

    const prevMonthMap: { year: number; month: number; days: number[] } = {
      year: 0, month: 0, days: [],
    };
    const currentMonthMap: { year: number; month: number; days: number[] } = {
      year: 0, month: 0, days: [],
    };
    const nextMonthMap: { year: number; month: number; days: number[] } = {
      year: 0, month: 0, days: [],
    };

    const yearIndex = year - NEPALI_DATE_MAP[0].year;
    const firstDay = new NepaliDate(year, month, 1);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = NEPALI_DATE_MAP[yearIndex].days[month];

    currentMonthMap.year = year;
    currentMonthMap.month = month;

    let prevMonth = month - 1;
    let prevYear = year;
    let nextMonth = month + 1;
    let nextYear = year;

    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }

    if (prevYear >= NEPALI_DATE_MAP[0].year) {
      prevMonthMap.year = prevYear;
      prevMonthMap.month = prevMonth;
    }

    if (prevYear >= NEPALI_DATE_MAP[0].year && firstDayOfWeek > 0) {
      const prevMonthIndex = prevYear - NEPALI_DATE_MAP[0].year;
      const daysInPrevMonth = NEPALI_DATE_MAP[prevMonthIndex].days[prevMonth];
      for (let i = 0; i < firstDayOfWeek; i++) {
        prevMonthMap.days.push(daysInPrevMonth - firstDayOfWeek + i + 1);
      }
    }

    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthMap.days.push(i);
    }

    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear++;
    }

    if (nextYear < NEPALI_DATE_MAP[0].year + NEPALI_DATE_MAP.length) {
      nextMonthMap.year = nextYear;
      nextMonthMap.month = nextMonth;
    }

    const remainingDays = 42 - firstDayOfWeek - currentMonthMap.days.length;

    if (nextYear < NEPALI_DATE_MAP[0].year + NEPALI_DATE_MAP.length && remainingDays > 0) {
      for (let i = 1; i <= remainingDays; i++) {
        nextMonthMap.days.push(i);
      }
    }

    return {
      prevRemainingDays: firstDayOfWeek,
      prevMonth: prevMonthMap,
      currentMonth: currentMonthMap,
      nextMonth: nextMonthMap,
      remainingDays: remainingDays,
    };
  }

  public isAfter(date: NepaliDate): boolean {
    return this.timestamp.getTime() > date.timestamp.getTime();
  }

  public isBefore(date: NepaliDate): boolean {
    return this.timestamp.getTime() < date.timestamp.getTime();
  }

  public isEqual(date: NepaliDate): boolean {
    return this.year === date.year && this.month === date.month && this.day === date.day;
  }

  public isSame(date: NepaliDate, unit: "year" | "month" | "day"): boolean {
    switch (unit) {
      case "year":
        return this.year === date.year;
      case "month":
        return this.year === date.year && this.month === date.month;
      case "day":
        return this.isEqual(date);
      default:
        throw new Error("Invalid unit for comparison");
    }
  }

  static getQuarter(quarter: number, year?: number): { start: NepaliDate; end: NepaliDate } {
    if (quarter < 1 || quarter > 4 || !Number.isInteger(quarter)) {
      throw new Error("Quarter must be an integer between 1 and 4");
    }
    const nepaliYear = year ?? new NepaliDate().getYear();
    const startMonth = (quarter - 1) * 3;
    const start = new NepaliDate(nepaliYear, startMonth, 1);
    const end = new NepaliDate(nepaliYear, startMonth + 2, 1).endOfMonth();
    return { start, end };
  }

  getCurrentQuarter(): number {
    return Math.floor(this.month / 3) + 1;
  }

  static getQuarters(year?: number): {
    Q1: { start: NepaliDate; end: NepaliDate };
    Q2: { start: NepaliDate; end: NepaliDate };
    Q3: { start: NepaliDate; end: NepaliDate };
    Q4: { start: NepaliDate; end: NepaliDate };
  } {
    const nepaliYear = year ?? new NepaliDate().getYear();
    return {
      Q1: NepaliDate.getQuarter(1, nepaliYear),
      Q2: NepaliDate.getQuarter(2, nepaliYear),
      Q3: NepaliDate.getQuarter(3, nepaliYear),
      Q4: NepaliDate.getQuarter(4, nepaliYear),
    };
  }

  static getCurrentFiscalYear(): number {
    const today = new NepaliDate();
    const year = today.getYear();
    const month = today.getMonth();
    return month < 3 ? year - 1 : year;
  }

  static getFiscalYearQuarter(quarter: number, fiscalYear?: number): { start: NepaliDate; end: NepaliDate } {
    if (quarter < 1 || quarter > 4 || !Number.isInteger(quarter)) {
      throw new Error("Quarter must be an integer between 1 and 4");
    }
    const currentFiscalYear = fiscalYear ?? NepaliDate.getCurrentFiscalYear();
    let startYear = currentFiscalYear;
    let startMonth = (quarter - 1) * 3 + 3;
    if (quarter === 4) {
      startYear = currentFiscalYear + 1;
      startMonth = 0;
    }
    if (startMonth > 11) {
      startYear++;
      startMonth -= 12;
    }
    let endMonth = startMonth + 2;
    let endYear = startYear;
    if (endMonth > 11) {
      endYear++;
      endMonth -= 12;
    }
    const start = new NepaliDate(startYear, startMonth, 1);
    const end = new NepaliDate(endYear, endMonth, 1).endOfMonth();
    return { start, end };
  }

  getCurrentFiscalYearQuarter(): number {
    const month = this.getMonth();
    if (month >= 3 && month <= 5) return 1;
    if (month >= 6 && month <= 8) return 2;
    if (month >= 9 && month <= 11) return 3;
    return 4;
  }

  getCurrentFiscalYearQuarterDates(): { start: NepaliDate; end: NepaliDate } {
    const currentQuarter = this.getCurrentFiscalYearQuarter();
    const currentFiscalYear = NepaliDate.getCurrentFiscalYear();
    return NepaliDate.getFiscalYearQuarter(currentQuarter, currentFiscalYear);
  }

  static getFiscalYearQuarters(fiscalYear?: number): {
    Q1: { start: NepaliDate; end: NepaliDate };
    Q2: { start: NepaliDate; end: NepaliDate };
    Q3: { start: NepaliDate; end: NepaliDate };
    Q4: { start: NepaliDate; end: NepaliDate };
  } {
    const year = fiscalYear ?? NepaliDate.getCurrentFiscalYear();
    return {
      Q1: NepaliDate.getFiscalYearQuarter(1, year),
      Q2: NepaliDate.getFiscalYearQuarter(2, year),
      Q3: NepaliDate.getFiscalYearQuarter(3, year),
      Q4: NepaliDate.getFiscalYearQuarter(4, year),
    };
  }
}
