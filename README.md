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
- `react` - дополнение с правилами из [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) для JSX/React, включая хуки и базовые проверки доступности.

## Использование

1. Подготовьте основной пакет, используя любой подходящий package manager.

```bash
# Yarn
yarn add @ytvee-dev/eslint-config-ytdev -D

# npm
npm install @ytvee-dev/eslint-config-ytdev --save-dev
```

2. Добавьте утилитарные зависимости в проект (вы можете сверить их с `peerDependencies` этого репозитория):

```bash
# Yarn
yarn add eslint prettier @eslint/js eslint eslint-config-prettier globals eslint-plugin-import eslint-plugin-prettier eslint-plugin-simple-import-sort typescript-eslint eslint-plugin-project-structure husky -D

# npm
npm install eslint prettier @eslint/js eslint-config-prettier globals eslint-plugin-import eslint-plugin-prettier eslint-plugin-simple-import-sort typescript-eslint eslint-plugin-project-structure husky --save-dev

# Для React-проектов добавьте плагины из Airbnb-пресета:
# Yarn
yarn add eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y -D

# npm
npm install eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y --save-dev
```

3. Подключите конфигурацию `prettier` проекта в ваш `.prettierrc.js`:

```bash
module.exports = require('@ytvee-dev/eslint-config-ytdev/prettier')
```

или в формате json:

```json
{
  "extends": "@ytvee-dev/eslint-config-ytdev/prettier"
}
```

4. Настройте ваш `eslint.config.mjs` по примеру:

```javascript
import baseConfig from '@ytvee-dev/eslint-config-ytdev'
// Вы можете взять сразу расширенный набор требований
// import strictConfig from '@ytvee-dev/eslint-config-ytdev/configs/strict'

export default [
  ...baseConfig,
  // Ваши дополнительные настройки
]
```

Если вы пишете на React, подключите набор правил из Airbnb JavaScript Style Guide для JSX/хуков/доступности:

```javascript
import reactConfig from '@ytvee-dev/eslint-config-ytdev/configs/react'

export default [
  ...reactConfig,
  // Ваши дополнительные настройки
]
```

5. Запускайте линтер в репозитории (для автоисправлений добавьте `--fix`):

```bash
yarn lint
yarn lint:fix
```

6. В репозитории настроен pre-commit хук, который блокирует коммит при наличии ошибок ESLint (Airbnb/React правила включаются, если вы используете конфиг `react`). Чтобы временно отключить хук, установите переменную окружения `HUSKY=0` при выполнении коммита:

```bash
HUSKY=0 git commit -m "skip lint hook"
```

7. Вы бесподобны!

## Contributing

### Настройка среды

1. Для работы с проектом потребуется [yarn](https://yarnpkg.com) (`npm install -g yarn`) **или** обычный `npm`.
2. Установите зависимости:

```bash
# Yarn
yarn install

# npm
npm install
```

Вы готовы к доработкам!
