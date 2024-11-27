module.exports = {
  '{packages,app}/**/*.{json,css,scss,md,mdx}': ['prettier --write'],
  '{packages,app}/**/*.{js,ts}': ['eslint --quiet --fix', 'prettier --write'],
  '{packages,app}/**/*.{jsx,tsx}': ['eslint --quiet --fix', 'prettier --write']
}
