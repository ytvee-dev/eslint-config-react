# ESLint Config for React Projects

A comprehensive ESLint configuration that provides type-safe code checking, import conventions, and seamless Prettier integration for React projects.

## Package Name

`@ytvee-dev/eslint-config-react`

## Description

This configuration combines base JavaScript/TypeScript checks, strict quality constraints, and an additional React profile. The package is designed for team development with minimal setup, predictable linter errors, and unified code formatting. For a complete list of rules with examples, see [README_RULES.md](./README_RULES.md). For a brief description of profiles, see [README_STYLEGUIDE.md](./README_STYLEGUIDE.md).

### What's Included

- **Base profile** (`eslint.config.mjs`): Recommended checks from `@eslint/js` and `typescript-eslint` in type-checked mode, common rules for JavaScript and TypeScript, import sorting, and Prettier integration.
- **Strict profile** (`configs/strict.mjs`): Bans `any`, enforces naming conventions, and requires one public type/class/enum per file.
- **React profile** (`configs/react.mjs`): Rules for JSX, hooks, and basic accessibility checks.
- **Prettier configuration** (`prettier.js`): 120 character line width, single quotes, semicolons required, trailing commas, and 2-space indentation.

## Installation

### Prerequisites

Before installing this ESLint configuration, ensure you have:

- **Node.js**: Version 18 or higher (see `engines` field in package.json)
- **Package Manager**: Either npm (comes with Node.js) or Yarn

You can verify your Node.js version by running:

```bash
node --version
```

If you need to install or update Node.js, visit [nodejs.org](https://nodejs.org/).

### Step 1: Install the Package

Install the configuration package as a development dependency. All required plugins and presets will be installed automatically:

```bash
# Using Yarn
yarn add -D @ytvee-dev/eslint-config-react

# Using npm
npm install -D @ytvee-dev/eslint-config-react
```

This single command installs:
- ESLint core
- TypeScript ESLint parser and plugin
- Prettier and ESLint-Prettier integration
- Import sorting plugins
- React plugins (optional, activated only when using React profile)

### Step 2: Configure Prettier

Create a `.prettierrc` file in your project root to configure code formatting:

**Option A: JavaScript format**

```js
// .prettierrc or .prettierrc.js
module.exports = require('@ytvee-dev/eslint-config-react/prettier');
```

**Option B: JSON format**

```json
{
  "extends": "@ytvee-dev/eslint-config-react/prettier"
}
```

This configuration applies the following formatting rules:
- Line width: 120 characters
- Quotes: Single quotes
- Semicolons: Always required
- Trailing commas: Always in multiline structures
- Indentation: 2 spaces

### Step 3: Configure ESLint

Create an `eslint.config.mjs` file in your project root. Choose the configuration that matches your project type:

**For a basic JavaScript/TypeScript project:**

```js
// eslint.config.mjs
import baseConfig from '@ytvee-dev/eslint-config-react';

export default [...baseConfig];
```

**For a React project:**

```js
// eslint.config.mjs
import reactConfig from '@ytvee-dev/eslint-config-react/configs/react';

export default [...reactConfig];
```

**For a project with strict rules:**

```js
// eslint.config.mjs
import strictConfig from '@ytvee-dev/eslint-config-react/configs/strict';

export default [...strictConfig];
```

For more configuration options and profile combinations, see [PROFILES.md](./PROFILES.md).

### Step 4: Configure TypeScript

This ESLint configuration uses TypeScript's `projectService` feature for type-aware linting. Ensure you have a `tsconfig.json` file in your project root.

**Minimal TypeScript configuration:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "lib": ["ES2020"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "build"]
}
```

Note: If your `tsconfig.json` is not in the project root, or if you have multiple TypeScript configurations, you may need to adjust the `parserOptions` in your `eslint.config.mjs`.

### Step 5: Add NPM Scripts

Add linting scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.mjs,.ts,.tsx --report-unused-disable-directives",
    "lint:fix": "eslint . --ext .js,.mjs,.ts,.tsx --report-unused-disable-directives --fix"
  }
}
```

Now you can run linting commands:

```bash
# Check for linting errors
npm run lint
# or
yarn lint

# Automatically fix linting errors
npm run lint:fix
# or
yarn lint:fix
```

### Step 6: IDE Integration (Optional but Recommended)

#### Visual Studio Code

Install the ESLint extension:

1. Open VS Code Extensions (Ctrl+Shift+X or Cmd+Shift+X)
2. Search for "ESLint" by Microsoft
3. Click Install

Add these settings to your `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

#### Other IDEs

- **WebStorm/IntelliJ IDEA**: ESLint support is built-in. Enable it in Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint
- **Sublime Text**: Install the SublimeLinter-eslint package
- **Vim/Neovim**: Use plugins like ALE or coc-eslint

### Step 7: Git Hooks (Optional)

To enforce linting before commits, you can set up git hooks using Husky:

```bash
# Install Husky
npm install -D husky
# or
yarn add -D husky

# Initialize Husky
npx husky init

