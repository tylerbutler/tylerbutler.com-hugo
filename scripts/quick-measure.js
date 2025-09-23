/**
 * Quick Measure Tool
 * Simplified measurement for rapid iteration during visual matching
 * Copy-paste this into browser console for instant measurements
 */

// ONE-LINER for quick height checking
function quickHeight() {
  const main = document.querySelector('#main, section#main');
  const isModern = document.body.classList.contains('modern-layout');
  return {
    layout: isModern ? 'MODERN' : 'FOUNDATION',
    mainHeight: Math.round(main?.getBoundingClientRect().height || 0),
    articles: Array.from(document.querySelectorAll('article')).map(a => Math.round(a.getBoundingClientRect().height)),
    totalArticleHeight: Array.from(document.querySelectorAll('article')).reduce((sum, a) => sum + a.getBoundingClientRect().height, 0)
  };
}

// DETAILED measurement for specific debugging
function detailedMeasure() {
  const main = document.querySelector('#main, section#main');
  const articles = Array.from(document.querySelectorAll('article'));
  const paragraphs = Array.from(document.querySelectorAll('p')).slice(0, 10);
  
  return {
    main: {
      height: Math.round(main?.getBoundingClientRect().height || 0),
      padding: {
        top: getComputedStyle(main).paddingTop,
        bottom: getComputedStyle(main).paddingBottom
      }
    },
    
    articles: articles.map((article, i) => ({
      index: i,
      height: Math.round(article.getBoundingClientRect().height),
      margin: {
        top: getComputedStyle(article).marginTop,
        bottom: getComputedStyle(article).marginBottom
      }
    })),
    
    paragraphs: paragraphs.map((p, i) => ({
      index: i,
      height: Math.round(p.getBoundingClientRect().height),
      lineHeight: getComputedStyle(p).lineHeight,
      marginBottom: getComputedStyle(p).marginBottom
    })),
    
    summary: {
      totalArticles: articles.length,
      avgArticleHeight: articles.length > 0 ? Math.round(articles.reduce((sum, a) => sum + a.getBoundingClientRect().height, 0) / articles.length) : 0,
      totalParagraphs: document.querySelectorAll('p').length,
      isModern: document.body.classList.contains('modern-layout')
    }
  };
}

// COMPARISON function for side-by-side checking
function compare(foundation, modern) {
  const diff = modern.mainHeight - foundation.mainHeight;
  
  console.log(`📏 HEIGHT COMPARISON:
Foundation: ${foundation.mainHeight}px
Modern: ${modern.mainHeight}px  
Difference: ${diff}px ${diff > 0 ? '(Modern is TALLER)' : '(Modern is SHORTER)'}

🎯 TARGET: Make modern layout ${Math.abs(diff)}px ${diff > 0 ? 'shorter' : 'taller'}`);
  
  // Article-by-article comparison
  const maxArticles = Math.min(foundation.articles.length, modern.articles.length);
  console.log('\n📰 ARTICLE COMPARISON:');
  for (let i = 0; i < maxArticles; i++) {
    const articleDiff = modern.articles[i] - foundation.articles[i];
    console.log(`Article ${i}: Foundation ${foundation.articles[i]}px → Modern ${modern.articles[i]}px (${articleDiff > 0 ? '+' : ''}${articleDiff}px)`);
  }
  
  return {
    totalDiff: diff,
    articleDiffs: foundation.articles.map((f, i) => modern.articles[i] - f),
    recommendation: diff > 0 ? 'Reduce spacing/margins' : 'Increase spacing/margins'
  };
}

// CSS GENERATOR based on measurements
function generateCSS(foundationHeight, modernHeight) {
  const diff = modernHeight - foundationHeight;
  const adjustmentPercentage = diff / foundationHeight;
  
  console.log(`🎨 CSS SUGGESTIONS to close ${diff}px gap:`);
  
  if (Math.abs(diff) > 50) {
    console.log(`
/* Major height adjustment needed (${diff}px) */
body.modern-layout p {
  margin-bottom: ${diff > 0 ? '1rem' : '1.5rem'} !important; /* was 1.25rem */
}

body.modern-layout article {
  margin-bottom: ${diff > 0 ? '1.5rem' : '2.5rem'} !important; /* Adjust article spacing */
}
`);
  } else {
    console.log(`
/* Fine-tuning needed (${diff}px) */
body.modern-layout p {
  line-height: ${diff > 0 ? '1.5' : '1.7'} !important; /* Adjust line spacing */
}
`);
  }
}

// USAGE
console.log(`
🚀 QUICK MEASURE TOOLS LOADED!

BASIC USAGE:
1. Foundation site: foundation = quickHeight()
2. Modern site:     modern = quickHeight()  
3. Compare:         compare(foundation, modern)

DETAILED USAGE:
1. Foundation site: foundationDetail = detailedMeasure()
2. Modern site:     modernDetail = detailedMeasure()

CSS GENERATION:
generateCSS(foundation.mainHeight, modern.mainHeight)

EXAMPLE:
foundation = quickHeight() // Run on Foundation layout
modern = quickHeight()     // Run on Modern layout
compare(foundation, modern)
`);

// Export to global scope
window.quickHeight = quickHeight;
window.detailedMeasure = detailedMeasure;
window.compare = compare;
window.generateCSS = generateCSS;