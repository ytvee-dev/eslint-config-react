# Правила линтера, используемые в проекте

Документ описывает все правила, которые реально включены в `@ytvee-dev/eslint-config-react`, в стилистике [Airbnb JavaScript Style Guide](https://leonidlebedev.github.io/javascript-airbnb). Ниже перечислены профили, ограничения и игнорируемые файлы.

## Игнорируемые пути

Линтер не проверяет вспомогательные артефакты и собранные файлы:

- `node_modules`, `dist`, `.yarn`, `.git*`, `examples`.
- Конфигурационные файлы линтера и форматтера: `.eslintrc*`, `.prettier*`.
- Служебные типы сборки: `tsup*`, `Dockerfile`, любые `*.md`, `*.json`, `*.yml`.

## Базовый профиль (JavaScript + TypeScript)

Профиль `eslint.config.mjs` собирает рекомендации `@eslint/js`, набор `typescript-eslint` в режиме type-checked, дополнительные правила для импортов и форматирования. Все правила из этого раздела применяются к `.js/.mjs/.ts/.tsx` файлам, если не указано иное.

### Общие правила `@eslint/js` (config `recommended`)

- Корректность классов и конструкторов: `constructor-super`, `no-class-assign`, `no-dupe-class-members`, `no-this-before-super`, `no-unused-private-class-members`, `getter-return`.
- Безопасность управления потоком: `no-cond-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `require-yield`, `for-direction`.
- Защита от ошибок синтаксиса и RegExp: `no-control-regex`, `no-empty-character-class`, `no-fallthrough`, `no-invalid-regexp`, `no-misleading-character-class`, `no-regex-spaces`, `no-useless-backreference`, `no-irregular-whitespace`.
- Чистый код без дубликатов: `no-dupe-args`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-pattern`, `no-empty-static-block`, `no-extra-boolean-cast`.
- Работа с переменными: `no-delete-var`, `no-shadow-restricted-names`, `no-undef`, `no-unused-labels`, `no-unused-vars` (перекрывается TypeScript-версией ниже), `no-self-assign`.
- Безопасные числа и сравнения: `no-compare-neg-zero`, `no-loss-of-precision`, `use-isnan`, `valid-typeof`.
- Корректность промисов и асинхронности: `no-async-promise-executor`, `no-unsafe-optional-chaining`, `no-unsafe-negation`.
- Чистые объявления: `no-case-declarations`, `no-const-assign`, `no-ex-assign`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-new-native-nonconstructor`, `no-obj-calls`, `no-octal`, `no-prototype-builtins`, `no-redeclare`, `no-setter-return`, `no-with`, `no-debugger`.
- Регулярности работы с массивами и строками: `no-sparse-arrays`, `no-useless-catch`, `no-useless-escape`, `no-nonoctal-decimal-escape`.

### Явные точки с запятой (`semi`)

Все инструкции завершаются точкой с запятой.

```js
// Хорошо
const sum = a + b;

// Плохо
const sum = a + b
```

### Запрет `Symbol` и `BigInt` без поддержки среды (`no-restricted-syntax`)

Использование `Symbol` и `BigInt` блокируется, если среда может их не поддерживать.

### Импорты

- **Не дублируйте импорты** (`no-duplicate-imports`).
- **Не указывайте расширения** (`import/extensions`): для `js/jsx/ts/tsx` расширение опускается.
- **Сортировка импортов** (`simple-import-sort/imports`): группы — внешние зависимости → namespace из `@*` → абсолютные `@/...` алиасы → side-effect импорты → восходящие относительные → одноуровневые относительные.

```ts
// Плохо
import './styles.css';
import { Button } from '@/components/Button';
import express from 'express';

// Хорошо
import express from 'express';
import { Button } from '@/components/Button';
import './styles.css';
```

### Форматирование (Prettier + `eslint-plugin-prettier/recommended`)

- Однострочные кавычки, точка с запятой, ширина строки 120, запятая после последнего элемента, отступ 2 пробела. Нарушения подсвечиваются как ошибки ESLint.

### Правила `typescript-eslint` (config `recommendedTypeChecked`)

Ниже перечислены все правила набора type-checked с учётом переопределений пресета:

- Безопасные async-операции: `@typescript-eslint/await-thenable`, `@typescript-eslint/no-floating-promises` (дублирует кастомное правило), `@typescript-eslint/no-for-in-array`, `@typescript-eslint/no-implied-eval`, `@typescript-eslint/no-misused-promises`, `@typescript-eslint/require-await`, `@typescript-eslint/unbound-method`.
- Строгие типы и отсутствие небезопасных конструкций: `@typescript-eslint/no-unsafe-argument`, `@typescript-eslint/no-unsafe-assignment`, `@typescript-eslint/no-unsafe-call`, `@typescript-eslint/no-unsafe-declaration-merging`, `@typescript-eslint/no-unsafe-enum-comparison`, `@typescript-eslint/no-unsafe-function-type`, `@typescript-eslint/no-unsafe-member-access`, `@typescript-eslint/no-unsafe-return`, `@typescript-eslint/no-unsafe-unary-minus`, `@typescript-eslint/no-base-to-string`.
- Чистота типов: `@typescript-eslint/no-duplicate-enum-values`, `@typescript-eslint/no-duplicate-type-constituents`, `@typescript-eslint/no-empty-object-type`, `@typescript-eslint/no-non-null-asserted-optional-chain`, `@typescript-eslint/no-extra-non-null-assertion`, `@typescript-eslint/no-redundant-type-constituents`, `@typescript-eslint/no-unnecessary-type-assertion`, `@typescript-eslint/no-unnecessary-type-constraint`, `@typescript-eslint/prefer-as-const`.
- Ограничения по синтаксису: `@typescript-eslint/no-namespace`, `@typescript-eslint/triple-slash-reference`, `@typescript-eslint/prefer-namespace-keyword`.
- Контроль генераторов и промисов: `@typescript-eslint/prefer-promise-reject-errors` (заменяет базовое `prefer-promise-reject-errors`).
- Документация и комментарии: `@typescript-eslint/ban-ts-comment`.
- Запрет устаревших конструкций: `@typescript-eslint/no-array-constructor`, `@typescript-eslint/no-array-delete`, `@typescript-eslint/no-misused-new`, `@typescript-eslint/no-require-imports`.
- Исключение опасных преобразований: `@typescript-eslint/no-unsafe-enum-comparison`, `@typescript-eslint/restrict-plus-operands`, `@typescript-eslint/restrict-template-expressions`, `@typescript-eslint/only-throw-error`, `@typescript-eslint/no-wrapper-object-types`.
- Работа с переменными и выражениями: `@typescript-eslint/no-unused-vars` (перекрывается кастомной конфигурацией ниже), `@typescript-eslint/no-this-alias`, `@typescript-eslint/no-unused-expressions`.
- **Отключённое в базовом профиле правило:** `@typescript-eslint/no-explicit-any` (снимается в строгом профиле).

### Кастомные TS-усиления поверх рекомендованного набора

- Явный тип возвращаемого значения (`@typescript-eslint/explicit-function-return-type`).
- Предпочтение `interface` для объектных типов (`@typescript-eslint/consistent-type-definitions` со значением `interface`).
- Обязательная обработка промисов (`@typescript-eslint/no-floating-promises`).
- Настроенный контроль неиспользуемых сущностей (`@typescript-eslint/no-unused-vars`): игнорируются только имена, начинающиеся с `_`, учитываются rest-поля.
- Явные модификаторы доступа (`@typescript-eslint/explicit-member-accessibility`, конструкторы исключены из требования).
- Фиксированный порядок элементов класса (`@typescript-eslint/member-ordering`): сигнатуры → статические поля → поля экземпляра → конструкторы → методы.
- В базовом профиле `@typescript-eslint/no-explicit-any` отключён, чтобы не мешать миграциям к строгим типам.

## React-профиль (`configs/react.mjs`)

Активируется для файлов `.jsx` и `.tsx` и добавляет плагины `react`, `react-hooks`, `jsx-a11y`:

- Расширения файлов с JSX (`react/jsx-filename-extension`): только `.jsx`/`.tsx`.
- Булевы пропсы без значения (`react/jsx-boolean-value`).
- Самозакрывающиеся теги без детей (`react/self-closing-comp`).
- Стабильные ключи в списках (`react/jsx-key` с проверкой фрагментов).
- Запрет дублирующих пропсов (`react/jsx-no-duplicate-props`, регистр не различает).
- Корректное использование хуков (`react-hooks/rules-of-hooks`).
- Полные зависимости эффектов (`react-hooks/exhaustive-deps`, предупреждение).
- Базовая доступность: `jsx-a11y/alt-text`, `jsx-a11y/anchor-is-valid`, `jsx-a11y/click-events-have-key-events`, `jsx-a11y/no-autofocus` (разрешён для нативных компонентов только при необходимости), `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-static-element-interactions`.

## Строгий профиль (`configs/strict.mjs`)

Дополнительно к базовому профилю:

- Запрет `any` (`@typescript-eslint/no-explicit-any`).
- Соглашение об именовании (`@typescript-eslint/naming-convention`): переменные только `camelCase` или `PascalCase`, подчёркивания допустимы спереди/сзади.
- Один публичный тип/класс/enum на файл: `max-classes-per-file` + спец. `no-restricted-syntax`, запрещающий несколько деклараций подряд.

## Как применять профили

- **Базовый** (`eslint.config.mjs`): все правила из разделов «Базовый профиль» и «Кастомные TS-усиления».
- **Строгий** (`configs/strict.mjs`): база + запрет `any` + соглашение об именовании + одно экспортируемое объявление типа/класса/enum на файл.
- **React** (`configs/react.mjs`): база + React/JSX/a11y правила.
