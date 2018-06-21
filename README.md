# VueDragDrop

...

## demo

[Try it out!](https://seregpie.github.io/VueDragDrop/)

## dependencies

- [Vue](https://github.com/vuejs/vue)

## setup

### npm

```shell
npm install @seregpie/vuedragdrop
```

### ES module

Register the components globally.

```javascript
import Vue from 'vue';
import VueDragDrop from '@seregpie/vuedragdrop';

Vue.use(VueDragDrop);
```

*or*

Register the components in the scope of another instance.

```javascript
import VueDragDrop from '@seregpie/vuedragdrop';

export default {
  // ...
  components: {
    [VueDragDrop.DargItem.name]: VueDragDrop.DargItem,
    [VueDragDrop.DropArea.name]: VueDragDrop.DropArea,
  },
};
```

### browser

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/@seregpie/vuedragdrop"></script>
```

If Vue is detected, the components will be registered automatically.

## usage

...

## components

### VueDragIten

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `tag` | `String` | `'div'` |
| `revertDuration` | `Number` | `0` |
| `restrict` | | |
| `data` | | |

### VueDropArea

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `tag` | `String` | `'div'` |
