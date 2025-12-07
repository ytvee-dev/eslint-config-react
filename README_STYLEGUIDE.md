# Стайлгайд линтера

Документ описывает правила, включённые в пресет `@ytvee-dev/eslint-config-ytdev`, и то, какие договорённости он наследует из [Airbnb JavaScript Style Guide](https://leonidlebedev.github.io/javascript-airbnb).

## Базовые принципы

- **Рекомендации `@eslint/js` и type-checked `typescript-eslint`.** Конфиг использует официальные рекомендованные наборы, поэтому вы получаете проверки на безопасное использование переменных, предпочтение `const`, отсутствие неиспользуемых переменных и корректную работу с промисами и типами.
- **Явные точки с запятой и запрет новых синтаксических примитивов без поддержки среды.** Правило `semi` требует завершающие точки с запятой, а `no-restricted-syntax` блокирует использование `Symbol` и `BigInt` там, где это может быть небезопасно.
- **Управление импортами.** Сортировка импортов происходит через `eslint-plugin-simple-import-sort`, а `eslint-plugin-import` не позволяет указывать расширения и дублировать импорт одного и того же модуля.
- **Интеграция с Prettier.** Форматирование проверяется как ошибки ESLint с настройками из `prettier.js` (ширина 120 символов, одинарные кавычки, точка с запятой, запятая после последнего элемента, отступ 2 пробела).

## Дополнения для TypeScript

- `@typescript-eslint/explicit-function-return-type` заставляет объявлять возвращаемые типы.
- `@typescript-eslint/consistent-type-definitions` предпочитает `interface` для объектных типов.
- `@typescript-eslint/no-floating-promises` требует обрабатывать промисы.
- `@typescript-eslint/no-unused-vars` контролирует неиспользуемые переменные с разрешением имён, начинающихся с `_`.
- `@typescript-eslint/explicit-member-accessibility` и `@typescript-eslint/member-ordering` поддерживают предсказуемую структуру классов.

## Профили

- **Строгий профиль (`configs/strict.mjs`).** Дополнительно запрещает `any`, вводит соглашение об именовании в `camelCase`/`PascalCase` (с разрешёнными подчёркиваниями) и ограничивает один публичный тип/класс/enum на файл.
- **React-профиль (`configs/react.mjs`).** Добавляет правила для JSX (`react/jsx-filename-extension`, `react/self-closing-comp`, `react/jsx-no-duplicate-props`), хуков (`react-hooks/*`) и базовой доступности (`jsx-a11y/*`).

## Лицензия

Пакет распространяется по лицензии ISC. Полный текст доступен в файле [LICENSE](./LICENSE).
