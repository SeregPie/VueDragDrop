# VueDragDrop

A drag and drop solution for Vue.

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
    [VueDragDrop.DragItem.name]: VueDragDrop.DragItem,
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

### VueDragItem

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `tag` | `String` | `'div'` |
| `data` | | |
| `revertDuration` | `Number` | `0` |
| `restrict` | | |

#### events

| event | description |
| ---: | :--- |
| `drag-start` | |
| `drag-end` | |
| `drag` | |

### VueDropArea

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `tag` | `String` | `'div'` |
| `accept` | `Function` | `stubTrue` |
| `overlapThreshold` | `Number` | `1` |

#### events

| event | description |
| ---: | :--- |
| `drag-start` | |
| `drag-end` | |
| `drag-over` | |
| `drag-out` | |
| `drag` | |
| `drag-outside` | |
| `drag-inside` | |
| `drop` | |
