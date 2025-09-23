/**
 * Visual Parity Analyzer
 * Automatically compares Foundation vs Modern layout dimensions
 * Run this in browser console on both layouts to find exact differences
 */

class VisualParityAnalyzer {
  constructor() {
    this.measurements = {};
    this.selectors = {
      main: '#main, section#main',
      sidebar: '#sidebar, section#sidebar', 
      header: 'header#primary',
      articles: 'article',
      paragraphs: 'p',
      headings: 'h1, h2, h3, h4, h5, h6',
      lists: 'ul, ol',
      images: 'img',
      codeBlocks: 'pre, code'
    };
  }

  measureElement(element) {
    if (!element) return null;
    
    const rect = element.getBoundingClientRect();
    const styles = getComputedStyle(element);
    
    return {
      // Dimensions
      width: Math.round(rect.width * 100) / 100,
      height: Math.round(rect.height * 100) / 100,
      
      // Position
      top: Math.round(rect.top * 100) / 100,
      left: Math.round(rect.left * 100) / 100,
      
      // Spacing
      marginTop: styles.marginTop,
      marginRight: styles.marginRight,
      marginBottom: styles.marginBottom,
      marginLeft: styles.marginLeft,
      
      paddingTop: styles.paddingTop,
      paddingRight: styles.paddingRight,
      paddingBottom: styles.paddingBottom,
      paddingLeft: styles.paddingLeft,
      
      // Typography
      fontSize: styles.fontSize,
      lineHeight: styles.lineHeight,
      
      // Display
      display: styles.display,
      position: styles.position
    };
  }

  measureAll() {
    console.log('🔍 Starting Visual Parity Analysis...');
    
    // Main layout containers
    this.measurements.main = this.measureElement(document.querySelector(this.selectors.main));
    this.measurements.sidebar = this.measureElement(document.querySelector(this.selectors.sidebar));
    this.measurements.header = this.measureElement(document.querySelector(this.selectors.header));
    
    // Content elements (sample first 10 of each)
    this.measurements.articles = Array.from(document.querySelectorAll(this.selectors.articles))
      .slice(0, 10)
      .map((el, i) => ({ 
        index: i, 
        tagName: el.tagName,
        className: el.className,
        ...this.measureElement(el) 
      }));
    
    this.measurements.paragraphs = Array.from(document.querySelectorAll(this.selectors.paragraphs))
      .slice(0, 20)
      .map((el, i) => ({ 
        index: i,
        parentTag: el.parentElement.tagName,
        ...this.measureElement(el) 
      }));
    
    this.measurements.headings = Array.from(document.querySelectorAll(this.selectors.headings))
      .slice(0, 15)
      .map((el, i) => ({ 
        index: i,
        tagName: el.tagName,
        textContent: el.textContent.substring(0, 50),
        ...this.measureElement(el) 
      }));
    
    this.measurements.lists = Array.from(document.querySelectorAll(this.selectors.lists))
      .slice(0, 10)
      .map((el, i) => ({ 
        index: i,
        tagName: el.tagName,
        itemCount: el.children.length,
        ...this.measureElement(el) 
      }));

    // Summary statistics
    this.measurements.summary = {
      totalMainHeight: this.measurements.main?.height || 0,
      totalArticles: document.querySelectorAll(this.selectors.articles).length,
      totalParagraphs: document.querySelectorAll(this.selectors.paragraphs).length,
      totalHeadings: document.querySelectorAll(this.selectors.headings).length,
      averageParagraphHeight: this.measurements.paragraphs.length > 0 
        ? this.measurements.paragraphs.reduce((sum, p) => sum + p.height, 0) / this.measurements.paragraphs.length
        : 0,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      isModernLayout: document.body.classList.contains('modern-layout')
    };
    
    console.log('✅ Analysis complete!');
    return this.measurements;
  }

