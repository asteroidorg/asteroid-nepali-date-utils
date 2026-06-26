import { NepaliDate } from "./date.util";

export interface DateBounds {
  minDate?: NepaliDate;
  maxDate?: NepaliDate;
}

export function isDateDisabled(
  dateToCheck: NepaliDate,
  bounds: DateBounds,
): boolean {
  if (bounds.minDate && dateToCheck.isBefore(bounds.minDate)) return true;
  if (bounds.maxDate && dateToCheck.isAfter(bounds.maxDate)) return true;
  return false;
}

export function isYearDisabled(
  year: number,
  bounds: DateBounds,
): boolean {
  if (bounds.minDate && year < bounds.minDate.year) return true;
  if (bounds.maxDate && year > bounds.maxDate.year) return true;
  return false;
}

export function isMonthDisabled(
  year: number,
  monthIndex: number,
  bounds: DateBounds,
): boolean {
  if (bounds.minDate) {
    if (year < bounds.minDate.year) return true;
    if (year === bounds.minDate.year && monthIndex < bounds.minDate.month)
      return true;
  }
  if (bounds.maxDate) {
    if (year > bounds.maxDate.year) return true;
    if (year === bounds.maxDate.year && monthIndex > bounds.maxDate.month)
      return true;
  }
  return false;
}

export interface DropdownPosition {
  top: number;
  left: number;
  positionAbove: boolean;
}

export function computeDropdownPosition(
  inputRect: DOMRect,
  calendarSize: { height: number; width: number },
  viewport: { height: number; width: number },
  scroll: { x: number; y: number },
  spacing = 1,
): DropdownPosition {
  const spaceAbove = inputRect.top;
  const spaceBelow = viewport.height - inputRect.bottom;
  const shouldPlaceAbove =
    spaceBelow < calendarSize.height + spacing && spaceAbove > spaceBelow;

  let top: number;
  if (shouldPlaceAbove) {
    top = inputRect.top + scroll.y - calendarSize.height - spacing - 1;
    if (top < scroll.y) top = scroll.y + spacing;
  } else {
    top = inputRect.bottom + scroll.y + spacing;
    const maxTop =
      viewport.height + scroll.y - calendarSize.height - spacing;
    if (top > maxTop) top = maxTop;
  }

  let left = inputRect.left + scroll.x;
  if (left + calendarSize.width > viewport.width + scroll.x) {
    left = inputRect.right + scroll.x - calendarSize.width;
  }
  if (left < scroll.x) left = scroll.x + spacing;
  if (calendarSize.width > viewport.width) left = scroll.x + spacing;

  return { top, left, positionAbove: shouldPlaceAbove };
}

export function maskNepaliDateInput(
  rawInput: string,
  currentDate: NepaliDate,
  bounds: DateBounds,
): string {
  const raw = rawInput.replace(/[^0-9]/g, "").slice(0, 9);

  let year = "";
  let month = "";
  let day = "";
  let maxDay = 31;

  if (raw.length >= 4) {
    year = raw.slice(0, 4);
  } else {
    year = raw;
  }

  if (raw.length >= 5) {
    let m1 = raw.charAt(4);
    let m2 = raw.charAt(5) || "";

    if (m1 === "0") {
      month = m1 + m2;
    } else if (m1 === "1") {
      if (["0", "1", "2"].includes(m2)) {
        month = m1 + m2;
      } else if (m2) {
        month = "0" + m1;
      } else {
        month = m1;
      }
    } else if ("23456789".includes(m1)) {
      month = "0" + m1;
    }

    if (month === "00") month = "0";
  }

  if (/^\d{4}$/.test(year) && /^\d{2}$/.test(month)) {
    maxDay = currentDate.endOfMonth().day;
  }

  if (raw.length >= 7) {
    let d1 = raw.charAt(6);
    let d2 = raw.charAt(7) || "";
    let d3 = raw.charAt(8) || "";

    if (d3) {
      if (d1 === "0") {
        const dayNum = parseInt(d2 + d3);
        if (dayNum >= 1 && dayNum <= maxDay) {
          day = d2 + d3;
        } else {
          day = d1 + d2;
        }
      } else {
        day = d1 + d2;
      }
    } else if (d2) {
      day = d1 + d2;
    } else if ("456789".includes(d1)) {
      day = "0" + d1;
    } else if ("123".includes(d1)) {
      day = d1;
    }

    if (day === "00" || parseInt(day) > maxDay) {
      day = "";
    }
  }

  let formatted = year;
  if (month) formatted += "-" + month;
  if (day) formatted += "-" + day;

  return formatted;
}
