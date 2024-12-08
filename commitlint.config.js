export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'prefix-commit-message': [2, 'always'],
    'type-empty': [0, 'never'],
    'subject-empty': [0, 'never']
  },
  plugins: [
    {
      rules: {
        'prefix-commit-message': ({ raw }) => {
          const prefixPattern = /^\[TICKET-\d+\]: .+/;
          return [
            prefixPattern.test(raw),
            `Your commit message should start with a ticket ID in the format "[TICKET-XXX]: Commit message".`
          ];
        }
      }
    }
  ]
};
