import pluginReact from '@eslint-react/eslint-plugin';
import pluginNext from '@next/eslint-plugin-next';
import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import pluginAntfu from 'eslint-plugin-antfu';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPerfectionist from 'eslint-plugin-perfectionist';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginUnusedImports from 'eslint-plugin-unused-imports';

export default [
  {
    files: ['**/*.?([cm])ts', '**/*.?([cm])tsx'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true,
      },
      ecmaVersion: 2022,
    },
    plugins: {
      '@typescript-eslint': pluginTs,
      'unused-imports': pluginUnusedImports,
      antfu: pluginAntfu,
    },
    rules: {
      ...pluginTs.configs['eslint-recommended'].overrides[0].rules,
      ...pluginTs.configs.strict.rules,
      'no-dupe-class-members': 'off',
      'no-redeclare': 'off',
      'no-use-before-define': 'off',
      'no-useless-constructor': 'off',
      curly: 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {'ts-expect-error': 'allow-with-description'},
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: false,
          prefer: 'type-imports',
        },
      ],

      '@typescript-eslint/method-signature-style': ['error', 'property'],
      '@typescript-eslint/no-dupe-class-members': 'error',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {allowInterfaces: 'always'},
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-redeclare': ['error', {builtinGlobals: false}],
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {classes: false, functions: false, variables: true},
      ],
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/unified-signatures': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
      'antfu/import-dedupe': 'error',
      'antfu/consistent-chaining': 'error',
      'antfu/no-top-level-await': 'error',
      'antfu/top-level-function': 'warn',
    },
  },
  {
    files: ['**/*.?([cm])[jt]s?(x)'],
    plugins: {
      react: pluginReact.configs.all.plugins['@eslint-react'],
      'react-dom': pluginReact.configs.all.plugins['@eslint-react/dom'],
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
      'jsx-a11y': pluginJsxA11y,
    },
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      sourceType: 'module',
    },
    rules: {
      'react/ensure-forward-ref-using-ref': 'warn',
      'react/no-access-state-in-setstate': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-children-count': 'warn',
      'react/no-children-for-each': 'warn',
      'react/no-children-map': 'warn',
      'react/no-children-only': 'warn',
      'react/no-children-prop': 'warn',
      'react/no-children-to-array': 'warn',
      'react/no-clone-element': 'warn',
      'react/no-comment-textnodes': 'warn',
      'react/no-component-will-mount': 'error',
      'react/no-component-will-receive-props': 'error',
      'react/no-component-will-update': 'error',
      'react/no-create-ref': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-duplicate-key': 'error',
      'react/no-implicit-key': 'error',
      'react/no-missing-key': 'error',
      'react/no-nested-components': 'warn',
      'react/no-redundant-should-component-update': 'error',
      'react/no-set-state-in-component-did-mount': 'warn',
      'react/no-set-state-in-component-did-update': 'warn',
      'react/no-set-state-in-component-will-update': 'warn',
      'react/no-string-refs': 'error',
      'react/no-unsafe-component-will-mount': 'warn',
      'react/no-unsafe-component-will-receive-props': 'warn',
      'react/no-unsafe-component-will-update': 'warn',
      'react/no-unstable-context-value': 'error',
      'react/no-unstable-default-props': 'error',
      'react/no-unused-class-component-members': 'warn',
      'react/no-unused-state': 'warn',
      'react/no-useless-fragment': 'warn',
      'react/prefer-destructuring-assignment': 'warn',
      'react/prefer-shorthand-boolean': 'warn',
      'react/prefer-shorthand-fragment': 'warn',
      'react-dom/no-children-in-void-dom-elements': 'warn',
      'react-dom/no-dangerously-set-innerhtml': 'warn',
      'react-dom/no-dangerously-set-innerhtml-with-children': 'error',
      'react-dom/no-find-dom-node': 'error',
      'react-dom/no-missing-button-type': 'warn',
      'react-dom/no-missing-iframe-sandbox': 'warn',
      'react-dom/no-namespace': 'error',
      'react-dom/no-render-return-value': 'error',
      'react-dom/no-script-url': 'warn',
      'react-dom/no-unsafe-iframe-sandbox': 'warn',
      'react-dom/no-unsafe-target-blank': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: false,
          allowExportNames: [
            'dynamic',
            'dynamicParams',
            'revalidate',
            'fetchCache',
            'runtime',
            'preferredRegion',
            'maxDuration',
            'config',
            'generateStaticParams',
            'metadata',
            'generateMetadata',
            'viewport',
            'generateViewport',
          ],
        },
      ],
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-has-content': [
        'warn',
        {components: ['Link', 'NavLink']},
      ],
      'jsx-a11y/anchor-is-valid': [
        'warn',
        {aspects: ['noHref', 'invalidHref']},
      ],
      'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-role': ['warn', {ignoreNonDOM: true}],
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/iframe-has-title': 'warn',
      'jsx-a11y/img-redundant-alt': 'warn',
      'jsx-a11y/lang': 'warn',
      'jsx-a11y/no-access-key': 'warn',
      'jsx-a11y/no-redundant-roles': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
    },
  },
  {
    plugins: {
      '@next/next': pluginNext,
    },
    files: ['**/*.?([cm])ts', '**/*.?([cm])tsx'],
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  {
    plugins: {
      unicorn: pluginUnicorn,
    },
    rules: {
      ...pluginUnicorn.configs['flat/recommended'].rules,
      'unicorn/prefer-global-this': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          checkFilenames: false,
          replacements: {
            ref: false,
            refs: false,
            props: false,
            params: false,
            env: false,
            prop: false,
          },
        },
      ],
    },
  },
  {
    plugins: {
      perfectionist: pluginPerfectionist,
    },
    rules: {
      'perfectionist/sort-exports': ['error', {order: 'asc', type: 'natural'}],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type',
            ['parent-type', 'sibling-type', 'index-type', 'internal-type'],
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
            'side-effect',
            'object',
            'unknown',
          ],
          internalPattern: ['~/.*'],
          newlinesBetween: 'always',
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-named-exports': [
        'error',
        {order: 'asc', type: 'natural'},
      ],
      'perfectionist/sort-named-imports': [
        'error',
        {order: 'asc', type: 'natural'},
      ],
      'perfectionist/sort-union-types': [
        'error',
        {order: 'asc', type: 'natural'},
      ],
    },
  },
  {
    ignores: [
      '**/node_modules',
      '**/package-lock.json',
      '**/pnpm-lock.yaml',
      '**/.next',
      '**/.idea',
      '**/.cache',
      '**/.output',
      '**/components.d.ts',
    ],
  },
];
