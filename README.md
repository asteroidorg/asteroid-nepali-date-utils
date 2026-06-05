# @asteroidstudio/date-utils

Utilities for converting and working with Nepali **Bikram Sambat (BS)** and
**Gregorian (AD)** dates, plus number-to-words helpers in English and Nepali.

- `AD2BS` / `BS2AD` — calendar conversion (object or string in, object or string out)
- `convertAD2BS` / `convertBS2AD` — convenience wrappers that accept a JS `Date`
- `NepaliFunctions` — a grouped API with `AD` and `BS` namespaces
- Unicode digit helpers and number-to-words (English / Nepali)

Zero runtime dependencies. Ships ESM, CJS, and TypeScript types.

## Install

```bash
npm install @asteroidstudio/date-utils
# or
pnpm add @asteroidstudio/date-utils
```

## Quick start

```ts
import { AD2BS, BS2AD, NepaliFunctions } from "@asteroidstudio/date-utils";

AD2BS("2024-01-01", "YYYY-MM-DD", "YYYY-MM-DD"); // "2080-09-16"
BS2AD("2080-09-16", "YYYY-MM-DD", "YYYY-MM-DD"); // "2024-01-01"

NepaliFunctions.BS.GetCurrentDate("YYYY-MM-DD"); // e.g. "2081-03-22"
NepaliFunctions.AD.GetCurrentDate("YYYY-MM-DD"); // e.g. "2024-07-06"
```

## Core concepts

### `DateObject`

The shape used throughout the package:

```ts
type DateObject = { year: number; month: number; day: number };
// month is 1-based (1 = first month), day is 1-based.
```

### Supported formats

```ts
type DateFormat =
  | "YYYY-MM-DD" | "YYYY/MM/DD" | "YYYY.MM.DD"
  | "DD-MM-YYYY" | "DD/MM/YYYY" | "DD.MM.YYYY"
  | "MM-DD-YYYY" | "MM/DD/YYYY";
```

### Default formats (important)

The two namespaces have **different** string defaults:

| Namespace | Default string format        |
| --------- | ---------------------------- |
| `BS`      | `YYYY-MM-DD`                 |
| `AD`      | `YYYY-MM-DD`                 |

When you pass a **string** without an explicit `dateFormat`, it is parsed with
that namespace's default. To avoid surprises, either pass a `DateObject` or
always pass the matching `dateFormat` explicitly.

```ts
// Pass a DateObject — no format ambiguity:
NepaliFunctions.AD.DatesDiff({ year: 2024, month: 1, day: 1 },
                             { year: 2024, month: 1, day: 15 }); // 14

// Or pass a string WITH its format:
NepaliFunctions.AD.DatesDiff("2024-01-01", "2024-01-15", "YYYY-MM-DD"); // 14
```

### Supported BS range

The bundled BS calendar table covers **`1970-01-01` to `2100-12-30` (BS)**.
Conversions and lookups are only valid inside this range.

```ts
NepaliFunctions.BS.MinimumDate(); // { year: 1970, month: 1, day: 1 }
NepaliFunctions.BS.MaximumDate(); // { year: 2100, month: 12, day: 30 }
```

---

## Conversion functions

### `AD2BS(adDate, sourceFormat?, returnFormat?)`

Convert a Gregorian date to Bikram Sambat. Returns a `DateObject` when called
with a `DateObject`/`Date`, or a formatted string when a `sourceFormat` is given.

```ts
import { AD2BS } from "@asteroidstudio/date-utils";

AD2BS({ year: 2024, month: 1, day: 1 });            // { year: 2080, month: 9, day: 16 }
AD2BS("2024-01-01", "YYYY-MM-DD", "YYYY-MM-DD");    // "2080-09-16"
AD2BS("2024-01-01", "YYYY-MM-DD", "DD/MM/YYYY");    // "16/09/2080"
```

### `BS2AD(bsDate, sourceFormat?, returnFormat?)`

Convert a Bikram Sambat date to Gregorian.

```ts
import { BS2AD } from "@asteroidstudio/date-utils";

BS2AD({ year: 2080, month: 9, day: 16 });           // { year: 2024, month: 1, day: 1 }
BS2AD("2080-09-16", "YYYY-MM-DD", "YYYY-MM-DD");    // "2024-01-01"
```

### `convertAD2BS(date, format?, returnFormat?)` / `convertBS2AD(date, format?)`

