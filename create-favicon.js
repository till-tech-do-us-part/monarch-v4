const fs = require('fs');
const path = require('path');

// SVG favicon content
const svgContent = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
  <rect width='32' height='32' fill='#000000'/>
  <path d='M8 20L6 10L11 14L16 8L21 14L26 10L24 20H8M24 24C24 24.5 24.5 25 25 25H7C6.5 25 6 24.5 6 24V23H24V24Z' fill='#FFB800'/>
</svg>
`;

// Save SVG
fs.writeFileSync(path.join(__dirname, 'public', 'favicon.svg'), svgContent.trim());
console.log('Created favicon.svg');

// Create a simple ICO file (PNG-based)
// For now, we'll use the SVG directly and let browsers handle it
// Most modern browsers support SVG favicons
console.log('Favicon creation complete!');
