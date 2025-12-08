# ESLint Config для React-проектов

Комплексная конфигурация ESLint, которая обеспечивает типобезопасную проверку кода, соглашения по импортам и бесшовную интеграцию с Prettier для React-проектов.

## Название пакета

`@ytvee-dev/eslint-config-react`

## Описание

Конфигурация объединяет базовые проверки JavaScript/TypeScript, строгие ограничения для качества кода и дополнительный профиль для React. Пакет ориентирован на командную разработку: минимальная настройка, предсказуемые ошибки линтера и единый стиль форматирования. Полный перечень правил с примерами приведён в [README_RULES_RU.md](./README_RULES_RU.md). Краткое описание профилей — в [README_STYLEGUIDE_RU.md](./README_STYLEGUIDE_RU.md).

### Что входит

- **Базовый профиль** (`eslint.config.mjs`): рекомендуемые проверки `@eslint/js` и `typescript-eslint` в режиме type-checked, общие правила для JavaScript и TypeScript, сортировка импортов и интеграция с Prettier.
- **Строгий профиль** (`configs/strict.mjs`): запрет `any`, соглашение об именовании и требование одного публичного типа/класса/enum на файл.
- **React-профиль** (`configs/react.mjs`): правила для JSX, хуков и базовые проверки доступности.
- **Конфигурация Prettier** (`prettier.js`): ширина строки 120, одинарные кавычки, точка с запятой, запятая после последнего элемента и отступ 2 пробела.

## Установка

### Требования

Перед установкой этой конфигурации ESLint убедитесь, что у вас есть:

- **Node.js**: версия 18 или выше (см. поле `engines` в package.json)
- **Менеджер пакетов**: npm (поставляется с Node.js) или Yarn

Проверить версию Node.js можно командой:

```bash
node --version
```

