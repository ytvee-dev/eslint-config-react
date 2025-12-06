# ESLint Config for React Projects

Набор правил ESLint, который помогает быстро подключить единый стиль кода в React-проектах: типобезопасные проверки, договорённости по импорту и готовая интеграция с Prettier.

## Название

`@ytvee-dev/eslint-config-ytdev`

## Описание

Конфигурация объединяет базовые проверки JavaScript/TypeScript, строгие ограничения для качества кода и дополнительный профиль для React. Пакет ориентирован на командную разработку: минимальная настройка, предсказуемые ошибки линтера и единый стиль форматирования.

## Использование

1. Установите пакет и его peer-зависимости любым менеджером пакетов:

```bash
# Yarn
yarn add @ytvee-dev/eslint-config-ytdev @eslint/js eslint eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-simple-import-sort globals prettier typescript-eslint -D

# npm
npm install @ytvee-dev/eslint-config-ytdev @eslint/js eslint eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-simple-import-sort globals prettier typescript-eslint --save-dev

# Для проектов на React добавьте плагины Airbnb-профиля
# Yarn
yarn add eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y -D

# npm
npm install eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y --save-dev
```

2. Подключите форматирование Prettier через файл `.prettierrc`:

```js
module.exports = require('@ytvee-dev/eslint-config-ytdev/prettier');
```

или в JSON-формате:

```json
{
  "extends": "@ytvee-dev/eslint-config-ytdev/prettier"
}
```

3. Настройте `eslint.config.mjs` под ваш проект:

```js
import baseConfig from '@ytvee-dev/eslint-config-ytdev';
// import strictConfig from '@ytvee-dev/eslint-config-ytdev/configs/strict';
// import reactConfig from '@ytvee-dev/eslint-config-ytdev/configs/react';

export default [
  ...baseConfig,
  // ...strictConfig,
  // ...reactConfig,
  // ваши дополнительные правила
];
```

4. Запускайте проверки:

```bash
yarn lint
yarn lint:fix
```

## Настройка среды

1. Подготовьте Node.js и выбранный менеджер пакетов (`yarn` или `npm`).
2. Установите зависимости репозитория:

```bash
# Yarn
yarn install

# npm
npm install
```

3. При желании подключите git-хуки: в проекте есть готовая конфигурация husky, отключить временно можно через `HUSKY=0` при коммите.

После этого линтер готов к работе в вашем React-приложении.
