# ESLint Config for React Projects

Набор правил ESLint, который помогает быстро подключить единый стиль кода в React-проектах: типобезопасные проверки, договорённости по импорту и готовая интеграция с Prettier.

## Название

`@ytvee-dev/eslint-config-ytdev`

## Описание

Конфигурация объединяет базовые проверки JavaScript/TypeScript, строгие ограничения для качества кода и дополнительный профиль для React. Пакет ориентирован на командную разработку: минимальная настройка, предсказуемые ошибки линтера и единый стиль форматирования. Полный перечень правил с примерами приведён в [README_RULES.md](./README_RULES.md), краткое описание профилей — в [README_STYLEGUIDE.md](./README_STYLEGUIDE.md).

### Что входит

- Базовый профиль (`eslint.config.mjs`): рекомендуемые проверки `@eslint/js` и `typescript-eslint` в режиме type-checked, общие правила для JavaScript и TypeScript, сортировка импортов и интеграция с Prettier.
- Строгий профиль (`configs/strict.mjs`): запрет `any`, соглашение об именовании и требование одного публичного типа/класса/enum на файл.
- React-профиль (`configs/react.mjs`): правила для JSX, хуков и базовые проверки доступности.
- Конфигурация Prettier (`prettier.js`): ширина строки 120, одинарные кавычки, точка с запятой, запятая после последнего элемента и отступ 2 пробела.

## Использование

1. Установите конфиг и peer-зависимости (React-плагины подключайте только если нужен профиль `configs/react`):

```bash
# Yarn (базовый профиль)
yarn add -D @ytvee-dev/eslint-config-ytdev eslint @eslint/js typescript typescript-eslint eslint-plugin-import eslint-plugin-simple-import-sort eslint-plugin-prettier eslint-config-prettier prettier globals

# Yarn (React-дополнения)
yarn add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y

# npm (базовый профиль)
npm install -D @ytvee-dev/eslint-config-ytdev eslint @eslint/js typescript typescript-eslint eslint-plugin-import eslint-plugin-simple-import-sort eslint-plugin-prettier eslint-config-prettier prettier globals

# npm (React-дополнения)
npm install -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
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

## Какие зависимости нужны

Конфиг использует peer-зависимости, поэтому их нужно ставить в проекте вручную, чтобы версия линтера совпадала с вашей сборкой:

- `eslint`, `@eslint/js`, `typescript`, `typescript-eslint`, `globals`;
- плагины для импорта и форматирования: `eslint-plugin-import`, `eslint-plugin-simple-import-sort`, `eslint-plugin-prettier`, `eslint-config-prettier`, `prettier`;
- React-плагины подключайте только для JSX-профиля: `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`.

Никаких дополнительных пресетов Babel или рантайм-шимов не требуется: правила работают на уровне статического анализа кода, поэтому достаточно установить зависимости из списка выше. Для работы TypeScript-проверок конфигурация использует `projectService`, поэтому линтеру понадобится `tsconfig.json` в корне проекта или путь к нему в `parserOptions`. Требуется Node.js версии 18 или новее (см. поле `engines` пакета).

## Нужны ли Babel или shims?

В отличие от `eslint-config-airbnb`, конфигурация не зависит от Babel или полифиллов: линтер работает на стандартном парсере ESLint и `typescript-eslint`.
Шимы в рантайме тоже не требуются — правила затрагивают только статический анализ кода, а не окружение исполнения.

## Чем отличается от Airbnb и что не включено

- **Базовый профиль без React-зависимостей.** Конфигурация собирается на `@eslint/js` и `typescript-eslint` и не тянет плагины `react`/`jsx-a11y` по умолчанию, чтобы линтер работал одинаково в Node/SSR и чистых TypeScript-проектах. Для React есть отдельный профиль `configs/react.mjs` с минимально необходимыми правилами JSX, хуков и доступности.
- **Форматирование отдано Prettier, а не правилам Airbnb.** Вместо набора форматирующих правил из `eslint-config-airbnb` используется `eslint-plugin-prettier/recommended` и общий пресет `prettier.js`. Это избавляет от конфликтов стиля и делает вывод одинаковым для JS/TS и JSX/TSX-файлов.
- **Другой подход к сортировке импортов.** Вместо `import/order` из Airbnb применён `eslint-plugin-simple-import-sort` с явными группами внешних, внутренних и относительных модулей.
- **Ставка на типобезопасность, а не на весь стек JS-правил Airbnb.** Базовый набор включает `pluginJs.configs.recommended` и `typescript-eslint` с типовыми проверками, но не подключает детализированные JS-ограничения Airbnb (например, строгую деструктуризацию или порядок методов в классах), чтобы оставить пространство для дополнительных правил в профиле `configs/strict.mjs`.

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