# Add pre-commit hook
echo "npm run lint" > .husky/pre-commit
```

This ensures that all code is linted before it's committed to your repository.

## Dependencies

All required plugins and configurations are installed as regular dependencies of this package. No additional installation is needed. The linter, import plugins, formatting tools, and React add-ons are automatically included with `@ytvee-dev/eslint-config-react`.

The following packages are included:
- `eslint` - Core ESLint linter
- `@eslint/js` - Official ESLint JavaScript rules
- `typescript-eslint` - TypeScript ESLint integration
- `eslint-plugin-import` - Import/export validation
- `eslint-plugin-simple-import-sort` - Import sorting
- `eslint-plugin-prettier` - Prettier integration
- `prettier` - Code formatter
- `eslint-config-prettier` - Disables conflicting ESLint rules
- `eslint-plugin-react` - React-specific rules
- `eslint-plugin-react-hooks` - React Hooks rules
- `eslint-plugin-jsx-a11y` - Accessibility rules

The `peerDependencies` field exists only for version compatibility checks. The package manager will automatically install the correct versions from the package dependencies.

## No Babel or Shims Required

Unlike `eslint-config-airbnb`, this configuration doesn't depend on Babel or polyfills. The linter works with the standard ESLint parser and `typescript-eslint`.

Runtime shims are also not required because the rules only affect static code analysis, not the execution environment.

## Comparison with Airbnb

### What's Included from Airbnb

- Best Practices rules (variables, functions, objects, arrays, strings)
- Code style (semicolons, braces, commas, spacing)
- Security (no-eval, no-new-func, no-extend-native)
- Comparisons and operators (eqeqeq, no-nested-ternary)

### Key Differences

#### Modular Structure with Separate React Profile

The configuration is built on `@eslint/js` and `typescript-eslint`, with React rules available only when you add `configs/react.mjs` to your `eslint.config.mjs`. Required plugins (`react`, `react-hooks`, `jsx-a11y`) are installed with the package, but unnecessary rules won't affect non-React projects.

#### Formatting Delegated to Prettier

Instead of Airbnb's formatting rules, this package uses `eslint-plugin-prettier/recommended` and a shared `prettier.js` preset. This eliminates style conflicts and ensures consistent output for JS/TS and JSX/TSX files.

#### Different Import Sorting Approach

Instead of Airbnb's `import/order`, this package uses `eslint-plugin-simple-import-sort` with explicit groups for external, internal, and relative modules. Supports `@/` aliases and automatic fixing.

#### Focus on Type Safety and Airbnb Best Practices

The base set includes `pluginJs.configs.recommended`, `typescript-eslint` with type-checked rules, and a large collection of Best Practices rules from the Airbnb Style Guide: variable management (no-var, prefer-const), functions (arrow-body-style, prefer-arrow-callback), objects and arrays (object-shorthand, prefer-destructuring), strings (prefer-template), comparisons (eqeqeq, no-nested-ternary), security (no-eval, no-new-func, no-extend-native), and code style (semi, brace-style, comma-dangle).

#### Autofix for Most Rules

Supports automatic fixing for formatting, import sorting, replacing var with const/let, simplifying arrow functions, and many other Airbnb rules.

## Development Setup

If you want to contribute to or modify this ESLint configuration:

1. Clone the repository
2. Install Node.js 18 or higher
3. Install dependencies:

```bash
# Using Yarn
yarn install

# Using npm
npm install
```

4. Make your changes to the configuration files
5. Test your changes in a sample project
6. Run linting on this repository:

```bash
npm run lint
# or
yarn lint
```

The project includes a ready-made Husky configuration for git hooks. To temporarily disable hooks during commits, use:

```bash
HUSKY=0 git commit -m "message"
```

## Troubleshooting

### TypeScript Errors

If you see errors like "Parsing error: Cannot find tsconfig.json", ensure:
1. You have a `tsconfig.json` file in your project root
2. The file is valid JSON and includes your source files
3. Your project structure matches the `include` patterns in `tsconfig.json`

### Import Resolution Errors

If imports are not being resolved correctly:
1. Check your `tsconfig.json` paths configuration
2. Ensure all imported files have correct extensions
3. Verify that your module resolution strategy is set to "node" or "bundler"

### Performance Issues

For large projects:
1. Add commonly ignored directories to your `eslint.config.mjs`:

```js
export default [
  { ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'] },
  ...baseConfig,
];
```

2. Consider using ESLint's flat config caching features
3. Run ESLint only on staged files using lint-staged

### Conflicting Rules

If you're migrating from another ESLint config:
1. Remove old ESLint config files (.eslintrc.*, .eslintrc.json)
2. Uninstall conflicting ESLint plugins
3. Clear your editor's ESLint cache
4. Restart your IDE/editor

## License

This package is distributed under the ISC license. Full text is available in the [LICENSE](./LICENSE) file.

## Links

- [Full Rules Documentation](./doc/README_RULES.md)
- [Style Guide Overview](./doc/README_STYLEGUIDE.md)
- [Profile Configuration Guide](./doc/PROFILES.md)
- [GitHub Repository](https://github.com/ytvee-dev/eslint-config-react)
- [NPM Package](https://www.npmjs.com/package/@ytvee-dev/eslint-config-react)