Если необходимо установить или обновить Node.js, посетите [nodejs.org](https://nodejs.org/).

### Шаг 1: Установка пакета

Установите конфигурацию как зависимость разработки. Все необходимые плагины и пресеты будут установлены автоматически:

```bash
# Yarn
yarn add -D @ytvee-dev/eslint-config-react

# npm
npm install -D @ytvee-dev/eslint-config-react
```

Эта единственная команда устанавливает:
- Ядро ESLint
- TypeScript ESLint парсер и плагин
- Prettier и интеграцию ESLint-Prettier
- Плагины для сортировки импортов
- React-плагины (опциональные, активируются только при использовании React-профиля)

### Шаг 2: Настройка Prettier

Создайте файл `.prettierrc` в корне проекта для настройки форматирования кода:

**Вариант A: формат JavaScript**

```js
// .prettierrc или .prettierrc.js
module.exports = require('@ytvee-dev/eslint-config-react/prettier');
```

**Вариант B: формат JSON**

```json
{
  "extends": "@ytvee-dev/eslint-config-react/prettier"
}
```

Эта конфигурация применяет следующие правила форматирования:
- Ширина строки: 120 символов
- Кавычки: одинарные
- Точки с запятой: всегда требуются
- Trailing commas: всегда в многострочных структурах
- Отступ: 2 пробела

### Шаг 3: Настройка ESLint

Создайте файл `eslint.config.mjs` в корне проекта. Выберите конфигурацию, соответствующую типу вашего проекта:

**Для базового JavaScript/TypeScript проекта:**

```js
// eslint.config.mjs
import baseConfig from '@ytvee-dev/eslint-config-react';

export default [...baseConfig];
```

**Для React-проекта:**

```js
// eslint.config.mjs
import reactConfig from '@ytvee-dev/eslint-config-react/configs/react';

export default [...reactConfig];
```

**Для проекта со строгими правилами:**

```js
// eslint.config.mjs
import strictConfig from '@ytvee-dev/eslint-config-react/configs/strict';

export default [...strictConfig];
```

Больше вариантов конфигурации и комбинаций профилей смотрите в [PROFILES_RU.md](./PROFILES_RU.md).

### Шаг 4: Настройка TypeScript

Эта конфигурация ESLint использует функцию `projectService` TypeScript для типоориентированного линтинга. Убедитесь, что у вас есть файл `tsconfig.json` в корне проекта.

**Минимальная конфигурация TypeScript:**

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

Примечание: Если ваш `tsconfig.json` находится не в корне проекта, или если у вас несколько конфигураций TypeScript, вам может потребоваться настроить `parserOptions` в вашем `eslint.config.mjs`.

### Шаг 5: Добавление NPM-скриптов

Добавьте скрипты линтинга в ваш `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.mjs,.ts,.tsx --report-unused-disable-directives",
    "lint:fix": "eslint . --ext .js,.mjs,.ts,.tsx --report-unused-disable-directives --fix"
  }
}
```

Теперь можно запускать команды линтинга:

```bash
# Проверка на ошибки линтинга
npm run lint
# или
yarn lint

# Автоматическое исправление ошибок линтинга
npm run lint:fix
# или
yarn lint:fix
```

### Шаг 6: Интеграция с IDE (необязательно, но рекомендуется)

#### Visual Studio Code

Установите расширение ESLint:

1. Откройте расширения VS Code (Ctrl+Shift+X или Cmd+Shift+X)
2. Найдите "ESLint" от Microsoft
3. Нажмите Install

Добавьте эти настройки в ваш `.vscode/settings.json`:

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

#### Другие IDE

- **WebStorm/IntelliJ IDEA**: поддержка ESLint встроена. Включите её в Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint
- **Sublime Text**: установите пакет SublimeLinter-eslint
- **Vim/Neovim**: используйте плагины типа ALE или coc-eslint

### Шаг 7: Git-хуки (необязательно)

Чтобы принудительно запускать линтинг перед коммитами, можно настроить git-хуки с помощью Husky:

```bash
# Установка Husky
npm install -D husky
# или
yarn add -D husky

# Инициализация Husky
npx husky init

# Добавление pre-commit хука
echo "npm run lint" > .husky/pre-commit
```

Это обеспечит проверку всего кода линтером перед коммитом в репозиторий.

## Зависимости

Все необходимые плагины и конфигурации установлены как обычные зависимости этого пакета. Дополнительная установка не требуется. Линтер, плагины для импортов, инструменты форматирования и React-дополнения автоматически включены в `@ytvee-dev/eslint-config-react`.

Включены следующие пакеты:
- `eslint` - ядро линтера ESLint
- `@eslint/js` - официальные правила ESLint для JavaScript
- `typescript-eslint` - интеграция TypeScript с ESLint
- `eslint-plugin-import` - валидация импортов/экспортов
- `eslint-plugin-simple-import-sort` - сортировка импортов
- `eslint-plugin-prettier` - интеграция Prettier
- `prettier` - форматировщик кода
- `eslint-config-prettier` - отключает конфликтующие правила ESLint
- `eslint-plugin-react` - правила для React
- `eslint-plugin-react-hooks` - правила для React Hooks
- `eslint-plugin-jsx-a11y` - правила доступности

Поле `peerDependencies` существует только для проверки совместимости версий. Менеджер пакетов автоматически установит правильные версии из зависимостей пакета.

## Babel или шимы не требуются

В отличие от `eslint-config-airbnb`, конфигурация не зависит от Babel или полифиллов. Линтер работает на стандартном парсере ESLint и `typescript-eslint`.

Шимы в рантайме также не требуются, потому что правила затрагивают только статический анализ кода, а не окружение исполнения.

## Сравнение с Airbnb

### Что включено из Airbnb

- Правила Best Practices (переменные, функции, объекты, массивы, строки)
- Стиль кода (точки с запятой, фигурные скобки, запятые, пробелы)
- Безопасность (no-eval, no-new-func, no-extend-native)
- Сравнения и операторы (eqeqeq, no-nested-ternary)

### Ключевые отличия

#### Модульная структура с отдельным React-профилем

Конфигурация собирается на `@eslint/js` и `typescript-eslint`, а React-правила подключаются только если добавить `configs/react.mjs` в свой `eslint.config.mjs`. Нужные плагины (`react`, `react-hooks`, `jsx-a11y`) установятся вместе с пакетом, но лишних правил в не-React проектах не будет.

#### Форматирование отдано Prettier

Вместо набора форматирующих правил из `eslint-config-airbnb` используется `eslint-plugin-prettier/recommended` и общий пресет `prettier.js`. Это избавляет от конфликтов стиля и делает вывод одинаковым для JS/TS и JSX/TSX-файлов.

#### Другой подход к сортировке импортов

Вместо `import/order` из Airbnb применён `eslint-plugin-simple-import-sort` с явными группами внешних, внутренних и относительных модулей. Поддержка алиасов `@/` и автоматическое исправление.

#### Ставка на типобезопасность и Best Practices из Airbnb

Базовый набор включает `pluginJs.configs.recommended`, `typescript-eslint` с типовыми проверками и большой набор Best Practices правил из Airbnb Style Guide: управление переменными (no-var, prefer-const), функции (arrow-body-style, prefer-arrow-callback), объекты и массивы (object-shorthand, prefer-destructuring), строки (prefer-template), сравнения (eqeqeq, no-nested-ternary), безопасность (no-eval, no-new-func, no-extend-native) и стиль кода (semi, brace-style, comma-dangle).

#### Автофикс для большинства правил

Поддержка автоматического исправления для форматирования, сортировки импортов, замены var на const/let, упрощения стрелочных функций и многих других правил Airbnb.

## Настройка среды разработки

Если вы хотите внести вклад в эту конфигурацию ESLint или модифицировать её:

1. Клонируйте репозиторий
2. Установите Node.js 18 или выше
3. Установите зависимости:

```bash
# Yarn
yarn install

# npm
npm install
```

4. Внесите изменения в файлы конфигурации
5. Протестируйте изменения в тестовом проекте
6. Запустите линтинг на этом репозитории:

```bash
npm run lint
# или
yarn lint
```

Проект включает готовую конфигурацию Husky для git-хуков. Чтобы временно отключить хуки при коммитах, используйте:

```bash
HUSKY=0 git commit -m "сообщение"
```

## Решение проблем

### Ошибки TypeScript

Если вы видите ошибки типа "Parsing error: Cannot find tsconfig.json", убедитесь что:
1. У вас есть файл `tsconfig.json` в корне проекта
2. Файл является валидным JSON и включает ваши исходные файлы
3. Структура проекта соответствует паттернам `include` в `tsconfig.json`

### Ошибки разрешения импортов

Если импорты разрешаются неправильно:
1. Проверьте конфигурацию paths в вашем `tsconfig.json`
2. Убедитесь, что все импортируемые файлы имеют правильные расширения
3. Проверьте, что стратегия разрешения модулей установлена в "node" или "bundler"

### Проблемы с производительностью

Для больших проектов:
1. Добавьте часто игнорируемые директории в ваш `eslint.config.mjs`:

```js
export default [
  { ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'] },
  ...baseConfig,
];
```

2. Рассмотрите использование возможностей кэширования flat config ESLint
3. Запускайте ESLint только на staged-файлах используя lint-staged

### Конфликтующие правила

Если вы мигрируете с другой конфигурации ESLint:
1. Удалите старые файлы конфигурации ESLint (.eslintrc.*, .eslintrc.json)
2. Удалите конфликтующие плагины ESLint
3. Очистите кэш ESLint вашего редактора
4. Перезапустите IDE/редактор

## Лицензия

Пакет распространяется по лицензии ISC. Полный текст доступен в файле [LICENSE](./LICENSE).

## Ссылки

- [Полная документация по правилам](./doc/README_RULES_RU.md)
- [Обзор стайлгайда](./doc/README_STYLEGUIDE_RU.md)
- [Руководство по конфигурации профилей](./doc/PROFILES_RU.md)
- [GitHub репозиторий](https://github.com/ytvee-dev/eslint-config-react)
- [NPM пакет](https://www.npmjs.com/package/@ytvee-dev/eslint-config-react)

