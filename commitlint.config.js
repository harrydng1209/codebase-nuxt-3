export default {
  extends: ['@commitlint/config-conventional'],

  plugins: [
    {
      rules: {
        'prefix-commit-message': ({ raw }) => {
          const prefixPattern = /^\[TICKET-\d+\]: .+/;
          return [
            prefixPattern.test(raw),
            `Your commit message should start with a ticket ID in the format "[TICKET-XXX]: Commit message".`,
          ];
        },
      },
    },
  ],

  rules: {
    'prefix-commit-message': [2, 'always'],
    'subject-empty': [0, 'never'],
    'type-empty': [0, 'never'],
  },
};
