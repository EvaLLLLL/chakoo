module.exports = {
  'pre-commit': 'npx lint-staged',
  'commit-msg': 'npx --no -- commitlint --edit'
  // 'pre-push': 'pnpm run test'
}
