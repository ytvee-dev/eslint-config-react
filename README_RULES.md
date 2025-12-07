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

Ниже — краткое описание каждой группы правил в стиле гида Airbnb. Для большинства пунктов приведены небольшие примеры «хорошо/плохо», чтобы было понятно, почему правило помогает ловить ошибки.

#### Корректность классов и конструкторов

- `constructor-super`, `no-this-before-super`, `no-class-assign` — защищают наследование: нельзя обращаться к `this` до вызова `super` и переопределять объявленный класс.
- `no-dupe-class-members` — запрещает дублировать методы, чтобы не потерять реализацию.
- `no-unused-private-class-members` — подчёркивает неиспользуемые приватные поля, чтобы не копить мёртвый код.
- `getter-return` — требует, чтобы геттеры всегда что-то возвращали.

```ts
// Плохо: обращение к this до super и два одинаковых метода
class Child extends Parent {
  constructor() {
    this.value = 1;
    super();
  }

  method() {}
  method() {}
}

// Хорошо
class Child extends Parent {
  #cache = 0;

  constructor() {
    super();
    this.value = 1;
  }

  get computed() {
    return this.value + this.#cache;
  }
}
```

#### Безопасность управления потоком

- `no-cond-assign`, `no-constant-binary-expression`, `no-constant-condition` — запрещают опечатки в условиях, оставляя только преднамеренные проверки.
- `no-unexpected-multiline` — предотвращает разрывы строк, меняющие смысл кода.
- `no-unreachable`, `no-unsafe-finally`, `for-direction`, `require-yield` — ловят недостижимый код, неверное направление циклов, опасные `finally` и пустые генераторы.

```js
// Плохо: присваивание в условии и цикл, который никогда не завершится
if (value = getDefault()) {
  doWork();
}

for (let i = 0; i < list.length; i--) {
  console.log(list[i]);
}

// Хорошо
if (value === getDefault()) {
  doWork();
}

for (let i = 0; i < list.length; i += 1) {
  console.log(list[i]);
}
```

#### Защита от ошибок синтаксиса и RegExp

Каждое правило закрывает отдельный класс ошибок в регулярках и синтаксисе:

- `no-control-regex`, `no-empty-character-class`, `no-misleading-character-class`, `no-regex-spaces` — защищают от некорректных классов символов и лишних пробелов.
- `no-invalid-regexp`, `no-useless-backreference` — предотвращают ошибки компиляции регулярки.
- `no-irregular-whitespace` — запрещает невидимые символы, которые ломают парсинг.
- `no-fallthrough` — требует явного завершения `switch`, чтобы не пропускать `break` по ошибке.

```js
// Плохо: пробел в классе, некорректная ссылка на группу и отсутствующий break
switch (status) {
  case 'pending':
    handlePending();
  case 'done':
    handleDone();
    break;
}

const pattern = /[0-9 ]+/;
const fallback = /(a)?b\1/;

// Хорошо: явный break и корректные регулярки без лишних символов
switch (status) {
  case 'pending':
    handlePending();
    break;
  case 'done':
    handleDone();
    break;
  default:
    handleUnknown();
}

const pattern = /[0-9]+/;
const fallback = /ab?/;
```

#### Чистый код без дубликатов

- `no-dupe-args`, `no-duplicate-case`, `no-dupe-keys`, `no-dupe-else-if` — не допускают дублирующих объявлений, которые усложняют чтение и ведут к багам.
- `no-empty`, `no-empty-pattern`, `no-empty-static-block` — требуют смыслового содержимого в блоках и деструктуризации.
- `no-extra-boolean-cast` — убирает бесполезные преобразования.

```js
// Плохо: два одинаковых case и пустой блок
switch (status) {
  case 'ok':
    handleOk();
    break;
  case 'ok':
    handleOkAgain();
    break;
  default:
}

// Хорошо
switch (status) {
  case 'ok':
    handleOk();
    break;
  case 'error':
    handleError();
    break;
  default:
    logUnknown(status);
}
```

#### Работа с переменными

- `no-delete-var`, `no-undef`, `no-shadow-restricted-names` — не дают удалять объявления и использовать необъявленные переменные или тени глобальных имён.
- `no-unused-labels`, `no-unused-vars` — напоминают удалять неиспользуемые сущности.
- `no-self-assign` — предотвращает бессмысленные присваивания самому себе.

```js
// Плохо
let result;
value = value; // no-self-assign
delete result; // no-delete-var

// Хорошо
const result = compute(value);
```

#### Безопасные числа и сравнения

Запрещены опасные паттерны: сравнение с `-0` (`no-compare-neg-zero`), некорректные проверки NaN (`use-isnan`), использование несуществующих типов в `typeof` (`valid-typeof`) и числа, теряющие точность (`no-loss-of-precision`).

```js
// Плохо
if (value === NaN) {
  // ...
}

// Хорошо
if (Number.isNaN(value)) {
  // ...
}
```

#### Корректность промисов и асинхронности

- `no-async-promise-executor` — запрещает `async` в конструкторе `Promise`, чтобы исключить неотловленные ошибки.
- `no-unsafe-optional-chaining`, `no-unsafe-negation` — не дают использовать опциональную цепочку и отрицание в местах, где можно получить `TypeError`.

```js
// Плохо
new Promise(async (resolve) => {
  const data = await load();
  resolve(data?.items.length);
});

// Хорошо
load().then((data) => {
  resolve(data?.items?.length ?? 0);
});
```

#### Чистые объявления

Базовые запреты на изменение неизменяемых сущностей (`no-const-assign`, `no-ex-assign`, `no-func-assign`, `no-global-assign`, `no-import-assign`), опасные конструкции (`no-new-native-nonconstructor`, `no-obj-calls`, `no-prototype-builtins`, `no-with`, `no-debugger`) и устаревший синтаксис (`no-octal`, `no-case-declarations`, `no-setter-return`, `no-redeclare`).

```js
// Плохо
const answer = 42;
answer = 43; // попытка изменить const

// Хорошо
let answer = 42;
answer = 43;
```

#### Регулярности работы с массивами и строками

- `no-sparse-arrays` — избегаем разреженных массивов с пропущенными элементами.
- `no-useless-catch`, `no-useless-escape` — не допускаем пустых блоков `catch` и лишних экранирований.
- `no-nonoctal-decimal-escape` — запрещает устаревшие восьмеричные escape-последовательности.

```js
// Плохо
const items = [1, , 3];
const message = "Line break: \8";

// Хорошо
const items = [1, 2, 3];
const message = 'Line break: \n';
```

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
