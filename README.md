# @asteroidstudio/date-utils

Utilities for working with Nepali Bikram Sambat dates and common date helpers.

This package exposes:

- `AD2BS` and `BS2AD` for calendar conversion
- `NepaliFunctions` for a grouped API with AD and BS namespaces
- small helpers like `formatDate`, `createDate`, and `getLastDayOfMonth`
- number-to-words helpers in English and Nepali

## Install

```bash
npm install @asteroidstudio/date-utils
```

## Quick Start

```ts
import { AD2BS, BS2AD, NepaliFunctions } from "@asteroidstudio/date-utils";

const bsDate = AD2BS("2024-01-01", "YYYY-MM-DD", "YYYY-MM-DD");
// "2080-09-16"

const adDate = BS2AD("2080-09-16", "YYYY-MM-DD", "YYYY-MM-DD");
// "2024-01-01"

const todayBs = NepaliFunctions.BS.GetCurrentDate("YYYY-MM-DD");
const todayAd = NepaliFunctions.AD.GetCurrentDate("MM/DD/YYYY");
```

## Date Shapes

The core object shape used throughout the package is:

```ts
type DateObject = {
  year: number;
  month: number;
  day: number;
};
```

## Main Exports

### Conversion helpers

- `AD2BS(adDate, sourceDateFormat?, returnDateFormat?)`
- `BS2AD(bsDate, sourceDateFormat?, returnDateFormat?)`
- `convertAD2BS(date, format?, returnFormat?)`
- `convertBS2AD(date, format?)`

Use the low-level `AD2BS` and `BS2AD` functions when you need `DateObject`
support or direct control over input and output formats. Use the convenience
wrappers when you want to pass a JavaScript `Date` or a date string and get a
formatted string back.

### Shared helpers

- `formatDate(date)`
- `createDate(year, month, day)`
- `getLastDayOfMonth(year, month)`
- `getEndDayOfMonth(year, month)`
- `convertToUnicode(numberOrString)`
- `convertToNumber(unicodeString)`
- `NepaliFunctions.Get2DigitNo(number)`
- `numberToWords(number, isCurrency?)`
- `numberToWordsUnicode(number, isCurrency?)`

### Constants and types

- `NepaliFunctions.AvailableFormats`
- `DEFAULT_BS_DATE_FORMAT`
- `DEFAULT_AD_DATE_FORMAT`
- `DATE_FORMATS`
- `DATE_COMPARE_TYPES`
- `DATE_TYPES`

## `NepaliFunctions`

`NepaliFunctions` is the most convenient way to access the package API when you
prefer a namespaced object.

### Root helpers

```ts
import { NepaliFunctions } from "@asteroidstudio/date-utils";

const parsed = NepaliFunctions.ParseDate("2080-09-16");
const isValid = NepaliFunctions.IsValidDateFormat("YYYY-MM-DD");
const asString = NepaliFunctions.ConvertToDateFormat(
  { year: 2080, month: 9, day: 16 },
  "DD/MM/YYYY",
);
```

### AD namespace

```ts
const adToday = NepaliFunctions.AD.GetCurrentDate();
const adFormatted = NepaliFunctions.AD.GetCurrentDate("YYYY-MM-DD");

const monthName = NepaliFunctions.AD.GetMonth(0); // "January"
const dayName = NepaliFunctions.AD.GetFullDay("2024-01-01", "YYYY-MM-DD");
const daysBetween = NepaliFunctions.AD.DatesDiff("2024-01-01", "2024-01-15");
```

Available AD methods:

- `GetCurrentDate`
- `GetCurrentYear`
- `GetCurrentMonth`
- `GetCurrentDay`
- `GetMonths`
- `GetMonth`
- `GetDays`
- `GetDay`
- `GetDaysShort`
- `GetDayShort`
- `GetDaysInMonth`
- `DatesDiff`
- `AddDays`
- `GetFullDate`
- `GetFullDay`

### BS namespace

```ts
const bsToday = NepaliFunctions.BS.GetCurrentDate();
const bsTodayFormatted = NepaliFunctions.BS.GetCurrentDate("YYYY-MM-DD");

const valid = NepaliFunctions.BS.ValidateDate("2080-09-16", "YYYY-MM-DD");
const equal = NepaliFunctions.BS.IsEqualTo("2080-09-16", "2080-09-16");
const between = NepaliFunctions.BS.IsBetweenDates(
  "2080-09-16",
  "2080-01-01",
  "2080-12-30",
  "YYYY-MM-DD",
  true,
);
```

Available BS methods:

- `ValidateDate`
- `IsBetweenDates`
- `GetCurrentDate`
- `GetCurrentYear`
- `GetCurrentMonth`
- `GetCurrentDay`
- `GetMonths`
- `GetMonth`
- `GetMonthsInUnicode`
- `GetMonthInUnicode`
- `GetFullDate`
- `GetDaysUnicode`
- `GetDayUnicode`
- `GetDaysUnicodeShort`
- `GetDayUnicodeShort`
- `GetFullDay`
- `GetFullDayInUnicode`
- `GetDaysInMonth`
- `DatesDiff`
- `AddDays`
- `IsEqualTo`
- `IsGreaterThan`
- `IsLessThan`
- `IsGreaterThanOrEqualTo`
- `IsLessThanOrEqualTo`
- `MinimumDate`
- `MaximumDate`

## Supported Formats

The package understands these formats:

- `YYYY-MM-DD`
- `YYYY/MM/DD`
- `YYYY.MM.DD`
- `DD-MM-YYYY`
- `DD/MM/YYYY`
- `DD.MM.YYYY`
- `MM-DD-YYYY`
- `MM/DD/YYYY`

## Supported BS Range

The bundled Bikram Sambat calendar data covers:

- minimum: `1970-01-01 BS`
- maximum: `2100-12-30 BS`

`NepaliFunctions.BS.MinimumDate()` and `NepaliFunctions.BS.MaximumDate()` return
those boundaries as `DateObject`s.

## Examples

### Format a BS date in Nepali Unicode

```ts
import { NepaliFunctions } from "@asteroidstudio/date-utils";

const fullDate = NepaliFunctions.BS.GetFullDate("2080-09-16", true, "YYYY-MM-DD");
// "१६ पौष २०८०"
```

### Convert a JavaScript `Date`

```ts
import { convertAD2BS, convertBS2AD } from "@asteroidstudio/date-utils";

const bs = convertAD2BS(new Date(2024, 0, 1));
// "2080-09-16"

const ad = convertBS2AD("2080-09-16");
// "2024-01-01"
```

### Convert numbers to words

```ts
import { numberToWords, numberToWordsUnicode } from "@asteroidstudio/date-utils";

numberToWords(1250000);
// "Twelve Lakh Fifty Thousand"

numberToWordsUnicode(1250000);
// "बाह्र लाख पचास हजार"
```

## Notes

- Current date helpers use a Nepal Time offset.
- `AD` helpers work with Gregorian dates.
- `BS` helpers work with Bikram Sambat dates and validate against the bundled
  calendar table.

## License

MIT
