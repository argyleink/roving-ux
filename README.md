# Roving UX
<p style="text-align='center'">
  <img src="https://img.shields.io/npm/dt/roving-ux.svg" alt="Total Downloads">
  <img src="https://img.shields.io/npm/v/roving-ux.svg" alt="Latest Release">
  <img src="https://img.shields.io/npm/l/roving-ux.svg" alt="License">
</p>

> Turns tedious tab UX into a controlled and stateful experience

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

### Quick Overview
```js
rovingIndex({
  element: node,     // required: the container to get roving index ux
  target: "#foo",    // optional: a query selector for which children should be focusable
})
```
