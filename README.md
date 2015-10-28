# babel-plugin-remove-imports

Remove unwanted `import` declarations when building packages with babel transforms.

## Installation

```sh
$ npm install babel-plugin-remove-imports
```

## Usage

This plugin currently working only via the Node API

```javascript
var RemoveImports = require("babel-plugin-remove-imports");
var regexp = new RegExp(/\S+(\.scss$)/g);
require("babel-core").transform("code", {
  plugins: [RemoveImports(regexp)]
});
```

When `regexp` can be an Array of RegExp
