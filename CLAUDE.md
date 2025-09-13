# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based personal website for Tyler Butler (tylerbutler.com) that uses a custom theme called "dark_rainbow". The site has recently undergone modernization to eliminate external dependencies while maintaining visual parity.

## Development Commands

### Build and Development
- `npm run build` or `hugo` - Build the static site
- `hugo server` - Start development server (default port 1313)
- `hugo server --port 1313 --bind 127.0.0.1 --baseURL http://127.0.0.1:1313 --environment test` - Start test server for visual testing

### Testing
- `npm test` or `playwright test` - Run all visual regression tests
- `npm run test:visual` - Run visual tests only
- `npm run test:headed` - Run tests with browser UI
- `npm run test:update` - Update visual regression baseline snapshots

### Git Submodules
After fresh clone, initialize nested submodules:
```bash
git submodule update --recursive --init
```

## Architecture & Structure

### Technology Stack
- **Static Site Generator**: Hugo (extended version, managed via mise)
- **Node Version**: 24 (via mise)
- **Theme**: Custom "dark_rainbow" theme in `/themes/dark_rainbow/`
- **Testing**: Playwright for visual regression testing
- **CSS**: Modern CSS with custom properties, CSS Grid, Flexbox
- **JavaScript**: Vanilla ES2020+ with Littlefoot.js for footnotes (self-hosted)

### Layout System
The site maintains two parallel layout systems during modernization:
- **Legacy layouts**: Original Foundation-based layouts with jQuery dependencies
- **Modern layouts**: Files ending in `-modern.html` using CSS Grid/Flexbox with zero external dependencies

Key template files:
- `themes/dark_rainbow/layouts/_default/baseof-modern.html` - Modern base template
- `themes/dark_rainbow/layouts/index-modern.html` - Modern homepage
- `themes/dark_rainbow/layouts/_default/single-modern.html` - Modern article template

### CSS Architecture
Modern CSS approach includes:
- CSS custom properties for theming (defined in `:root`)
- Fluid typography using `clamp()`
- CSS Grid for main layouts
- Flexbox for component layouts
- `position: sticky` for sidebar (replaced Semantic UI)
- Feature detection for progressive enhancement

### Content Structure
- `/content/articles/` - Blog posts and articles
- `/content/colophon/` - Site information
- `/content/projects/` - Project pages
- Static assets in `/static/` and theme-specific in `/themes/dark_rainbow/static/`

### Configuration
- Main config: `/config/_default/hugo.yaml`
- Environment-specific configs in `/config/{environment}/`
- Deployment: Netlify (`netlify.toml`) and GitHub Actions (`.github/workflows/deploy.yml`)

## Testing Approach

Visual regression testing with Playwright captures screenshots across:
- **Browsers**: Chrome, Firefox, Safari (WebKit)
- **Devices**: Desktop, Mobile (Pixel 5, iPhone 12), Tablet (iPad Pro)
- **Test server**: Automatically starts Hugo server on port 1313 during tests

Test files located in `/tests/visual/`:
- `baseline.spec.js` - Core layout tests
- `footnotes.spec.js` - Footnote functionality tests
- `modern-layout.spec.js` - Modern layout verification

## Recent Modernization

The site completed a major modernization (see MODERNIZATION_PLAN.md) that:
- Eliminated all external CDN dependencies
- Replaced jQuery with vanilla JavaScript
- Migrated from Foundation grid to CSS Grid/Flexbox
- Replaced Bigfoot.js with Littlefoot.js (jQuery-free)
- Added comprehensive visual regression testing
- Maintained 100% visual parity with original design
- Reduced bundle size by 50KB+

## Development Notes

When modifying layouts or CSS:
1. Always run visual regression tests to ensure no unintended changes
2. Modern templates use `-modern` suffix during transition period
3. CSS custom properties are defined in the `:root` selector
4. Footnotes use Littlefoot.js (self-hosted in `/static/css/littlefoot.css`)
5. The site uses Hugo's Goldmark renderer with `unsafe: true` for raw HTML support