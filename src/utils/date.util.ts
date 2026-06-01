import { AD2BS, BS2AD, type DateFormat } from "./nepali-functions.utils";

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
