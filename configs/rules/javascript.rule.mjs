export const javascriptRule = {
  rules: {
    semi: ['error', 'always'],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Identifier[name="Symbol"]',
        message:
          'Symbol не должен использоваться в средах без нативной поддержки (Airbnb JavaScript Style Guide, Types 1.1).',
      },
      {
        selector: 'CallExpression[callee.name="Symbol"]',
        message:
          'Symbol не должен использоваться в средах без нативной поддержки (Airbnb JavaScript Style Guide, Types 1.1).',
      },
      {
        selector: 'NewExpression[callee.name="Symbol"]',
        message:
          'Symbol не должен использоваться в средах без нативной поддержки (Airbnb JavaScript Style Guide, Types 1.1).',
      },
      {
        selector: 'Identifier[name="BigInt"]',
        message:
          'BigInt не должен использоваться в средах без нативной поддержки (Airbnb JavaScript Style Guide, Types 1.1).',
      },
      {
        selector: 'CallExpression[callee.name="BigInt"]',
        message:
          'BigInt не должен использоваться в средах без нативной поддержки (Airbnb JavaScript Style Guide, Types 1.1).',
      },
      {
        selector: 'BigIntLiteral',
        message:
          'BigInt не должен использоваться в средах без нативной поддержки (Airbnb JavaScript Style Guide, Types 1.1).',
      },
    ],
  },
};
