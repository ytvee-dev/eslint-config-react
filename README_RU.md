# @ytvee-dev/eslint-config-react

**Русская версия** | [English](./README.md)

Комплексная конфигурация ESLint для React и TypeScript проектов с интегрированной поддержкой Prettier.

## Возможности

- **Типобезопасный линтинг** с TypeScript ESLint
- **Интеграция Prettier** для единообразного форматирования кода
- **Поддержка React** с правилами для хуков и JSX
- **Проверки доступности** с jsx-a11y
- **Сортировка импортов** и их организация
- **Best practices** из Airbnb style guide
- **Без настройки** - работает из коробки

## Быстрый старт

### Установка

```bash
# npm
npm install -D @ytvee-dev/eslint-config-react

# yarn
yarn add -D @ytvee-dev/eslint-config-react

# pnpm
pnpm add -D @ytvee-dev/eslint-config-react
```

### Настройка

Создайте файл `eslint.config.mjs` в корне проекта:

**Для React-проектов:**

```js
import reactConfig from "@ytvee-dev/eslint-config-react/configs/react";

export default [...reactConfig];
```

**Для не-React проектов (TypeScript/JavaScript):**

```js
import baseConfig from "@ytvee-dev/eslint-config-react";

export default [...baseConfig];
```

**Для проектов со строгими правилами:**

```js
import strictConfig from "@ytvee-dev/eslint-config-react/configs/strict";

export default [...strictConfig];
```

### Настройка Prettier

Создайте файл `.prettierrc.js`:

```js
module.exports = require("@ytvee-dev/eslint-config-react/prettier");
```

Или `.prettierrc.json`:

```json
{
  "extends": "@ytvee-dev/eslint-config-react/prettier"
}
```

### Добавьте скрипты

Добавьте в ваш `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Доступные конфигурации

- **Base** (`@ytvee-dev/eslint-config-react`) - JavaScript/TypeScript с Prettier
- **React** (`@ytvee-dev/eslint-config-react/configs/react`) - Base + правила React
- **Strict** (`@ytvee-dev/eslint-config-react/configs/strict`) - React + строгие правила именования и запрет any

## Требования

- Node.js >= 18
- ESLint >= 9.0.0
- TypeScript >= 5.2.0 (для TypeScript проектов)

## Документация

📚 **Полная документация доступна в папке `/docs`:**

[**Открыть документацию**](https://github.com/ytvee-dev/eslint-config-react/tree/main/docs)

Включает:
- [Полный справочник правил](https://github.com/ytvee-dev/eslint-config-react/blob/main/docs/README_RULES_RU.md)
- [Обзор стайлгайда](https://github.com/ytvee-dev/eslint-config-react/blob/main/docs/README_STYLEGUIDE_RU.md)
- [Руководство по профилям](https://github.com/ytvee-dev/eslint-config-react/blob/main/docs/PROFILES_RU.md)
- Примеры конфигурации
- Решение проблем

## Лицензия

ISC © [Tyan Yevgeniy](https://github.com/ytvee-dev)

## Ссылки

- [NPM пакет](https://www.npmjs.com/package/@ytvee-dev/eslint-config-react)
- [GitHub репозиторий](https://github.com/ytvee-dev/eslint-config-react)
- [Полная документация](https://github.com/ytvee-dev/eslint-config-react/tree/main/docs)
- [Сообщить о проблеме](https://github.com/ytvee-dev/eslint-config-react/issues)
