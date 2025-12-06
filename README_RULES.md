# Правила линтера, используемые в проекте

Документ собирает правила из [Airbnb JavaScript Style Guide](https://leonidlebedev.github.io/javascript-airbnb), которые включены в конфигурацию `@ytvee-dev/eslint-config-ytdev`, а также дополнительные договорённости, отсутствующие в оригинальном гайде. Для каждого правила приведены краткое описание и примеры корректного и некорректного кода.

## Правила из Airbnb, которые применяются

### Всегда ставьте точку с запятой (`semi`)

Точки с запятой обязательны в конце инструкций. Это соответствует рекомендациям Airbnb и помогает избежать ошибок автоматической вставки точек с запятой.

```js
// Хорошо
const sum = a + b;
console.log(sum);

// Плохо
const sum = a + b
console.log(sum)
```

### Не используйте `Symbol` и `BigInt` без нативной поддержки (`no-restricted-syntax`)

Создание или обращение к `Symbol` и `BigInt` запрещено, если среда не гарантирует их поддержку. Правило заимствовано из раздела Types 1.1 Airbnb.

```js
// Хорошо: используйте строковые ключи или числовые идентификаторы
const id = 'order-id';
const store = { [id]: 42 };

// Плохо: полагается на нативный Symbol
const id = Symbol('order-id');
```

### Не дублируйте импорты (`no-duplicate-imports`)

Один модуль должен импортироваться единожды. Повторные импорты затрудняют чтение и могут приводить к ошибкам.

```js
// Хорошо
import { useState, useEffect } from 'react';

// Плохо
import { useState } from 'react';
import { useEffect } from 'react';
```

### Не указывайте расширения в путях импорта (`import/extensions`)

При импорте модулей расширения (`.js`, `.jsx`, `.ts`, `.tsx`) пропускаются. Это упрощает рефакторинг и соответствует практикам Airbnb.

```js
// Хорошо
import Button from './Button';

// Плохо
import Button from './Button.tsx';
```

### React: расширения файлов с JSX (`react/jsx-filename-extension`)

JSX допускается только в файлах с расширением `.jsx` или `.tsx`. Это облегчает поиск компонентов и работу туллинга.

```tsx
// Хорошо (tsx)
const App: React.FC = () => <main>Hello</main>;
export default App;

// Плохо (js)
const App = () => <main>Hello</main>;
export default App;
```

### React: булевы пропсы без явного значения (`react/jsx-boolean-value`)

Булевы пропсы передаются без значения, чтобы JSX оставался лаконичным.

```tsx
// Хорошо
<Button primary />

// Плохо
<Button primary={true} />
```

### React: самозакрывающиеся теги без содержимого (`react/self-closing-comp`)

Элементы без дочерних узлов пишутся в самозакрывающемся виде.

```tsx
// Хорошо
<Image src="/logo.svg" alt="Logo" />

// Плохо
<Image src="/logo.svg" alt="Logo"></Image>
```

### React: обязательный `key` в списках (`react/jsx-key`)

Каждый элемент списка должен иметь стабильный ключ, включая фрагменты-шорткаты.

```tsx
// Хорошо
{items.map((item) => (
  <Fragment key={item.id}>{item.title}</Fragment>
))}

// Плохо
{items.map((item) => (
  <Fragment>{item.title}</Fragment>
))}
```

### React: недопустимо дублировать пропсы (`react/jsx-no-duplicate-props`)

Повторение одного и того же пропса запрещено; регистр учитывается.

```tsx
// Хорошо
<Input placeholder="Email" autoComplete="email" />

// Плохо
<Input placeholder="Email" placeholder="Введите почту" />
```

### React Hooks: корректное использование (`react-hooks/rules-of-hooks`)

Хуки вызываются только на верхнем уровне компонентов и пользовательских хуков.

```tsx
// Хорошо
function useValue() {
  const [value, setValue] = useState('');
  return { value, setValue };
}

// Плохо
function useValue(condition) {
  if (condition) {
    useState(''); // вызов внутри условия
  }
}
```

### React Hooks: зависимости эффектов (`react-hooks/exhaustive-deps`)

Линтер предупреждает, если список зависимостей `useEffect` неполный.

```tsx
// Хорошо
useEffect(() => {
  fetchData(filter);
}, [filter]);

// Плохо
useEffect(() => {
  fetchData(filter);
}, []); // пропущена зависимость
```

### A11y: базовые проверки доступности (`jsx-a11y/*`)

Включены предупреждения Airbnb по альтернативному тексту, валидности ссылок, обработчикам кликов и запрету автофокуса на нативных элементах без необходимости.

```tsx
// Хорошо
<a href="/profile">Профиль</a>
<img src="/avatar.png" alt="Аватар пользователя" />

// Плохо
<a>Профиль</a>
<img src="/avatar.png" />
```

## Дополнительные правила, отсутствующие в Airbnb

### Форматирование через Prettier (`eslint-plugin-prettier/recommended`)

Форматирование кода проверяется как ошибки ESLint согласно общей конфигурации Prettier (одинарные кавычки, точка с запятой, ширина строки 120 символов).

```ts
// Хорошо (соответствует конфигу Prettier)
const message = 'Hello, world!';

// Плохо (двойные кавычки нарушают стиль)
const message = "Hello, world!";
```

### Сортировка импортов (`simple-import-sort/imports`)

Импорты группируются по внешним, внутренним и относительным путям и автоматически сортируются внутри групп.

```ts
// Хорошо
import fs from 'node:fs';
import express from 'express';

import { apiClient } from '@shared/api';
import { Button } from '@/components/Button';

import { getUser } from '../queries';
import './styles.css';

// Плохо
import './styles.css';
import { Button } from '@/components/Button';
import express from 'express';
import { apiClient } from '@shared/api';
import fs from 'node:fs';
import { getUser } from '../queries';
```

### Явный тип возвращаемого значения функций (`@typescript-eslint/explicit-function-return-type`)

Функции и методы должны объявлять возвращаемый тип, чтобы избежать неявного вывода и улучшить читаемость API.

```ts
// Хорошо
function getTitle(id: string): Promise<string> {
  return repo.findTitle(id);
}

// Плохо
function getTitle(id: string) {
  return repo.findTitle(id);
}
```

### Используйте `interface` для описания форм типов (`@typescript-eslint/consistent-type-definitions`)

Для объектных типов предпочтительны `interface`, что облегчает расширение и декларативное описание структур.

```ts
// Хорошо
interface User {
  id: string;
  email: string;
}

// Плохо
type User = {
  id: string;
  email: string;
};
```

### Не оставляйте «висящие» промисы (`@typescript-eslint/no-floating-promises`)

Промисы должны быть `await`-нуты или обработаны, чтобы ошибки не терялись.

```ts
// Хорошо
await sendNotification(userId);

// Плохо
sendNotification(userId); // результат игнорируется
```

### Строгий контроль неиспользуемых переменных (`@typescript-eslint/no-unused-vars`)

Все неиспользуемые переменные и аргументы вызывают ошибку, исключения допускаются только с префиксом `_`.

```ts
// Хорошо
const [_ignored, value] = tuple;
function handle(_event: Event, value: string) {
  process(value);
}

// Плохо
const unused = 5;
function handle(event: Event) {
  process(event);
}
```

### Явные модификаторы доступа в классах (`@typescript-eslint/explicit-member-accessibility`)

Поля и методы должны указывать модификаторы доступа; конструкторы можно оставлять без них.

```ts
// Хорошо
class Service {
  public constructor(private readonly repo: Repo) {}

  public run(): void {
    this.repo.execute();
  }
}

// Плохо
class Service {
  constructor(repo: Repo) {}
  run() {}
}
```

### Порядок элементов класса (`@typescript-eslint/member-ordering`)

Члены класса следуют фиксированному порядку: сигнатуры → статические поля → экземплярные поля → конструкторы → методы.

```ts
// Хорошо
class Widget {
  public static version = '1.0';

  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public render(): string {
    return this.name;
  }
}

// Плохо
class Widget {
  private name: string;

  public render(): string {
    return this.name;
  }

  public static version = '1.0';

  public constructor(name: string) {
    this.name = name;
  }
}
```

### Строгий профиль: запрет `any` и соглашения об именовании (`@typescript-eslint/no-explicit-any`, `@typescript-eslint/naming-convention`)

В строгом режиме `any` запрещён, а переменные должны именоваться в `camelCase` или `PascalCase`; подчёркивания допускаются только для технических случаев.

```ts
// Хорошо (строгий профиль)
const userName = 'Alice';
const APIClient = createClient();

// Плохо
const user_name = 'Alice';
let value: any = null;
```

### Строгий профиль: один публичный тип на файл (`max-classes-per-file`, `no-restricted-syntax`)

Файл может содержать только одну декларацию класса, интерфейса, типа или enum. Остальные следует вынести в отдельные файлы.

```ts
// Хорошо (разные файлы)
// user.ts
export interface User { id: string }

// role.ts
export enum Role { Admin = 'admin' }

// Плохо (в одном файле)
export interface User { id: string }
export enum Role { Admin = 'admin' }
```

## Как применять профили

- **Базовый профиль** (`eslint.config.mjs`): подключает правила Airbnb и все дополнительные правила, перечисленные выше для JavaScript и TypeScript.
- **Строгий профиль** (`configs/strict.mjs`): включает базу и добавляет ограничения на `any`, соглашение об именовании и правило одного публичного типа на файл.
- **React-профиль** (`configs/react.mjs`): расширяет базу React- и a11y-правилами из Airbnb.