  compare(foundationData, modernData) {
    console.log('🔀 Comparing Foundation vs Modern layouts...');
    
    const comparison = {
      mainHeightDiff: (modernData.main?.height || 0) - (foundationData.main?.height || 0),
      sidebarHeightDiff: (modernData.sidebar?.height || 0) - (foundationData.sidebar?.height || 0),
      headerHeightDiff: (modernData.header?.height || 0) - (foundationData.header?.height || 0),
      
      paragraphDifferences: [],
      articleDifferences: [],
      headingDifferences: [],
      
      summary: {
        totalHeightGap: (modernData.summary?.totalMainHeight || 0) - (foundationData.summary?.totalMainHeight || 0),
        avgParagraphGap: (modernData.summary?.averageParagraphHeight || 0) - (foundationData.summary?.averageParagraphHeight || 0)
      }
    };

    // Compare paragraphs
    const maxParagraphs = Math.min(foundationData.paragraphs?.length || 0, modernData.paragraphs?.length || 0);
    for (let i = 0; i < maxParagraphs; i++) {
      const foundation = foundationData.paragraphs[i];
      const modern = modernData.paragraphs[i];
      
      comparison.paragraphDifferences.push({
        index: i,
        heightDiff: modern.height - foundation.height,
        marginBottomDiff: parseFloat(modern.marginBottom) - parseFloat(foundation.marginBottom),
        lineHeightDiff: parseFloat(modern.lineHeight) - parseFloat(foundation.lineHeight)
      });
    }

    // Compare articles
    const maxArticles = Math.min(foundationData.articles?.length || 0, modernData.articles?.length || 0);
    for (let i = 0; i < maxArticles; i++) {
      const foundation = foundationData.articles[i];
      const modern = modernData.articles[i];
      
      comparison.articleDifferences.push({
        index: i,
        heightDiff: modern.height - foundation.height,
        marginBottomDiff: parseFloat(modern.marginBottom) - parseFloat(foundation.marginBottom)
      });
    }

    // Find biggest contributors to height difference
    const paragraphContribution = comparison.paragraphDifferences.reduce((sum, p) => sum + p.heightDiff, 0);
    const articleMarginContribution = comparison.articleDifferences.reduce((sum, a) => sum + a.marginBottomDiff, 0);
    
    comparison.analysis = {
      biggestContributors: [
        { element: 'paragraphs', contribution: paragraphContribution },
        { element: 'articleMargins', contribution: articleMarginContribution }
      ].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution)),
      
      recommendations: this.generateRecommendations(comparison)
    };

    console.log('📊 Comparison Results:', comparison);
    return comparison;
  }

  generateRecommendations(comparison) {
    const recommendations = [];
    
    // Main height gap
    if (Math.abs(comparison.summary.totalHeightGap) > 50) {
      recommendations.push({
        priority: 'HIGH',
        element: 'main content',
        issue: `Height gap of ${comparison.summary.totalHeightGap.toFixed(1)}px`,
        suggestion: 'Focus on paragraph spacing and article margins'
      });
    }

    // Paragraph spacing issues
    const avgParagraphGap = comparison.paragraphDifferences.reduce((sum, p) => sum + p.heightDiff, 0) / comparison.paragraphDifferences.length;
    if (Math.abs(avgParagraphGap) > 2) {
      recommendations.push({
        priority: 'MEDIUM',
        element: 'paragraphs',
        issue: `Average paragraph height difference: ${avgParagraphGap.toFixed(1)}px`,
        suggestion: avgParagraphGap > 0 ? 'Reduce line-height or margin-bottom' : 'Increase line-height or margin-bottom'
      });
    }

    // Article spacing issues
    const avgArticleGap = comparison.articleDifferences.reduce((sum, a) => sum + a.heightDiff, 0) / comparison.articleDifferences.length;
    if (Math.abs(avgArticleGap) > 10) {
      recommendations.push({
        priority: 'MEDIUM',
        element: 'articles',
        issue: `Average article height difference: ${avgArticleGap.toFixed(1)}px`,
        suggestion: 'Adjust article margin-bottom and internal spacing'
      });
    }

    return recommendations;
  }

  generateCSS(comparison) {
    const css = [];
    
    // Generate CSS fixes based on comparison
    const avgParagraphMarginDiff = comparison.paragraphDifferences.reduce((sum, p) => sum + p.marginBottomDiff, 0) / comparison.paragraphDifferences.length;
    if (Math.abs(avgParagraphMarginDiff) > 1) {
      const currentMargin = parseFloat(comparison.paragraphDifferences[0]?.marginBottom || '1.25rem');
      const adjustedMargin = currentMargin - avgParagraphMarginDiff;
      css.push(`body.modern-layout p { margin-bottom: ${adjustedMargin}px !important; }`);
    }

    const avgParagraphHeightDiff = comparison.paragraphDifferences.reduce((sum, p) => sum + p.heightDiff, 0) / comparison.paragraphDifferences.length;
    if (Math.abs(avgParagraphHeightDiff) > 2) {
      // Suggest line-height adjustment
      css.push(`/* Consider adjusting line-height by approximately ${avgParagraphHeightDiff.toFixed(1)}px worth */`);
    }

    return css.join('\n');
  }

  exportResults() {
    return {
      measurements: this.measurements,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  }
}

// Usage instructions
console.log(`
🔧 Visual Parity Analyzer Loaded!

USAGE:
1. Foundation Layout:
   const analyzer1 = new VisualParityAnalyzer();
   const foundationData = analyzer1.measureAll();

2. Modern Layout:
   const analyzer2 = new VisualParityAnalyzer();
   const modernData = analyzer2.measureAll();

3. Compare:
   const comparison = analyzer1.compare(foundationData, modernData);

4. Generate CSS fixes:
   const cssFixes = analyzer1.generateCSS(comparison);

QUICK START:
window.analyzer = new VisualParityAnalyzer();
window.results = analyzer.measureAll();
`);

// Auto-export to global scope for easy use
window.VisualParityAnalyzer = VisualParityAnalyzer;