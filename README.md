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

// If you are using Vue, you need to pass `ref` as the first argument
// import { ref } from 'vue'
const {
  sm
} = useMedia(ref)

// If you are using Nanostores, you need to pass `atom` as the first argument
// import { atom } from 'nanostores'
const {
  sm
} = useMedia(atom)

// Default set of media expressions

const start = {
	sm: "(min-width: 640px)",
	md: "(min-width: 768px)",
	lg: "(min-width: 1024px)",
	xl: "(min-width: 1280px)",
	mouse: "(hover: hover)"
}

// If you want to pass your own media expressions instead of the defaults, pass them as the second parameter under the key `start`

const {
  xs,
  md
} = useMedia(ref, {
  start: {
    xs: "(min-width: 320px)",
    md: "(min-width: 500px)"
  }
})

// If you want to extend the default variables, pass them under the key `extend`

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

```ts
// Advanced usage myUseMedia.js
import useMedia from "media-checker";
import { ref } from "vue"
import { atom } from "nanostores"

const options = {
  extend: {
    xs: "(min-width: 320px)"
  }
}

export default {
  vueMedia: useMediaVue(ref, options),
  nanoMedia: useMediaNS(atom, options)
}

// In other.js

import { nanoMedia } from 'path/to/myUseMedia'

const {
  xs
} = nanoMedia

xs.listen(() => /* code */)


// In component.vue

import { vueMedia } from 'path/to/myUseMedia'

const {
  xs
} = vueMedia

watch(xs, () => /* code */)
```