const fs = require('fs');

// Read the file
let content = fs.readFileSync('frontend/src/services/api.js', 'utf8');

// Remove any remaining shouldUseMock references
content = content.replace(/if \(shouldUseMock\(\)\) \{[\s\S]*?\}/g, '');

// Convert all safeRequest patterns
// Pattern: export const FUNC = async (PARAMS) => safeRequest(() => api.METHOD(PATH), () => { ... });
content = content.replace(
    /export const (\w+) = async \(([^)]*)\) =>\s+safeRequest\(\(\) => (api\.\w+\([^)]+\)), \(\) => \{[^}]*\}\);/g,
    'export const $1 = async ($2) => {\n  const response = await $3;\n  return response.data;\n};'
);

// Pattern: return safeRequest(() => api.METHOD(PATH), () => ...);
content = content.replace(
    /return safeRequest\(\s*\(\) => (api\.\w+\([^)]+\)),\s*\(\) => [^}]*\}\s*\);/g,
    '{ const response = await $1; return response.data; }'
);

// Pattern: multiline safeRequest
content = content.replace(
    /safeRequest\(\s*\(\) => (api\.[^,]+),\s*\(\) => [\s\S]*?\);/g,
    'async () => { const response = await $1; return response.data; }();'
);

// Write back
fs.writeFileSync('frontend/src/services/api.js', content, 'utf8');

console.log('✅ Removed all safeRequest references!');
