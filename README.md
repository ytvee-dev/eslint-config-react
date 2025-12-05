# Devcom Code Standards

Каждый проект DEVCOM должен следовать принятому ГОСТ.

Подробнее:

- [Backend Styleguide](https://aviasales.atlassian.net/wiki/spaces/devcom/pages/5996249191/Code+Style+Backend+Design)
- [Frontend Styleguide](https://aviasales.atlassian.net/wiki/spaces/devcom/pages/5647270587/Code+Style)

## Описание

Данный проект представляет собой сборник правил, конфигов, переиспользуемых
командой Devcom. А именно:

- `eslint` конфигурация.
- `prettier` правила.

И предоставляет готовые конфиги для вашего проекта:

- `base` - единая конфигурация для всех проектов. Помогает следовать общему стилю.
- `strict` - строгие правила для повышения качества кода.

## Использование

1. Подготовьте основной пакет, используя любой подходящий package manager.

```bash
yarn add @kosyanmedia/eslint-config-devcom -D
```

2. Добавьте утилитарные зависимости в проект (вы можете сверить их с `peerDependencies` этого репозитория):

```bash
yarn add eslint prettier @eslint/js eslint eslint-config-prettier globals eslint-plugin-import eslint-plugin-prettier eslint-plugin-simple-import-sort typescript-eslint eslint-plugin-project-structure -D
```

3. Подключите конфигурацию `prettier` проекта в ваш `.prettierrc.js`:

```bash
module.exports = require('@kosyanmedia/eslint-config-devcom/prettier')
```

или в формате json:

```json
{
  "extends": "@kosyanmedia/eslint-config-devcom/prettier"
}
```

4. Настройте ваш `eslint.config.mjs` по примеру:

```javascript
import baseConfig from '@kosyanmedia/eslint-config-devcom'
// Вы можете взять сразу расширенный набор требований
// import strictConfig from '@kosyanmedia/eslint-config-devcom/configs/strict'

export default [
  ...baseConfig,
  // Ваши дополнительные настройки
]
```

5. Вы бесподобны!

## Contributing

### Настройка среды

1. Для работы с проектом потребуется [yarn](https://yarnpkg.com) (`npm install -g yarn`).
2. Установите зависимости:

```bash
yarn install
```

Вы готовы к доработкам!
