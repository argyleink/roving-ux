# Roving UX
<p style="text-align='center'">
  <img src="https://img.shields.io/npm/dt/roving-ux.svg" alt="Total Downloads">
  <img src="https://img.shields.io/npm/v/roving-ux.svg" alt="Latest Release">
  <img src="https://img.shields.io/npm/l/roving-ux.svg" alt="License">
</p>

> Turns tedious tab UX into a controlled and stateful experience

<br>

**Learn more** in [this article by Rob Dodson on web.dev](https://web.dev/control-focus-with-tabindex/)  
**Try it** at this [GUI Challenge](https://gui-challenges.web.app/media-scroller/dist/) (use `tab` then `left || right` arrows)

<br>

###### Getting Started
### Installation
```bash
npm i roving-ux
```

### Importing
```js
import {rovingIndex} from 'roving-ux'              // es6 module
const rovingIndex = require('roving-ux')           // commonjs
```

<br>

###### Syntax

### Quick API Overview
```js
rovingIndex({
  element: node,     // required: the container to get roving index ux
  target: "#foo",    // optional: a query selector for which children should be focusable
})
```

### Example Usage
```js
import {rovingIndex} from 'roving-ux'

// just one roving ux container
// roving-ux will use direct children as focus targets
rovingIndex({
  element: document.querySelector('#carousel')
})
```

```js
import {rovingIndex} from 'roving-ux'

// many roving ux containers
// passes a custom query selector so the proper elements get focus
document.querySelectorAll('.horizontal-media')
  .forEach(scroller => {
    rovingIndex({
      element: scroller,
      target: 'a',
    })
  })
```
