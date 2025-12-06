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

## Чем отличается от Airbnb и что не включено

- **Базовый профиль без React-зависимостей.** Конфигурация собирается на `@eslint/js` и `typescript-eslint` и не тянет плагины `react`/`jsx-a11y` по умолчанию, чтобы линтер работал одинаково в Node/SSR и чистых TypeScript-проектах. Для React есть отдельный профиль `configs/react.mjs` с минимально необходимыми правилами JSX и хуков, подключаемый при необходимости.【F:configs/base.mjs†L1-L30】【F:configs/react.mjs†L1-L4】【F:configs/rules/react.rule.mjs†L6-L38】

- **Форматирование отдано Prettier, а не правилам Airbnb.** Вместо набора форматирующих правил из `eslint-config-airbnb` используется `eslint-plugin-prettier/recommended` и общий пресет `prettier.js` (ширина строки 120, одинарные кавычки, обязательные точки с запятой). Это избавляет от конфликтов стиля и делает вывод одинаковым для JS/TS и JSX/TSX-файлов.【F:configs/base.mjs†L1-L31】【F:prettier.js†L1-L7】

- **Другой подход к сортировке импортов.** Вместо `import/order` из Airbnb применён `eslint-plugin-simple-import-sort` с явными группами внешних, внутренних и относительных модулей. Такой вариант проще автоматизировать и уменьшает количество ручных правок в больших рефакторингах.【F:configs/base.mjs†L7-L31】【F:configs/rules/import-sort.rule.mjs†L1-L22】

- **Ставка на типобезопасность, а не на весь стек JS-правил Airbnb.** Базовый набор включает `pluginJs.configs.recommended` и `typescript-eslint` с типовыми проверками, но не подключает детализированные JS-ограничения Airbnb (например, строгую деструктуризацию или порядок методов в классах), чтобы не усложнять проекты с TypeScript и оставить пространство для дополнительных правил в профиле `configs/strict.mjs`.【F:configs/base.mjs†L13-L31】【F:configs/strict.mjs†L1-L17】

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
