<!--toc:start-->

- [Contributing to `@asteroidstudio/date-utils`](#contributing-to-asteroidstudiodate-utils)
  - [Getting Started](#getting-started)
    - [Install dependencies](#install-dependencies)
    - [Build the package](#build-the-package)
    - [Run type checking](#run-type-checking)
    - [Test against the local consumer app](#test-against-the-local-consumer-app)
  - [Project Layout](#project-layout)
  - [Contribution Guidelines](#contribution-guidelines)
  - [Commit Message Guidelines](#commit-message-guidelines)
  - [Pull Request Guidelines](#pull-request-guidelines)
  <!--toc:end-->

# Contributing to `@asteroidstudio/date-utils`

Thanks for your interest in improving the package! This document describes how to get a development environment running, the conventions we follow, and what a good contribution looks like.

This package is published under the MIT License (see [LICENSE](./LICENSE)). By submitting a PR you agree that your contribution is licensed under the same terms.

## Getting Started

The development loop is **edit source → build → test against the consumer app**.

### Install dependencies

```bash
pnpm install
```

### Build the package

```bash
pnpm build
```

Produces ESM (`dist/index.js`), CJS (`dist/index.cjs`), type declarations (`dist/index.d.ts`), and component CSS (`dist/date-utils.css`).

### Run type checking

```bash
pnpm typecheck
```

### Test against the local consumer app

A consumer Vue 3 project lives at `../date-util/` and links to this package via:

```json
"@asteroidstudio/date-utils": "file:../asteroid-nepali-date-utils/"
```

After building this package, run the consumer app to verify:

```bash
# In this repo — rebuild after every change
pnpm build

# In ../date-util/ — preview your changes
cd ../date-util
pnpm dev
```

For quick iteration, run `pnpm dev` in this repo (watch mode rebuilds `dist/` on every change).

## Project Layout

```
src/
├── index.ts                         # core entry — re-exports utils/constants, framework-free
├── utils/
│   ├── date.util.ts                 # NepaliDate class + formatNepaliDate
│   ├── nepali-functions.utils.ts    # AD2BS, BS2AD, NepaliFunctions, numberToWords
│   └── picker.util.ts              # framework-agnostic picker helpers (masking, validation, positioning)
├── constant/
│   └── nepaliDate.constant.ts       # BS_CALENDAR_DATA, EPOCH, month/week name arrays
└── vue/
    ├── index.ts                     # Vue sub-entry — re-exports NepaliDatePicker
    ├── NepaliDatePicker.vue         # Vue 3 date picker component
    └── shim-vue.d.ts                   # Vue type declarations (scoped to vue/ build only)
```

**Entry points:**
- `import { NepaliDate } from "@asteroidstudio/date-utils"` — any framework, zero Vue deps
- `import { NepaliDatePicker } from "@asteroidstudio/date-utils/vue"` — Vue 3 app
Public core exports ship from `src/index.ts` — add any new utility there so it appears in the main bundle.

## Contribution Guidelines

1. **Create a Branch**: Always create a new branch for your changes.

2. **Make Your Changes**: Follow the coding conventions used throughout the project (TypeScript-strict, no `any` unless justified, prefer named exports, `readonly` for constants).

3. **Test Your Changes**: Run `pnpm typecheck`, `pnpm build`, and verify against the consumer app (`../date-util/`).

4. **Keep the epoch accurate**: If you modify `BS_CALENDAR_DATA`, update the `EPOCH` constant in `nepaliDate.constant.ts` accordingly. The `NepaliDate` class and `NepaliFunctions` (`AD2BS`/`BS2AD`) must agree — always verify both produce the same date for a given input.

5. **Commit Your Changes**: Use a clear and concise commit message (see below).

6. **Submit a Pull Request**: Describe what your changes do and why they are needed.

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

```
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```

Where `type` must be one of:

- `feat` — A new feature
- `fix` — A bug fix
- `docs` — Documentation only changes
- `style` — Formatting, white-space, etc (no logic change)
- `refactor` — Code change that neither fixes a bug nor adds a feature
- `perf` — Performance improvement
- `test` — Adding or correcting tests
- `chore` — Build process, tooling, config changes

Scopes (optional but encouraged):

- `nepalidate` — `NepaliDate` class
- `converter` — `AD2BS`, `BS2AD`, `NepaliFunctions`
- `picker` — `NepaliDatePicker` component
- `constants` — calendar data, epoch
- `build` — vite, tsconfig, package.json

Examples:

```
fix(nepalidate): correct EPOCH offset for BS year calculation
feat(NepaliDatePicker): add allowClear prop
docs: document NepaliDate format tokens
```

## Pull Request Guidelines

1. **Reference Related Issues**: If your PR is related to an issue, reference it in the description.

2. **Describe Your Changes**: Clearly explain what your changes do and why they are needed.

3. **Verify the Build**: Confirm `pnpm typecheck` and `pnpm build` pass before requesting review.

4. **Bump the Version (if needed)**: Follow semver — `fix` → patch, `feat` → minor, breaking changes → major.

5. **Wait for Review**: After submitting, wait for review and approval before merging.
