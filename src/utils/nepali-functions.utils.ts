import { BS_CALENDAR_DATA } from "../constant/nepaliDate.constant";

export interface DateObject {
  year: number;
  month: number;
  day: number;
}

export type DateFormat =
  | "YYYY-MM-DD"
  | "YYYY/MM/DD"
  | "YYYY.MM.DD"
  | "DD-MM-YYYY"
  | "DD/MM/YYYY"
  | "DD.MM.YYYY"
  | "MM-DD-YYYY"
  | "MM/DD/YYYY";

export type DateCompareType = "==" | "<" | "<=" | ">" | ">=";

export type DateType = "AD" | "BS";

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type AdDayName =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type AdDayShort = "S" | "M" | "T" | "W" | "F";

export type AdMonthName =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type BsMonthName =
  | "Baisakh"
  | "Jestha"
  | "Ashar"
  | "Shrawan"
  | "Bhadra"
  | "Ashoj"
  | "Kartik"
  | "Mangsir"
  | "Poush"
  | "Magh"
  | "Falgun"
  | "Chaitra";

export interface ParsedDate {
  parsedDate: DateObject | null;
  parsedFormat: string[];
}

export interface DateObjectAndFormat {
  dateObject: DateObject;
  dateFormat: DateFormat;
}

export interface BsCalendarData {
  [year: number]: number[];
}

export interface ADNamespace {
  GetCurrentDate(dateFormat?: DateFormat): DateObject | string;
  GetCurrentYear(): number;
  GetCurrentMonth(): number;
  GetCurrentDay(): number;
  GetMonths(): AdMonthName[];
  GetMonth(number: number): AdMonthName | null;
  GetDays(): AdDayName[];
  GetDay(number: number): AdDayName | null;
  GetDaysShort(): string[];
  GetDayShort(number: number): string | null;
  GetDaysInMonth(year: number, month: number): number;
  DatesDiff(
    startDate: DateObject | string,
    endDate: DateObject | string,
    dateFormat?: DateFormat,
  ): number | null;
  AddDays(
    adDate: DateObject | string | Date,
    noOfDays: number,
    dateFormat?: DateFormat,
  ): DateObject | string | null;
  GetFullDate(
    adDate: DateObject | string | Date,
    dateFormat?: DateFormat,
  ): string | null;
  GetFullDay(
    adDate: DateObject | string | Date,
    dateFormat?: DateFormat,
  ): AdDayName | null;
}

export interface BSNamespace {
  ValidateDate(bsDate: DateObject | string, dateFormat?: DateFormat): boolean;
  IsBetweenDates(
    checkDate: DateObject | string,
    startDate: DateObject | string,
    endDate: DateObject | string,
    dateFormat?: DateFormat,
    inclusive?: boolean,
  ): boolean | null;
  GetCurrentDate(dateFormat?: DateFormat): DateObject | string | null;
  GetCurrentYear(): number;
  GetCurrentMonth(): number;
  GetCurrentDay(): number;
  GetMonths(): BsMonthName[];
  GetMonth(number: number): BsMonthName | null;
  GetMonthsInUnicode(): string[];
  GetMonthInUnicode(number: number): string | null;
  GetFullDate(
    bsDate: DateObject | string,
    unicodeFlag?: boolean,
    dateFormat?: DateFormat,
  ): string | null;
  GetDaysUnicode(): string[];
  GetDayUnicode(number: number): string | null;
  GetDaysUnicodeShort(): string[];
  GetDayUnicodeShort(number: number): string | null;
  GetFullDay(
    bsDate: DateObject | string,
    dateFormat?: DateFormat,
  ): AdDayName | null;
  GetFullDayInUnicode(
    bsDate: DateObject | string,
    dateFormat?: DateFormat,
  ): string | null;
  GetDaysInMonth(year: number, month: number): number;
  DatesDiff(
    startDate: DateObject | string,
    endDate: DateObject | string,
    dateFormat?: DateFormat,
  ): number | null;
  AddDays(
    bsDate: DateObject | string,
    noOfDays: number,
    dateFormat?: DateFormat,
  ): DateObject | string | null;
  IsEqualTo(
    date1: DateObject | string,
    date2: DateObject | string,
    dateFormat?: DateFormat,
  ): boolean | null;
  IsGreaterThan(
    date1: DateObject | string,
    date2: DateObject | string,
    dateFormat?: DateFormat,
  ): boolean | null;
  IsLessThan(
    date1: DateObject | string,
    date2: DateObject | string,
    dateFormat?: DateFormat,
  ): boolean | null;
  IsGreaterThanOrEqualTo(
    date1: DateObject | string,
    date2: DateObject | string,
    dateFormat?: DateFormat,
  ): boolean | null;
  IsLessThanOrEqualTo(
    date1: DateObject | string,
    date2: DateObject | string,
    dateFormat?: DateFormat,
  ): boolean | null;
  MinimumDate(): DateObject;
  MaximumDate(): DateObject;
}

