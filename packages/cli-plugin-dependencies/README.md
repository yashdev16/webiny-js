# @webiny/cli-plugin-dependencies

[![](https://img.shields.io/npm/dw/@webiny/cli-plugin-dependencies.svg)](https://www.npmjs.com/package/@webiny/cli-plugin-dependencies)
[![](https://img.shields.io/npm/v/@webiny/cli-plugin-dependencies.svg)](https://www.npmjs.com/package/@webiny/cli-plugin-dependencies)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A plugin for @webiny/cli that provides scaffolding capabilities by means of scaffold plugins.

## Install

```
yarn add @webiny/cli-plugin-dependencies
```

Add plugin to your project by editing `webiny.project.js`:

```js
module.exports = {
  projectName: "my-project",
  cli: {
    plugins: ["@webiny/cli-plugin-dependencies"]
  }
};
```
