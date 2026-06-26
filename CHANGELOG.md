# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project follows Semantic Versioning where practical.

## [0.1.1] - 2026-06-26

- Re-release of v0.1.0 — version bumped to trigger release pipeline with CI/CD fixes.

## [0.1.0] - 2026-06-26

### Added

- `NepaliDatePicker` Vue 3 component with v-model, min/max dates, and calendar navigation.
- Vue sub-entry path (`@asteroidstudio/date-utils/vue`) for framework-specific exports.
- `NepaliDatePicker` CSS styles auto-injected on import.
- `CONTRIBUTING.md` with development setup and commit guidelines.
- `cliff.toml` configuration for auto-generated changelog via `git-cliff`.

### Changed

- Migrated build from `tsup` to `vite` for better Vue SFC support.
- Restructured project layout for dual entry (core + Vue).
- Reorganized date picker constants and utils to share between core and Vue builds.
- Downgraded Vue peer dependency from 3.4.x to 3.2.x for broader compatibility.

## [0.0.2] - 2026-06-26

### Added

- CI/CD release pipeline (`.github/workflows/release.yml`) triggered by semver tags.
- Automated npm publishing and GitHub Release creation.
- `git-cliff` changelog generation from conventional commits.
- Automatic `CHANGELOG.md` update committed back to `main` on release.

### Fixed

- pnpm setup in CI environment.

### Removed

- Emoji characters from changelog entries.

## [0.0.1] - 2026-06-01

### Added

- Initial public release of `@asteroidstudio/date-utils`.
- `AD2BS` / `BS2AD` calendar conversion functions.
- `convertAD2BS` / `convertBS2AD` convenience wrappers accepting JS `Date`.
- `NepaliFunctions` namespace with grouped `AD` and `BS` utility APIs.
- `NepaliDate` class for BS date manipulation, formatting, and calendar generation.
- Date parsing, formatting, and comparison helpers.
- Unicode conversion helpers for Nepali numerals (Devanagari ↔ ASCII).
- Number-to-words helpers in English and Nepali (with Rupees/Paisa support).
- Convenience helpers for creating dates and finding month lengths.
- Zero runtime dependencies. Ships ESM, CJS, and TypeScript types.