export interface NepaliFunctionsType {
  AvailableFormats: DateFormat[];
  IsValidDateFormat(dateFormat: string): dateFormat is DateFormat;
  Get2DigitNo(number: number): string;
  ParseDate(dateString: string): ParsedDate | null;
  ConvertToDateObject(
    dateString: string,
    dateFormat: DateFormat,
  ): DateObject | null;
  ConvertToDateFormat(dateObject: DateObject, returnFormat: DateFormat): string;
  AD2BS(
    adDate: DateObject | string | Date,
    sourceDateFormat?: DateFormat,
    returnDateFormat?: DateFormat,
  ): DateObject | string | null;
  BS2AD(
    bsDate: DateObject | string,
    sourceDateFormat?: DateFormat,
    returnDateFormat?: DateFormat,
  ): DateObject | string | null;
  ConvertToUnicode(number: number | string): string;
  ConvertToNumber(unicode: string): string;
  DefaultBsDateFormat: DateFormat;
  DefaultAdDateFormat: DateFormat;
  AD: ADNamespace;
  BS: BSNamespace;
}

export const DATE_FORMATS: DateFormat[] = [
  "YYYY-MM-DD",
  "YYYY/MM/DD",
  "YYYY.MM.DD",
  "DD-MM-YYYY",
  "DD/MM/YYYY",
  "DD.MM.YYYY",
  "MM-DD-YYYY",
  "MM/DD/YYYY",
];

export const DATE_COMPARE_TYPES: Record<string, DateCompareType> = {
  IsEqualTo: "==",
  IsLessThan: "<",
  IsLessThanOrEqualTo: "<=",
  IsGreaterThan: ">",
  IsGreaterThanOrEqualTo: ">=",
};

export const DATE_TYPES: Record<string, DateType> = {
  AD: "AD",
  BS: "BS",
};

export const DEFAULT_BS_DATE_FORMAT: DateFormat = "YYYY-MM-DD";
export const DEFAULT_AD_DATE_FORMAT: DateFormat = "YYYY-MM-DD";

class NepaliDateConverter {
  readonly #bs: BsCalendarData;
  readonly #bsDateEq: DateObject = { year: 2000, month: 9, day: 17 };
  readonly #adDateEq: DateObject = { year: 1944, month: 1, day: 1 };
  readonly #minimumDate: DateObject = { year: 1970, month: 1, day: 1 };
  readonly #maximumDate: DateObject = { year: 2100, month: 12, day: 30 };

  constructor() {
    this.#bs = BS_CALENDAR_DATA as BsCalendarData;
  }

  minDate(): DateObject {
    return this.#minimumDate;
  }

  maxDate(): DateObject {
    return this.#maximumDate;
  }