Convenience wrappers that also accept a JS `Date` and always return a formatted
string. `format` defaults to `YYYY-MM-DD`.

```ts
import { convertAD2BS, convertBS2AD } from "@asteroidstudio/date-utils";

convertAD2BS(new Date(2024, 0, 1)); // "2080-09-16"
convertAD2BS("2024-01-01");         // "2080-09-16"
convertBS2AD("2080-09-16");         // "2024-01-01"
```

---

## Shared helpers

```ts
import {
  formatDate, createDate, getLastDayOfMonth, getEndDayOfMonth,
  convertToUnicode, convertToNumber, getAdMonths, getBsMonths,
} from "@asteroidstudio/date-utils";

formatDate(new Date(2024, 0, 5)); // "2024-01-05"  (YYYY-MM-DD of a JS Date)
createDate(2024, 1, 5);           // JS Date for 2024-01-05 (month is 1-based)
getLastDayOfMonth(2024, 2);       // 29  (AD/Gregorian month length)
getEndDayOfMonth(2080, 9);        // 29  (BS month length)

convertToUnicode(2080);           // "२०८०"  (ASCII digits -> Devanagari)
convertToNumber("२०८०");          // "2080"  (Devanagari -> ASCII digits)

getAdMonths();                    // ["January", ... "December"]
getBsMonths();                    // ["Baisakh", "Jestha", ... "Chaitra"]
```

### Number to words

```ts
import { numberToWords, numberToWordsUnicode } from "@asteroidstudio/date-utils";

numberToWords(1250000);              // "Twelve Lakh Fifty Thousand"
numberToWords(1250.5, true);         // "One Thousand Two Hundred Fifty Rupees and Fifty Paisa"

numberToWordsUnicode(1250000);       // "बाह्र लाख पचास हजार"
numberToWordsUnicode(1250.5, true);  // "एक हजार दुई सय पचास रुपैंया पचास पैसा"
```

Pass `true` as the second argument to append `Rupees`/`Paisa` (`रुपैंया`/`पैसा`).

---

## `NepaliFunctions`

A single namespaced object exposing the full API.

### Root helpers

```ts
import { NepaliFunctions } from "@asteroidstudio/date-utils";

NepaliFunctions.AvailableFormats;               // the 8 supported DateFormat strings
NepaliFunctions.IsValidDateFormat("YYYY-MM-DD"); // true
NepaliFunctions.Get2DigitNo(5);                  // "05"

NepaliFunctions.ParseDate("2080-09-16");
// { parsedDate: { year: 2080, month: 9, day: 16 }, parsedFormat: [...] }

NepaliFunctions.ConvertToDateObject("16/09/2080", "DD/MM/YYYY");
// { year: 2080, month: 9, day: 16 }

NepaliFunctions.ConvertToDateFormat({ year: 2080, month: 9, day: 16 }, "DD/MM/YYYY");
// "16/09/2080"

NepaliFunctions.ConvertToUnicode(16);  // "१६"
NepaliFunctions.ConvertToNumber("१६"); // "16"

NepaliFunctions.DefaultBsDateFormat; // "YYYY-MM-DD"
NepaliFunctions.DefaultAdDateFormat; // "YYYY-MM-DD"
```

### `NepaliFunctions.AD`

