# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-02-24

### Added

-   User authentication (signup and login).
-   Functionality to add new links.
-   Ability to view saved links.
-   Functionality to create and assign categories to links.
-   Basic frontend structure with Next.js.
-   Backend API with Flask and MongoDB.
-   Docker setup for easy deployment.

## [1.0.1] - 2026-02-24

- 🐞Fix: Fetching name with right argument and saving it to the database without fail
-  Updated logo with an icon


## [2.0.1] - 2026-06-15

### Added
- URL validation in AddLinkForm.
- Search and add new category features in SearchableDropdown.

### Changed
- Enhanced AddLinkForm and SearchableDropdown functionality.
- Improved user experience in CollectionNavigationPanel with cursor pointer on buttons.
- Enhanced OTP login flow with success messages and adjusted login response.

### Fixed
- Email subject formatting in login OTP email.

## [2.1.0] - 2026-06-21

### Added
- Share page: collections can be made public and shared via link.
- Edit and delete controls now handled correctly for public (non-owner) users.

### Changed
- AddLink button moved out of SearchBox into its own component.
- Buttons and data rendered conditionally based on ownership/auth state.