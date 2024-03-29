module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    plugins: ['unused-imports', 'jsx-a11y', 'simple-import-sort'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],

    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'jsx-a11y/img-redundant-alt': [
            2,
            {
                components: ['Image'],
                words: ['Bild', 'Foto'],
            },
        ],
        'no-console': 'off',
        'react/prop-types': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
        'sort-imports': [
            'error',
            {
                ignoreDeclarationSort: true,
            },
        ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'simple-import-sort/exports': 'warn',
        'simple-import-sort/imports': [
            'warn',
            {
                groups: [
                    // ext library & side effect imports
                    ['^@?\\w', '^\\u0000'],
                    // {s}css files
                    ['^.+\\.s?css$'],
                    // Lib and hooks
                    ['^@/lib', '^@/hooks'],
                    // static data
                    ['^@/data'],
                    // components
                    ['^@/components', '^@/container'],
                    // zustand store
                    ['^@/store'],
                    // Other imports
                    ['^@/'],
                    // relative paths up until 3 level
                    [
                        '^\\./?$',
                        '^\\.(?!/?$)',
                        '^\\.\\./?$',
                        '^\\.\\.(?!/?$)',
                        '^\\.\\./\\.\\./?$',
                        '^\\.\\./\\.\\.(?!/?$)',
                        '^\\.\\./\\.\\./\\.\\./?$',
                        '^\\.\\./\\.\\./\\.\\.(?!/?$)',
                    ],
                    ['^@/types'],
                    // other that didnt fit in
                    ['^'],
                ],
            },
        ],
    },
};
