import re

# Read the file
with open('frontend/src/services/api.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove safeRequest function definition
content = re.sub(
    r'const safeRequest = async \(requestFn, fallback\) => \{[^}]+\};',
    '', 
    content,
    flags=re.DOTALL
)

# Pattern 1: Convert simple safeRequest calls
# From: safeRequest(() => api.METHOD(PATH), () => { ... })
# To: async () => { const response = await api.METHOD(PATH); return response.data; }

pattern1 = r"safeRequest\(\(\) => (api\.\w+\([^)]+\)), \(\) => \{[^}]+\}\)"
replacement1 = r"async () => { const response = await \1; return response.data; }"
content = re.sub(pattern1, replacement1, content)

# Pattern 2: For multiline safeRequest
pattern2 = r"safeRequest\(\s*\(\) => (api\.\w+\([^)]+\)),\s*\(\) => \{[\s\S]*?\}\s*\)"
replacement2 = r"async () => { const response = await \1; return response.data; }"
content = re.sub(pattern2, replacement2, content)

# Write back
with open('frontend/src/services/api.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed all safeRequest references!")