  #arraySum(array: number[]): number {
    return array.reduce((sum, val) => sum + val, 0);
  }

  countAdDays(startDate: DateObject, endDate: DateObject): number {
    const date1 = Date.UTC(startDate.year, startDate.month - 1, startDate.day);
    const date2 = Date.UTC(endDate.year, endDate.month - 1, endDate.day);
    return Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));
  }

  countBsDays(startDate: DateObject, endDate: DateObject): number {
    let days = 0;

    for (let i = startDate.year; i <= endDate.year; i++) {
      days += this.#arraySum(this.#bs[i]);
    }

    for (let i = 0; i < startDate.month; i++) {
      days -= this.#bs[startDate.year][i];
    }

    days += this.#bs[startDate.year][11];

    for (let i = endDate.month - 1; i < 12; i++) {
      days -= this.#bs[endDate.year][i];
    }

    days -= startDate.day + 1;
    days += endDate.day - 1;

    return days;
  }

  addAdDays(adDate: DateObject, numDays: number): DateObject {
    const d = new Date(convertToDateFormat(adDate, DEFAULT_AD_DATE_FORMAT));
    d.setDate(d.getDate() + numDays);
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
    };
  }

  addBsDays(bsDate: DateObject, numDays: number): DateObject {
    const result: DateObject = { ...bsDate };
    result.day += numDays;

    while (result.day > this.#bs[result.year][result.month - 1]) {
      result.day -= this.#bs[result.year][result.month - 1];
      result.month++;
      if (result.month > 12) {
        result.month = 1;
        result.year++;
      }
    }

    return result;
  }

  bs2ad(bsDate: DateObject): DateObject {
    const daysCount = this.countBsDays(this.#bsDateEq, bsDate);
    return this.addAdDays(this.#adDateEq, daysCount);
  }

  ad2bs(adDate: DateObject): DateObject {
    const daysCount = this.countAdDays(this.#adDateEq, adDate);
    return this.addBsDays(this.#bsDateEq, daysCount);
  }

  getDaysInMonth(year: number, month: number): number {
    return this.#bs[year][month - 1];
  }
}

// ─── Utility Functions ─────────────────────────────────────────────────────────

export function getEndDayOfMonth(year: number, month: number): number {
  const date = new NepaliDateConverter();
  return date.getDaysInMonth(year, month);
}

function isValidDateFormat(dateFormat: string): dateFormat is DateFormat {
  return (DATE_FORMATS as string[]).includes(dateFormat);
}

function isDateObject(obj: unknown): obj is DateObject {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as DateObject).year === "number" &&
    typeof (obj as DateObject).month === "number" &&
    typeof (obj as DateObject).day === "number"
  );
}

function getDateObjectAndFormat(
  dateObject: DateObject | string | Date,
  dateFormat?: DateFormat | string,
  dateType?: DateType,
): DateObjectAndFormat | null {
  let defaultDateFormat: DateFormat = DEFAULT_BS_DATE_FORMAT;
  let resultDateObject: DateObject | null = null;
  let resultDateFormat: DateFormat | string | undefined = dateFormat;

  if (dateType === DATE_TYPES.AD) {
    defaultDateFormat = DEFAULT_AD_DATE_FORMAT;
    if (Object.prototype.toString.call(dateObject) === "[object Date]") {
      const adDate = dateObject as Date;
      resultDateObject = {
        year: adDate.getFullYear(),
        month: adDate.getMonth() + 1,
        day: adDate.getDate(),
      };
      resultDateFormat = DEFAULT_AD_DATE_FORMAT;
    }
  }

  if (!isDateObject(dateObject)) {
    resultDateFormat =
      resultDateFormat && isValidDateFormat(resultDateFormat)
        ? resultDateFormat
        : defaultDateFormat;
    resultDateObject = convertToDateObject(
      dateObject as string,
      resultDateFormat as DateFormat,
    );
  } else {
    resultDateObject = dateObject;
  }

  if (!resultDateObject) return null;

  return {
    dateObject: resultDateObject,
    dateFormat: (resultDateFormat as DateFormat) || defaultDateFormat,
  };
}

function convertToDateFormat(
  dateObject: DateObject,
  returnFormat: string,
): string {
  const format: DateFormat = isValidDateFormat(returnFormat)
    ? returnFormat
    : DEFAULT_BS_DATE_FORMAT;

  const year = dateObject.year.toString();
  const month = dateObject.month.toString().padStart(2, "0");
  const day = dateObject.day.toString().padStart(2, "0");

  return format.replace("YYYY", year).replace("MM", month).replace("DD", day);
}

function convertToDateObject(
  dateString: string,
  dateFormat: DateFormat,
): DateObject | null {
  if (!dateString || !dateFormat) return null;

  type RawDateObject = { year: string; month: string; day: string };
  let dateParts: string[] = [];
  let dateObject: RawDateObject | null = null;

  switch (dateFormat) {
    case "MM/DD/YYYY":
      dateParts = dateString.split("/");
      if (dateParts.length === 3)
        dateObject = {
          year: dateParts[2],
          month: dateParts[0],
          day: dateParts[1],
        };
      break;
    case "MM-DD-YYYY":
      dateParts = dateString.split("-");
      if (dateParts.length === 3)
        dateObject = {
          year: dateParts[2],
          month: dateParts[0],
          day: dateParts[1],
        };
      break;
    case "YYYY-MM-DD":
      dateParts = dateString.split("-");
      if (dateParts.length === 3)
        dateObject = {
          year: dateParts[0],
          month: dateParts[1],
          day: dateParts[2],
        };
      break;
    case "YYYY/MM/DD":
      dateParts = dateString.split("/");
      if (dateParts.length === 3)
        dateObject = {
          year: dateParts[0],
          month: dateParts[1],
          day: dateParts[2],
        };
      break;
    case "YYYY.MM.DD":
      dateParts = dateString.split(".");
      if (dateParts.length === 3)
        dateObject = {
          year: dateParts[0],
          month: dateParts[1],
          day: dateParts[2],
        };
      break;
    case "DD-MM-YYYY":
      dateParts = dateString.split("-");
      if (dateParts.length === 3)
        dateObject = {
          year: dateParts[2],
          month: dateParts[1],
          day: dateParts[0],
        };
      break;
    case "DD/MM/YYYY":
      dateParts = dateString.split("/");
      if (dateParts.length === 3)
        dateObject = {
          year: dateParts[2],
          month: dateParts[1],
          day: dateParts[0],
        };
      break;
    case "DD.MM.YYYY":
      dateParts = dateString.split(".");
      if (dateParts.length === 3)
        dateObject = {
          year: dateParts[2],
          month: dateParts[1],
          day: dateParts[0],
        };
      break;
    default:
      return null;
  }

  if (!dateObject?.year || !dateObject?.month || !dateObject?.day) return null;

  return {
    year: Number(dateObject.year),
    month: Number(dateObject.month),
    day: Number(dateObject.day),
  };
}

export function convertToUnicode(number: number | string): string {
  const numberToUnicode: Record<string, string> = {
    "0": "०",
    "1": "१",
    "2": "२",
    "3": "३",
    "4": "४",
    "5": "५",
    "6": "६",
    "7": "७",
    "8": "८",
    "9": "९",
  };
  return number
    .toString()
    .split("")
    .map((c) => numberToUnicode[c] ?? c)
    .join("");
}

export function convertToNumber(unicode: string): string {
  const unicodeToNumber: Record<string, string> = {
    "०": "0",
    "१": "1",
    "२": "2",
    "३": "3",
    "४": "4",
    "५": "5",
    "६": "6",
    "७": "7",
    "८": "8",
    "९": "9",
  };
  return unicode
    .toString()
    .split("")
    .map((c) => unicodeToNumber[c] ?? c)
    .join("");
}

function getCurrentAdDate(): DateObject;
function getCurrentAdDate(dateFormat: DateFormat): string;
function getCurrentAdDate(dateFormat?: DateFormat): DateObject | string {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 5);
  currentDate.setMinutes(currentDate.getMinutes() + 45);

  const adDate: DateObject = {
    year: currentDate.getUTCFullYear(),
    month: currentDate.getUTCMonth() + 1,
    day: currentDate.getUTCDate(),
  };

  if (dateFormat) {
    const format = isValidDateFormat(dateFormat)
      ? dateFormat
      : DEFAULT_AD_DATE_FORMAT;
    return convertToDateFormat(adDate, format);
  }

  return adDate;
}

