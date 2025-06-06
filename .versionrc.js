// Configuration for standard-version
// https://github.com/conventional-changelog/standard-version

export default {
  types: [
    { type: 'feat', section: 'Features' },
    { type: 'fix', section: 'Bug Fixes' },
    { type: 'chore', hidden: true },
    { type: 'docs', section: 'Documentation' },
    { type: 'style', hidden: true },
    { type: 'refactor', section: 'Code Refactoring' },
    { type: 'perf', section: 'Performance Improvements' },
    { type: 'test', hidden: true },
  ],
  commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
  compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}',
  bumpFiles: [
    {
      filename: 'package.json',
      type: 'json',
    },
  ],
};
