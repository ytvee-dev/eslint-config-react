# Стайлгайд линтера

Документ суммирует профиль `@ytvee-dev/eslint-config-ytdev` и поясняет, какие правила вы получите из коробки. Полный список с деталями и примерами — в [README_RULES.md](./README_RULES.md).

## Базовые принципы

- **Полный набор `@eslint/js` recommended.** Все встроенные проверки базового профиля ESLint активны: корректность классов, защита от дублирующих деклараций, безопасная работа с промисами и числовыми операциями.
- **TypeScript в режиме type-checked.** Используется `typescript-eslint` с набором `recommendedTypeChecked`: защита от небезопасных операций (`no-unsafe-*`), отложенных промисов (`no-floating-promises`, `require-await`), ошибочных конструкций типов и устаревшего синтаксиса.
- **Явное форматирование.** `eslint-plugin-prettier/recommended` применяет настройки из `prettier.js` (ширина строки 120, одинарные кавычки, точка с запятой, отступ 2 пробела, trailing comma) и делает нарушения ошибками линтера.
- **Управление импортами.** `eslint-plugin-import` запрещает дубли и расширения в путях, `eslint-plugin-simple-import-sort` сортирует импорты группами внешние → алиасы `@` → side-effect → относительные.
- **Безопасные новые примитивы.** `no-restricted-syntax` блокирует `Symbol` и `BigInt` без нативной поддержки, чтобы конфиг оставался совместимым с целевой средой.

## Дополнения для TypeScript

- Объявляйте возвращаемый тип явно (`@typescript-eslint/explicit-function-return-type`).
- Предпочитайте `interface` для объектных форм (`@typescript-eslint/consistent-type-definitions`).
- Обрабатывайте каждый промис (`@typescript-eslint/no-floating-promises`).
- Оставляйте неиспользуемые аргументы только с префиксом `_` (`@typescript-eslint/no-unused-vars`).
- Всегда указывайте модификаторы доступа и придерживайтесь фиксированного порядка членов класса (`@typescript-eslint/explicit-member-accessibility`, `@typescript-eslint/member-ordering`).

## Профили

- **Базовый (`eslint.config.mjs`).** Все перечисленные выше правила, включая полные рекомендованные наборы JS/TS, кастомные правила импортов и форматирования.
- **Строгий (`configs/strict.mjs`).** Поверх базы: запрет `any`, соглашение об именовании в `camelCase`/`PascalCase` и требование одного публичного типа/класса/enum на файл.
- **React (`configs/react.mjs`).** Поверх базы: правила JSX (`react/jsx-filename-extension`, `react/self-closing-comp`, `react/jsx-no-duplicate-props`, `react/jsx-key`, `react/jsx-boolean-value`), хуков (`react-hooks/rules-of-hooks`, `react-hooks/exhaustive-deps`) и доступности (`jsx-a11y/*`).

## Лицензия

Пакет распространяется по лицензии ISC. Полный текст доступен в файле [LICENSE](./LICENSE).
