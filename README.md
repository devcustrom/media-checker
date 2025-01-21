<div align="center">
 <h1>Media checker</h1>
</div>

<div align="center">
  <a href="https://github.com/devcustrom/media-checker/blob/main/LICENSE">
    <img alt="License" src="https://badgen.net/github/license/devcustrom/media-checker" />
  </a>
  <br />
  <br />
</div>

This plugin allows you to create custom animations

- [Install](#install)

## Install

Install `media-checker` using npm package manager:

```shell
npm i -D media-checker
```


```ts
import useMedia from "media-checker";

// Если вы используете vue то нужно передать первым аргументом `ref`
// import { ref } from 'vue'
const {
  sm
} = useMedia(ref)

// Если вы используете nanostores то нужно передать первым аргументом `atom`
// import { atom } from 'nanostores'
const {
  sm
} = useMedia(atom)

// Стартовый набор медта выражений

const start = {
	sm: "(min-width: 640px)",
	md: "(min-width: 768px)",
	lg: "(min-width: 1024px)",
	xl: "(min-width: 1280px)",
	mouse: "(hover: hover)"
}

// Если вы хотите передать свои медиа выражения вместо стартовых передайте их во втором параметре, в ключе start

const {
  xs,
  md
} = useMedia(ref, {
  start: {
    xs: "(min-width: 320px)",
    md: "(min-width: 500px)"
  }
})

// Если вы хотите расширить стартовые переменные то передайте их в ключе extend

const {
  xs,
  md
} = useMedia(ref, {
  extend: {
    xs: "(min-width: 320px)",
    md: "(min-width: 500px)"
  }
})

```
