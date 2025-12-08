# ESLint Config for React Projects

Набор правил ESLint, который помогает быстро подключить единый стиль кода в React-проектах: типобезопасные проверки, договорённости по импорту и готовая интеграция с Prettier.

## Название

`@ytvee-dev/eslint-config-react`

## Описание

Конфигурация объединяет базовые проверки JavaScript/TypeScript, строгие ограничения для качества кода и дополнительный профиль для React. Пакет ориентирован на командную разработку: минимальная настройка, предсказуемые ошибки линтера и единый стиль форматирования. Полный перечень правил с примерами приведён в [README_RULES.md](./README_RULES.md), краткое описание профилей — в [README_STYLEGUIDE.md](./README_STYLEGUIDE.md).

### Что входит

- Базовый профиль (`eslint.config.mjs`): рекомендуемые проверки `@eslint/js` и `typescript-eslint` в режиме type-checked, общие правила для JavaScript и TypeScript, сортировка импортов и интеграция с Prettier.
- Строгий профиль (`configs/strict.mjs`): запрет `any`, соглашение об именовании и требование одного публичного типа/класса/enum на файл.
- React-профиль (`configs/react.mjs`): правила для JSX, хуков и базовые проверки доступности.
- Конфигурация Prettier (`prettier.js`): ширина строки 120, одинарные кавычки, точка с запятой, запятая после последнего элемента и отступ 2 пробела.

## Использование

1. Установите конфиг одной командой — все плагины и пресеты подтянутся автоматически (включая React-профиль):

```bash
# Yarn
yarn add -D @ytvee-dev/eslint-config-react

# npm
npm install -D @ytvee-dev/eslint-config-react
```

2. Подключите форматирование Prettier через файл `.prettierrc`:

```js
module.exports = require('@ytvee-dev/eslint-config-react/prettier');
```

или в JSON-формате:

```json
{
  "extends": "@ytvee-dev/eslint-config-react/prettier"
}
```

3. Настройте `eslint.config.mjs` под ваш проект:

```js
import baseConfig from '@ytvee-dev/eslint-config-react';

export default [...baseConfig];
```

4. Запускайте проверки:

```bash
yarn lint
yarn lint:fix
```

## Какие зависимости нужны

Все нужные плагины и конфигурации идут как обычные зависимости пакета, поэтому дополнительная установка не требуется: линтер, плагины для импортов/форматирования и React-добавки подтянутся вместе с `@ytvee-dev/eslint-config-react`. В `peerDependencies` они оставлены только для контроля совместимых версий — менеджер пакетов сам поставит конкретные версии из набора пакета.

Никаких дополнительных пресетов Babel или рантайм-шимов не требуется: правила работают на уровне статического анализа кода. Для работы TypeScript-проверок конфигурация использует `projectService`, поэтому линтеру понадобится `tsconfig.json` в корне проекта или путь к нему в `parserOptions`. Требуется Node.js версии 18 или новее (см. поле `engines` пакета).

## Нужны ли Babel или shims?

В отличие от `eslint-config-airbnb`, конфигурация не зависит от Babel или полифиллов: линтер работает на стандартном парсере ESLint и `typescript-eslint`.
Шимы в рантайме тоже не требуются — правила затрагивают только статический анализ кода, а не окружение исполнения.

## Чем отличается от Airbnb и что не включено

- **Модульная структура с отдельным React-профилем.** Конфигурация собирается на `@eslint/js` и `typescript-eslint`, а React-правила подключаются только если добавить `configs/react.mjs` в свой `eslint.config.mjs`. Нужные плагины (`react`, `react-hooks`, `jsx-a11y`) установятся вместе с пакетом, но лишних правил в не-React проектах не будет.
- **Форматирование отдано Prettier, а не правилам Airbnb.** Вместо набора форматирующих правил из `eslint-config-airbnb` используется `eslint-plugin-prettier/recommended` и общий пресет `prettier.js`. Это избавляет от конфликтов стиля и делает вывод одинаковым для JS/TS и JSX/TSX-файлов.
- **Другой подход к сортировке импортов.** Вместо `import/order` из Airbnb применён `eslint-plugin-simple-import-sort` с явными группами внешних, внутренних и относительных модулей. Поддержка алиасов `@/` и автоматическое исправление.
- **Ставка на типобезопасность и Best Practices из Airbnb.** Базовый набор включает `pluginJs.configs.recommended`, `typescript-eslint` с типовыми проверками и большой набор Best Practices правил из Airbnb Style Guide: управление переменными (no-var, prefer-const), функции (arrow-body-style, prefer-arrow-callback), объекты и массивы (object-shorthand, prefer-destructuring), строки (prefer-template), сравнения (eqeqeq, no-nested-ternary), безопасность (no-eval, no-new-func, no-extend-native) и стиль кода (semi, brace-style, comma-dangle).
- **Автофикс для большинства правил.** Поддержка автоматического исправления для форматирования, сортировки импортов, замены var на const/let, упрощения стрелочных функций и многих других правил Airbnb.

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

## Публикация пакета

Если нужно выпустить новую версию в npm:

1. Авторизуйтесь под организацией `@ytvee-dev` (`npm login --scope=@ytvee-dev`). Без активного токена реестр вернёт ошибку `scope not found` или `access token expired`.
2. Обновите версию пакета (`npm version patch|minor|major`).
3. Опубликуйте сборку: `npm publish --access public`.

Поле `repository` в `package.json` уже приведено к формату объекта (`type` + `url`), поэтому npm больше не будет исправлять его при публикации.
