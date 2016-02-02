# eyeglass-debug

Provides a wrapper around [`debug`](https://www.npmjs.com/package/debug) to allow debugging messages within an eyeglass module.

## Usage

```scss
@import "eyeglass-debug";

@include debug("my-module", "my message");
```

```scss
// debug as a mixin:
@include debug($namespace, $message);

// debug as a function:
$tmp: debug($namespace, $message);
````

## Enabling a namespace

By default, namespaces are disabled. You'll have to enable the namespace to see the log messages.

### via options
```js
var eyeglass = require("eyeglass");
var options = eyeglass({
  debug: {
    enable: ["foo", "bar"] // "foo" and "bar" namespaces will be enabled
  }
});
````

### via Sass
```scss
@include debug-enable("foo");
```