module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  'parserOptions': {
    'project': [
      'tsconfig.json'
    ],
    'createDefaultProgram': true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prefer-arrow', 'import'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'sibling'],
        pathGroups: [
          {
            pattern: '*.scss',
            group: 'sibling',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: [],
        alphabetize: {
          order: 'asc'
        },
        'newlines-between': 'always'
      }
    ],
    'quotes': 'off',
    'prefer-arrow-callback': 'error',
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        'disallowPrototype': true,
        'singleReturnOnly': false,
        'classPropertiesAllowed': false
      }
    ],
    'arrow-body-style': ['error', 'as-needed'],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/unbound-method': [
      'error',
      {
        'ignoreStatic': true
      }
    ],
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'no-case-declarations': 'warn',
    '@typescript-eslint/comma-spacing': ['error', {'before': false, 'after': true}],
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'variable',
        'format': ['camelCase', 'PascalCase', 'UPPER_CASE'],
        'leadingUnderscore': 'allow'
      },
      {
        'selector': 'variable',
        'types': ['boolean'],
        'format': ['camelCase', 'PascalCase', 'UPPER_CASE'],
        'prefix': ['is', 'should', 'has', 'can', 'did', 'will', 'IS', 'SHOULD', 'HAS', 'CAN', 'DID', 'WILL']
      },
      {
        'selector': 'memberLike',
        'modifiers': ['private'],
        'format': ['camelCase'],
        'leadingUnderscore': 'require'
      },
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'suffix': ['Interface']
      },
      {
        'selector': 'enum',
        'format': ['PascalCase', 'UPPER_CASE'],
        'suffix': ['Enum', '_ENUM']
      },
      {
        'selector': 'typeAlias',
        'format': ['PascalCase'],
        'suffix': ['Type']
      }
    ]
  },
}