Gregorian helpers. String inputs default to `YYYY-MM-DD` (see
[Default formats](#default-formats-important)).

```ts
const AD = NepaliFunctions.AD;

AD.GetCurrentDate();            // { year, month, day } for today (Nepal time)
AD.GetCurrentDate("YYYY-MM-DD"); // today as a formatted string
AD.GetCurrentYear();            // number
AD.GetCurrentMonth();           // number (1-based)
AD.GetCurrentDay();             // number

AD.GetMonths();                 // ["January", ... "December"]
AD.GetMonth(0);                 // "January"   (0-based index)
AD.GetDays();                   // ["Sunday", ... "Saturday"]
AD.GetDay(1);                   // "Monday"     (0 = Sunday)
AD.GetDaysShort();              // ["S","M","T","W","T","F","S"]
AD.GetDayShort(1);              // "M"

AD.GetDaysInMonth(2024, 2);     // 29  (year, month 1-based)

AD.DatesDiff({ year: 2024, month: 1, day: 1 },
             { year: 2024, month: 1, day: 15 }); // 14

AD.AddDays({ year: 2024, month: 1, day: 1 }, 20); // { year: 2024, month: 1, day: 21 }

AD.GetFullDate({ year: 2024, month: 1, day: 1 }); // "1 January 2024"
AD.GetFullDay({ year: 2024, month: 1, day: 1 });  // "Monday"
```

### `NepaliFunctions.BS`

Bikram Sambat helpers. String inputs default to `YYYY-MM-DD`.

```ts
const BS = NepaliFunctions.BS;

BS.ValidateDate("2080-09-16", "YYYY-MM-DD"); // true
BS.ValidateDate("2080-13-01", "YYYY-MM-DD"); // false (no month 13)

BS.IsBetweenDates("2080-09-16", "2080-01-01", "2080-12-30", "YYYY-MM-DD", true); // true
// signature: (checkDate, startDate, endDate, dateFormat?, inclusive?)

BS.GetCurrentDate();             // { year, month, day } for today (Nepal time)
BS.GetCurrentDate("YYYY-MM-DD"); // today as a formatted string
BS.GetCurrentYear();             // number
BS.GetCurrentMonth();            // number (1-based)
BS.GetCurrentDay();              // number

BS.GetMonths();                  // ["Baisakh", ... "Chaitra"]
BS.GetMonth(8);                  // "Poush"   (0-based index)
BS.GetMonthsInUnicode();         // ["बैशाख", ... "चैत्र"]
BS.GetMonthInUnicode(8);         // "पौष"

BS.GetFullDate("2080-09-16", false, "YYYY-MM-DD"); // "16 Poush 2080"
BS.GetFullDate("2080-09-16", true,  "YYYY-MM-DD"); // "१६ पौष २०८०"   (unicodeFlag = true)

BS.GetDaysUnicode();             // ["आइतवार", ... "शनिवार"]
BS.GetDayUnicode(1);             // "सोमवार"
BS.GetDaysUnicodeShort();        // ["आ","सो","मं","बु","बि","शु","श"]
BS.GetDayUnicodeShort(1);        // "सो"

BS.GetFullDay("2080-09-16", "YYYY-MM-DD");          // "Monday"
BS.GetFullDayInUnicode("2080-09-16", "YYYY-MM-DD"); // "सोमवार"

BS.GetDaysInMonth(2080, 9);      // 29  (year, month 1-based; within supported range)

BS.DatesDiff("2080-09-01", "2080-09-16", "YYYY-MM-DD"); // 15
BS.AddDays("2080-09-16", 20, "YYYY-MM-DD");             // "2080-10-07"

BS.IsEqualTo("2080-09-16", "2080-09-16", "YYYY-MM-DD");            // true
BS.IsGreaterThan("2080-09-17", "2080-09-16", "YYYY-MM-DD");        // true
BS.IsLessThan("2080-09-15", "2080-09-16", "YYYY-MM-DD");           // true
BS.IsGreaterThanOrEqualTo("2080-09-16", "2080-09-16", "YYYY-MM-DD"); // true
BS.IsLessThanOrEqualTo("2080-09-16", "2080-09-16", "YYYY-MM-DD");    // true

BS.MinimumDate();                // { year: 1970, month: 1, day: 1 }
BS.MaximumDate();                // { year: 2100, month: 12, day: 30 }
```

---

## Constants & types

```ts
import {
  DATE_FORMATS,            // DateFormat[]  — the 8 supported formats
  DATE_COMPARE_TYPES,      // { IsEqualTo: "==", IsLessThan: "<", ... }
  DATE_TYPES,              // { AD: "AD", BS: "BS" }
  DEFAULT_BS_DATE_FORMAT,  // "YYYY-MM-DD"
  DEFAULT_AD_DATE_FORMAT,  // "YYYY-MM-DD"
} from "@asteroidstudio/date-utils";

import type { DateObject, DateFormat } from "@asteroidstudio/date-utils";
```

---

## Notes & caveats

- **Current-date helpers use Nepal Time (UTC+5:45).** `GetCurrentDate` and the
  related getters are based on the current instant in Nepal.
- **Stay within the supported BS range** (`1970-01-01` … `2100-12-30 BS`).
  Inputs outside this range are not supported.
- **`DatesDiff` returns the absolute number of days** between the two dates
  (direction is not encoded in the sign).
- **Many functions return `null`** on input that cannot be parsed or validated
  (e.g. `ValidateDate` returns `false`/`null`, conversions return `null`).
  Check the result before using it.

## License

MIT
