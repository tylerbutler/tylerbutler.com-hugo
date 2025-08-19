# Hugo Site CSS/HTML Modernization Plan

## Current State Analysis

**Libraries & Dependencies:**
- jQuery 2.2.4 (from Microsoft CDN)
- Bigfoot.js (for footnotes) 
- Semantic UI sticky component
- Foundation 6 CSS framework (partial usage)
- SASS-based styling
- Gulp build system in theme

**Layout Patterns:**
- Foundation 6 grid system (`small-`, `medium-`, `large-` classes)
- Float-based layouts
- Custom SASS mixins for typography and colors
- Old-style CSS with prefixed properties
- Inline JavaScript for component initialization

## Modernization Strategy

### Phase 1: Visual Regression Testing Setup
**Tool Recommendation: Playwright**
- Native Hugo compatibility
- Built-in screenshot comparison
- Cross-browser testing capabilities
- CI/CD integration ready

```bash
npm install -D @playwright/test
```

### Phase 2: CSS Grid/Flexbox Migration
**Priority Order:**
1. Replace Foundation grid with CSS Grid for main layouts
2. Convert float-based sidebar to flexbox  
3. Update responsive breakpoints to modern approach
4. Replace SASS mixins with CSS custom properties

### Phase 3: JavaScript Modernization  
**Remove Dependencies:**
- Replace jQuery with vanilla JavaScript
- Replace Bigfoot.js with modern footnote solution
- Remove Semantic UI sticky (use `position: sticky`)
- Eliminate CDN dependencies

### Phase 4: Modern CSS Features
**Upgrades:**
- Convert SASS variables to CSS custom properties
- Use `clamp()` for responsive typography
- Implement container queries where beneficial
- Add CSS logical properties for better i18n
- Use modern color functions (oklch/lch)

### Phase 5: HTML Semantic Improvements
- Add proper ARIA labels
- Implement semantic HTML5 elements
- Optimize for accessibility
- Add microdata/structured data

## Testing Strategy

### Baseline Screenshots
Capture current design across:
- Desktop (1920x1080, 1366x768)
- Tablet (768x1024) 
- Mobile (375x667, 414x896)

### Component-Level Testing
Individual screenshots of:
- Header/navigation
- Article layouts
- Sidebar components
- Footer
- Code blocks

### Cross-Browser Coverage
Chrome, Firefox, Safari

## Implementation Approach

**Incremental Migration:**
- Keep both old and new CSS during transition
- Use feature detection for progressive enhancement
- Test each component individually
- Maintain Hugo's static generation performance

**Rollback Strategy:**
- Git branches for each phase
- Feature flags for new CSS
- Automated screenshot comparison in CI
- Performance monitoring

## Implementation Status

- [x] Phase 1: Visual Regression Testing Setup ✅
  - [x] Playwright installed and configured
  - [x] Baseline screenshots captured for all layouts/devices
  - [x] Test scripts added to package.json
  - [x] Cross-browser testing setup (Chrome, Firefox, Safari)
  
- [x] Phase 2: CSS Grid/Flexbox Migration ✅ 
  - [x] Modern CSS foundation created with custom properties
  - [x] CSS Grid layout system implemented
  - [x] Flexbox utilities for components
  - [x] Fluid typography with clamp()
  - [x] Progressive enhancement with feature detection
  - [x] Modern templates created (baseof-modern.html, etc.)
  
- [ ] Phase 3: JavaScript Modernization 🚧
  - [x] Modern footnote handling (replacing Bigfoot.js)
  - [x] Smooth scrolling implementation
  - [x] Layout toggle functionality
  - [ ] Remove remaining jQuery dependencies
  - [ ] Eliminate CDN dependencies
  - [ ] Replace Semantic UI sticky component
  
- [ ] Phase 4: Modern CSS Features (Integrated into Phase 2)
  - [x] CSS custom properties (replacing SASS variables)
  - [x] Modern color functions (color-mix)
  - [x] CSS logical properties
  - [ ] Container queries implementation
  - [ ] Advanced CSS animations
  
- [ ] Phase 5: HTML Semantic Improvements
  - [x] Proper ARIA labels added
  - [x] Semantic HTML5 elements implemented
  - [x] Microdata/structured data (schema.org)
  - [ ] Enhanced accessibility testing
  - [ ] SEO optimization

---

This plan preserves the existing visual design while modernizing the underlying technology stack, ensuring no layout regressions through automated visual testing.