function getAdDay(number: number): AdDayName | null {
  const num = Number(number);
  if (isNaN(num) || num < 0 || num > 6) return null;
  const days: AdDayName[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[num];
}

function getAdDays(): AdDayName[] {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
}

function getAdDaysShort(): string[] {
  return ["S", "M", "T", "W", "T", "F", "S"];
}

export function getAdMonths(): AdMonthName[] {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
}

function compareBsDates(
  date1: DateObject | string,
  date2: DateObject | string,
  dateFormat: DateFormat | undefined,
  dateCompareType: DateCompareType,
): boolean | null {
  const date1ObjectAndFormat = getDateObjectAndFormat(date1, dateFormat);
  if (!date1ObjectAndFormat) return null;
  const dateObj1 = date1ObjectAndFormat.dateObject;

  const date2ObjectAndFormat = getDateObjectAndFormat(date2, dateFormat);
  if (!date2ObjectAndFormat) return null;
  const dateObj2 = date2ObjectAndFormat.dateObject;

  let timestamp1: number;
  let timestamp2: number;

  if (validateBsDate(dateObj1) && validateBsDate(dateObj2)) {
    const adDate1 = BS2AD(dateObj1);
    const adDate2 = BS2AD(dateObj2);

    if (
      !adDate1 ||
      !adDate2 ||
      typeof adDate1 === "string" ||
      typeof adDate2 === "string"
    )
      return null;

    timestamp1 = new Date(
      adDate1.year,
      adDate1.month - 1,
      adDate1.day,
    ).getTime();
    timestamp2 = new Date(
      adDate2.year,
      adDate2.month - 1,
      adDate2.day,
    ).getTime();
  } else {
    if (!isDateObject(dateObj1) || !isDateObject(dateObj2)) return null;
    timestamp1 = dateObj1.year * 10000 + dateObj1.month * 100 + dateObj1.day;
    timestamp2 = dateObj2.year * 10000 + dateObj2.month * 100 + dateObj2.day;
  }

  switch (dateCompareType) {
    case "==":
      return timestamp1 === timestamp2;
    case ">":
      return timestamp1 > timestamp2;
    case ">=":
      return timestamp1 >= timestamp2;
    case "<":
      return timestamp1 < timestamp2;
    case "<=":
      return timestamp1 <= timestamp2;
    default:
      return null;
  }
}

function getCurrentBsDate(): DateObject | null;
function getCurrentBsDate(dateFormat: DateFormat): string | null;
function getCurrentBsDate(dateFormat?: DateFormat): DateObject | string | null {
  const currentAdDate = getCurrentAdDate();
  if (!currentAdDate) return null;

  const adDateObject: DateObject =
    typeof currentAdDate === "string"
      ? (convertToDateObject(currentAdDate, DEFAULT_AD_DATE_FORMAT) ??
        (() => {
          throw new Error();
        })())
      : currentAdDate;

  const bsDate = AD2BS(adDateObject);
  if (!bsDate || typeof bsDate === "string") return null;

  if (dateFormat) {
    const format = isValidDateFormat(dateFormat)
      ? dateFormat
      : DEFAULT_BS_DATE_FORMAT;
    return convertToDateFormat(bsDate, format);
  }

  return bsDate;
}

function getBsDayInUnicode(number: number): string | null {
  const num = Number(number);
  if (isNaN(num) || num < 0 || num > 6) return null;
  const days = [
    "आइतवार",
    "सोमवार",
    "मङ्गलवार",
    "बुधवार",
    "बिहिवार",
    "शुक्रवार",
    "शनिवार",
  ];
  return days[num];
}

function getBsDaysInUnicodeShort(): string[] {
  return ["आ", "सो", "मं", "बु", "बि", "शु", "श"];
}

function getDaysInBsMonth(year: number, month: number): number {
  const ndc = new NepaliDateConverter();
  const minDate = ndc.minDate();
  const maxDate = ndc.maxDate();

  if (
    (year < minDate.year || year > maxDate.year) &&
    (month < minDate.month || month > maxDate.month)
  ) {
    return 0;
  }

  return ndc.getDaysInMonth(year, month);
}

function getBsDaysInUnicode(): string[] {
  return [
    "आइतवार",
    "सोमवार",
    "मङ्गलवार",
    "बुधवार",
    "बिहिवार",
    "शुक्रवार",
    "शनिवार",
  ];
}

export function getBsMonths(): BsMonthName[] {
  return [
    "Baisakh",
    "Jestha",
    "Ashar",
    "Shrawan",
    "Bhadra",
    "Ashoj",
    "Kartik",
    "Mangsir",
    "Poush",
    "Magh",
    "Falgun",
    "Chaitra",
  ];
}

function getBsMonthsInUnicode(): string[] {
  return [
    "बैशाख",
    "जेठ",
    "अषाढ",
    "श्रावण",
    "भाद्र",
    "आश्विन",
    "कार्तिक",
    "मङ्सिर",
    "पौष",
    "माघ",
    "फाल्गुन",
    "चैत्र",
  ];
}

function validateBsDate(
  bsDate: DateObject | string,
  dateFormat?: DateFormat,
): boolean {
  const bsDateObjectAndFormat = getDateObjectAndFormat(bsDate, dateFormat);
  if (!bsDateObjectAndFormat) return false;

  const dateObj = bsDateObjectAndFormat.dateObject;
  const ndp = new NepaliDateConverter();
  const minDate = ndp.minDate();
  const maxDate = ndp.maxDate();

  const bsDateInt = dateObj.day + 100 * dateObj.month + 10000 * dateObj.year;
  const minDateInt = minDate.day + 100 * minDate.month + 10000 * minDate.year;
  const maxDateInt = maxDate.day + 100 * maxDate.month + 10000 * maxDate.year;

  if (bsDateInt > maxDateInt || bsDateInt < minDateInt) return false;

  const totalDays = getDaysInBsMonth(dateObj.year, dateObj.month);
  return (
    dateObj.month > 0 &&
    dateObj.month <= 12 &&
    dateObj.day > 0 &&
    dateObj.day <= totalDays
  );
}

// ─── Main Conversion Functions ─────────────────────────────────────────────────

export function AD2BS(
  adDate: DateObject | string | Date,
  sourceDateFormat?: DateFormat,
  returnDateFormat?: DateFormat,
): DateObject | string | null {
  const dateObjectAndFormat = getDateObjectAndFormat(
    adDate,
    sourceDateFormat,
    DATE_TYPES.AD,
  );
  if (!dateObjectAndFormat) return null;

  const adDateObj = dateObjectAndFormat.dateObject;
  const bsDate = new NepaliDateConverter().ad2bs(adDateObj);

  if (sourceDateFormat) {
    const validReturnFormat = isValidDateFormat(returnDateFormat ?? "")
      ? (returnDateFormat as DateFormat)
      : DEFAULT_BS_DATE_FORMAT;
    return convertToDateFormat(bsDate, validReturnFormat);
  }

  return bsDate;
}

export function BS2AD(
  bsDate: DateObject | string,
  sourceDateFormat?: DateFormat,
  returnDateFormat?: DateFormat,
): DateObject | string | null {
  const bsDateObjectAndFormat = getDateObjectAndFormat(
    bsDate,
    sourceDateFormat,
  );
  if (!bsDateObjectAndFormat) return null;

  const bsDateObj = bsDateObjectAndFormat.dateObject;
  const adDate = new NepaliDateConverter().bs2ad(bsDateObj);

  if (sourceDateFormat) {
    const validReturnFormat = isValidDateFormat(returnDateFormat ?? "")
      ? (returnDateFormat as DateFormat)
      : DEFAULT_BS_DATE_FORMAT;
    return convertToDateFormat(adDate, validReturnFormat);
  }

  return adDate;
}

function parseDate(dateString: string): ParsedDate | null {
  const hasSlash = dateString.indexOf("/") > -1;
  const hasDash = dateString.indexOf("-") > -1;
  let parsedObj: ParsedDate | null = null;

  if (hasSlash) {
    const slashedDateParts = dateString.split("/");
    if (slashedDateParts.length === 3) {
      parsedObj = parseParts(slashedDateParts);
      parsedObj.parsedFormat = parsedObj.parsedFormat.join("/").split("");
    }
  } else if (hasDash) {
    const dashedDateParts = dateString.split("-");
    if (dashedDateParts.length === 3) {
      parsedObj = parseParts(dashedDateParts);
      parsedObj.parsedFormat = parsedObj.parsedFormat.join("-").split("");
    }
  }

  function parseParts(dateParts: string[]): ParsedDate {
    let parsedDate: DateObject | null = { year: 0, month: 0, day: 0 };
    const parsedIndex: string[] = [];

    interface CheckResult {
      index: number;
      value: number;
      year: boolean;
      month: boolean;
      day: boolean;
    }

    const checkResult: CheckResult[] = dateParts.map((datePart, index) => {
      const num = parseInt(datePart, 10);
      return {
        index,
        value: num,
        year: num > 999,
        month: num > 0 && num <= 12,
        day: num > 0 && (num > 12 || num <= 12),
      };
    });

    const yearObj = checkResult.find((r) => r.year);
    if (yearObj && parsedDate) {
      parsedDate.year = yearObj.value;
      parsedIndex[yearObj.index] = "YYYY";

      const dayObjs = checkResult.filter((r) => r.day && !r.year);
      const monthObjs = checkResult.filter((r) => r.month && !r.year);

      if (monthObjs.length === 1) {
        parsedDate.month = monthObjs[0].value;
        parsedIndex[monthObjs[0].index] = "MM";

        const dayObj =
          dayObjs.length === 1 ? dayObjs[0] : dayObjs.find((o) => !o.month);
        if (dayObj) {
          parsedDate.day = dayObj.value;
          parsedIndex[dayObj.index] = "DD";
        }
      } else if (monthObjs.length === 2) {
        const isYearFirst = yearObj.index === 0;
        parsedDate.day = monthObjs[isYearFirst ? 1 : 0].value;
        parsedDate.month = monthObjs[isYearFirst ? 0 : 1].value;
        parsedIndex[monthObjs[0].index] = isYearFirst ? "MM" : "DD";
        parsedIndex[monthObjs[1].index] = isYearFirst ? "DD" : "MM";
      }
    }

    if (parsedDate?.year && parsedDate?.month && parsedDate?.day) {
      const daysInMonth = getDaysInBsMonth(parsedDate.year, parsedDate.month);
      if (parsedDate.day > daysInMonth) parsedDate = null;
    } else {
      parsedDate = null;
    }

    return { parsedDate, parsedFormat: parsedDate ? parsedIndex : [] };
  }

  return parsedObj;
}

export function numberToWords(
  number: number,
  isCurrency = false,
): string | null {
  const num = Number(number) || 0;
  if (isNaN(num) || Math.floor(num).toString().length > 13) return null;

  function convert99ToWords(n: number): string {
    const digitWords = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tensWords = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    if (n < 20) return digitWords[n];
    return (
      tensWords[Math.floor(n / 10)] + (n % 10 ? " " + digitWords[n % 10] : "")
    );
  }

  const numberStr = num.toFixed(2);
  const [intPartStr, decPartStr] = numberStr.split(".");
  const intPart = Number(intPartStr);
  const decimals = Number(decPartStr);

  const units: { name: string; value: number }[] = [
    { name: "Kharab", value: 100_000_000_000 },
    { name: "Arab", value: 1_000_000_000 },
    { name: "Crore", value: 10_000_000 },
    { name: "Lakh", value: 100_000 },
    { name: "Thousand", value: 1_000 },
    { name: "Hundred", value: 100 },
  ];

  let words = "";
  let remaining = intPart;

  for (const unit of units) {
    if (remaining >= unit.value) {
      if (words) words += " ";
      words +=
        convert99ToWords(Math.floor(remaining / unit.value)) + " " + unit.name;
      remaining %= unit.value;
    }
  }

  if (remaining > 0) {
    if (words) words += " ";
    words += convert99ToWords(remaining);
  }

  if (words && isCurrency) words += " Rupees";
  if (decimals > 0 && isCurrency)
    words += " and " + convert99ToWords(decimals) + " Paisa";

  return words.trim();
}

export function numberToWordsUnicode(
  number: number,
  isCurrency = false,
): string | null {
  const num = number || 0;
  if (isNaN(num) || Math.floor(num).toString().length > 13) return null;

  const units = [
    "सुन्य",
    "एक",
    "दुई",
    "तीन",
    "चार",
    "पाँच",
    "छ",
    "सात",
    "आठ",
    "नौ",
    "दस",
    "एघार",
    "बाह्र",
    "तेह्र",
    "चौध",
    "पन्ध्र",
    "सोह्र",
    "सत्र",
    "अठाह्र",
    "उन्नाइस",
    "बीस",
    "एकाइस",
    "बाइस",
    "तेइस",
    "चौबीस",
    "पचीस",
    "छब्बीस",
    "सत्ताइस",
    "अठ्ठाइस",
    "उनन्तीस",
    "तीस",
    "एकतीस",
    "बतीस",
    "तेतीस",
    "चौतीस",
    "पैतीस",
    "छतीस",
    "सरतीस",
    "अरतीस",
    "उननचालीस",
    "चालीस",
    "एकचालीस",
    "बयालिस",
    "तीरचालीस",
    "चौवालिस",
    "पैंतालिस",
    "छयालिस",
    "सरचालीस",
    "अरचालीस",
    "उननचास",
    "पचास",
    "एकाउन्न",
    "बाउन्न",
    "त्रिपन्न",
    "चौवन्न",
    "पच्पन्न",
    "छपन्न",
    "सन्ताउन्न",
    "अन्ठाउँन्न",
    "उनान्न्साठी",
    "साठी",
    "एकसाठी",
    "बासाठी",
    "तीरसाठी",
    "चौंसाठी",
    "पैसाठी",
    "छैसठी",
    "सत्सठ्ठी",
    "अर्सठ्ठी",
    "उनन्सत्तरी",
    "सतरी",
    "एकहत्तर",
    "बहत्तर",
    "त्रिहत्तर",
    "चौहत्तर",
    "पचहत्तर",
    "छहत्तर",
    "सत्हत्तर",
    "अठ्हत्तर",
    "उनास्सी",
    "अस्सी",
    "एकासी",
    "बयासी",
    "त्रीयासी",
    "चौरासी",
    "पचासी",
    "छयासी",
    "सतासी",
    "अठासी",
    "उनान्नब्बे",
    "नब्बे",
    "एकान्नब्बे",
    "बयान्नब्बे",
    "त्रियान्नब्बे",
    "चौरान्नब्बे",
    "पंचान्नब्बे",
    "छयान्नब्बे",
    "सन्तान्‍नब्बे",
    "अन्ठान्नब्बे",
    "उनान्सय",
  ];

  const numberStr = num.toString();
  let words = "";
  let decimals = 0;
  let decimalWords = "";

  if (numberStr.includes(".")) {
    const [, decPart] = numberStr.split(".");
    const decimalTens = decPart.substring(0, 2).padEnd(2, "0");
    decimalWords = units[parseInt(decimalTens, 10)] + " पैसा";
    decimals = parseInt(decPart, 10);
  }

  const intNumber = Math.floor(num);
  if (intNumber.toString().length > 13) return null;

  const s = intNumber.toString();
  const len = s.length;

  const tens = Math.floor(intNumber % 100);
  const hundred = len > 2 ? parseInt(s.substring(len - 3, len - 2), 10) : 0;
  const thousands =
    len > 3 ? parseInt(s.substring(Math.max(0, len - 5), len - 3), 10) : 0;
  const lakhs =
    len > 5 ? parseInt(s.substring(Math.max(0, len - 7), len - 5), 10) : 0;
  const crores =
    len > 7 ? parseInt(s.substring(Math.max(0, len - 9), len - 7), 10) : 0;
  const arabs =
    len > 9 ? parseInt(s.substring(Math.max(0, len - 11), len - 9), 10) : 0;
  const kharabs = len > 11 ? parseInt(s.substring(0, len - 11), 10) : 0;

  if (kharabs > 0) words += units[kharabs] + " खरब";
  if (arabs > 0) words += (words ? " " : "") + units[arabs] + " अरब";
  if (crores > 0) words += (words ? " " : "") + units[crores] + " करोड";
  if (lakhs > 0) words += (words ? " " : "") + units[lakhs] + " लाख";
  if (thousands > 0) words += (words ? " " : "") + units[thousands] + " हजार";
  if (hundred > 0) words += (words ? " " : "") + units[hundred] + " सय";
  if (tens > 0) words += (words ? " " : "") + units[tens];

  if (words.trim() && isCurrency) words += " रुपैंया";
  if (decimals > 0 && isCurrency)
    words += (words.trim() ? " " : "") + decimalWords;

  return words.trim();
}

export const NepaliFunctions: NepaliFunctionsType = {
  AvailableFormats: DATE_FORMATS,
  IsValidDateFormat: isValidDateFormat,

  Get2DigitNo: (number: number): string => number.toString().padStart(2, "0"),

  ParseDate: parseDate,
  ConvertToDateObject: convertToDateObject,
  ConvertToDateFormat: convertToDateFormat,
  AD2BS,
  BS2AD,
  ConvertToUnicode: convertToUnicode,
  ConvertToNumber: convertToNumber,
  DefaultBsDateFormat: DEFAULT_BS_DATE_FORMAT,
  DefaultAdDateFormat: DEFAULT_AD_DATE_FORMAT,

  AD: {
    GetCurrentDate: getCurrentAdDate,

    GetCurrentYear: (): number => getCurrentAdDate().year,
    GetCurrentMonth: (): number => getCurrentAdDate().month,
    GetCurrentDay: (): number => getCurrentAdDate().day,

    GetMonths: getAdMonths,

    GetMonth: (number: number): AdMonthName | null => {
      const num = Number(number);
      if (isNaN(num) || num < 0 || num > 11) return null;
      return getAdMonths()[num];
    },

    GetDays: getAdDays,
    GetDay: getAdDay,
    GetDaysShort: getAdDaysShort,

    GetDayShort: (number: number): string | null => {
      const num = Number(number);
      if (isNaN(num) || num < 0 || num > 6) return null;
      return getAdDaysShort()[num];
    },

    GetDaysInMonth: (year: number, month: number): number =>
      new Date(year, month, 0).getDate(),

    DatesDiff: (
      startDate: DateObject | string,
      endDate: DateObject | string,
      dateFormat?: DateFormat,
    ): number | null => {
      const s = getDateObjectAndFormat(startDate, dateFormat, DATE_TYPES.AD);
      if (!s) return null;
      const e = getDateObjectAndFormat(endDate, dateFormat, DATE_TYPES.AD);
      if (!e) return null;
      return new NepaliDateConverter().countAdDays(s.dateObject, e.dateObject);
    },

    AddDays: (
      adDate: DateObject | string | Date,
      noOfDays: number,
      dateFormat?: DateFormat,
    ): DateObject | string | null => {
      const parsed = getDateObjectAndFormat(adDate, dateFormat, DATE_TYPES.AD);
      if (!parsed) return null;
      const { dateObject: adDateObj } = parsed;

      const date = new Date(adDateObj.year, adDateObj.month - 1, adDateObj.day);
      date.setDate(date.getDate() + noOfDays);

      const resultDate: DateObject = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      };

      return dateFormat
        ? convertToDateFormat(resultDate, dateFormat)
        : resultDate;
    },

    GetFullDate: (
      adDate: DateObject | string | Date,
      dateFormat?: DateFormat,
    ): string | null => {
      const parsed = getDateObjectAndFormat(adDate, dateFormat, DATE_TYPES.AD);
      if (!parsed) return null;
      const { dateObject: adDateObj } = parsed;
      const monthName = NepaliFunctions.AD.GetMonth(adDateObj.month - 1);
      return `${adDateObj.day} ${monthName} ${adDateObj.year}`;
    },

    GetFullDay: (
      adDate: DateObject | string | Date,
      dateFormat?: DateFormat,
    ): AdDayName | null => {
      const parsed = getDateObjectAndFormat(adDate, dateFormat, DATE_TYPES.AD);
      if (!parsed) return null;
      const { dateObject: adDateObj } = parsed;
      const date = new Date(adDateObj.year, adDateObj.month - 1, adDateObj.day);
      return getAdDay(date.getDay());
    },
  },

  BS: {
    ValidateDate: validateBsDate,

    IsBetweenDates: (
      checkDate: DateObject | string,
      startDate: DateObject | string,
      endDate: DateObject | string,
      dateFormat?: DateFormat,
      inclusive = false,
    ): boolean | null => {
      const c = getDateObjectAndFormat(checkDate, dateFormat);
      const s = getDateObjectAndFormat(startDate, dateFormat);
      const e = getDateObjectAndFormat(endDate, dateFormat);
      if (!c || !s || !e) return null;

      if (
        !validateBsDate(c.dateObject) ||
        !validateBsDate(s.dateObject) ||
        !validateBsDate(e.dateObject)
      )
        return null;

      const toDate = (bsObj: DateObject): Date => {
        const ad = BS2AD(bsObj) as DateObject;
        return new Date(convertToDateFormat(ad, DEFAULT_AD_DATE_FORMAT));
      };

      const checkDateAd = toDate(c.dateObject);
      const startDateAd = toDate(s.dateObject);
      const endDateAd = toDate(e.dateObject);

      return inclusive
        ? checkDateAd >= startDateAd && checkDateAd <= endDateAd
        : checkDateAd > startDateAd && checkDateAd < endDateAd;
    },

    GetCurrentDate: getCurrentBsDate,
    GetCurrentYear: (): number => (getCurrentBsDate() as DateObject).year,
    GetCurrentMonth: (): number => (getCurrentBsDate() as DateObject).month,
    GetCurrentDay: (): number => (getCurrentBsDate() as DateObject).day,

    GetMonths: getBsMonths,

    GetMonth: (number: number): BsMonthName | null => {
      const num = Number(number);
      if (isNaN(num) || num < 0 || num > 11) return null;
      return getBsMonths()[num];
    },

    GetMonthsInUnicode: getBsMonthsInUnicode,

    GetMonthInUnicode: (number: number): string | null => {
      const num = Number(number);
      if (isNaN(num) || num < 0 || num > 11) return null;
      return getBsMonthsInUnicode()[num];
    },

    GetFullDate: (
      bsDate: DateObject | string,
      unicodeFlag = false,
      dateFormat?: DateFormat,
    ): string | null => {
      const parsed = getDateObjectAndFormat(bsDate, dateFormat);
      if (!parsed) return null;
      const { dateObject: bsDateObj } = parsed;

      if (unicodeFlag) {
        const months = getBsMonthsInUnicode();
        return `${convertToUnicode(bsDateObj.day)} ${
          months[bsDateObj.month - 1]
        } ${convertToUnicode(bsDateObj.year)}`;
      }
      const months = getBsMonths();
      return `${bsDateObj.day} ${months[bsDateObj.month - 1]} ${
        bsDateObj.year
      }`;
    },

    GetDaysUnicode: getBsDaysInUnicode,
    GetDayUnicode: getBsDayInUnicode,
    GetDaysUnicodeShort: getBsDaysInUnicodeShort,

    GetDayUnicodeShort: (number: number): string | null => {
      const num = Number(number);
      if (isNaN(num) || num < 0 || num > 6) return null;
      return getBsDaysInUnicodeShort()[num];
    },

    GetFullDay: (
      bsDate: DateObject | string,
      dateFormat?: DateFormat,
    ): AdDayName | null => {
      const parsed = getDateObjectAndFormat(bsDate, dateFormat);
      if (!parsed) return null;
      const adDate = BS2AD(parsed.dateObject) as DateObject;
      const date = new Date(adDate.year, adDate.month - 1, adDate.day);
      return getAdDay(date.getDay());
    },

    GetFullDayInUnicode: (
      bsDate: DateObject | string,
      dateFormat?: DateFormat,
    ): string | null => {
      const parsed = getDateObjectAndFormat(bsDate, dateFormat);
      if (!parsed) return null;
      const adDate = BS2AD(parsed.dateObject) as DateObject;
      const date = new Date(adDate.year, adDate.month - 1, adDate.day);
      return getBsDayInUnicode(date.getDay());
    },

    GetDaysInMonth: getDaysInBsMonth,

    DatesDiff: (
      startDate: DateObject | string,
      endDate: DateObject | string,
      dateFormat?: DateFormat,
    ): number | null => {
      const s = getDateObjectAndFormat(startDate, dateFormat);
      const e = getDateObjectAndFormat(endDate, dateFormat);
      if (!s || !e) return null;

      if (!validateBsDate(s.dateObject) || !validateBsDate(e.dateObject))
        return null;

      const startAdDate = BS2AD(s.dateObject) as DateObject;
      const endAdDate = BS2AD(e.dateObject) as DateObject;
      return new NepaliDateConverter().countAdDays(startAdDate, endAdDate);
    },

    AddDays: (
      bsDate: DateObject | string,
      noOfDays: number,
      dateFormat?: DateFormat,
    ): DateObject | string | null => {
      const parsed = getDateObjectAndFormat(bsDate, dateFormat);
      if (!parsed) return null;
      const adDate = BS2AD(parsed.dateObject) as DateObject;
      const date = new Date(adDate.year, adDate.month - 1, adDate.day);
      date.setDate(date.getDate() + noOfDays);

      const newAdDate: DateObject = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      };

      const newBsDate = AD2BS(newAdDate) as DateObject;
      return dateFormat
        ? convertToDateFormat(newBsDate, dateFormat)
        : newBsDate;
    },

    IsEqualTo: (d1, d2, fmt) => compareBsDates(d1, d2, fmt, "=="),
    IsGreaterThan: (d1, d2, fmt) => compareBsDates(d1, d2, fmt, ">"),
    IsLessThan: (d1, d2, fmt) => compareBsDates(d1, d2, fmt, "<"),
    IsGreaterThanOrEqualTo: (d1, d2, fmt) => compareBsDates(d1, d2, fmt, ">="),
    IsLessThanOrEqualTo: (d1, d2, fmt) => compareBsDates(d1, d2, fmt, "<="),

    MinimumDate: (): DateObject => new NepaliDateConverter().minDate(),
    MaximumDate: (): DateObject => new NepaliDateConverter().maxDate(),
  },
};
