const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Console capture script content
const CONSOLE_SCRIPT_TAG = '<script src="/dashboard-console-capture.js"></script>';

// Find HTML files to inject script into
const htmlFiles = glob.sync('.next/**/*.html', { dot: true });

htmlFiles.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Only inject if not already present
    if (!content.includes(CONSOLE_SCRIPT_TAG) && !content.includes('dashboard-console-capture.js')) {
      // Try to inject in head first, then body
      if (content.includes('</head>')) {
        content = content.replace('</head>', `  ${CONSOLE_SCRIPT_TAG}\n</head>`);
      } else if (content.includes('<body')) {
        content = content.replace(/(<body[^>]*>)/, `$1\n  ${CONSOLE_SCRIPT_TAG}`);
      }
      
      fs.writeFileSync(filePath, content);
      console.log(`Injected console capture script into: ${filePath}`);
    }
  } catch (error) {
    console.warn(`Could not process ${filePath}:`, error.message);
  }
});

console.log('Console capture script injection complete');