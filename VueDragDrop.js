!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.VueDragDrop=e()}(this,function(){"use strict";function o(t){return function(){return t}}function s(t){return"function"==typeof t}var r="staged_";var t={tag:{type:String,default:"div"},revertDuration:{type:Number,default:0},restrict:{},data:{}},i={width:0,height:0},n={left:0,top:0,width:1/0,height:1/0};function c(){}function u(t,e,n){return Math.min(Math.max(t,e),n)}var e={eventListeners:function(){return Object.assign({},{onTouchStart:c,onTouchMove:c,onTouchEnd:c,onMouseDown:c,onMouseMove:c,onMouseUp:c},this.activeEventListeners)},ghostBounds:function(){return Object.assign({},this.ghostPosition,this.ghostSize)},ghostOffsetPosition:function(){var t=this.elementRelativeStartPointerPosition,e=this.ghostSize;return{left:t.left*e.width,top:t.top*e.height}},ghostPosition:function(){var t=this.ghostOffsetPosition,e=this.ghostSize,n=this.pointerPosition,i=this.restrictBounds;return{left:u(n.left-t.left,i.left,i.left+i.width-e.width),top:u(n.top-t.top,i.top,i.top+i.height-e.height)}},elementRelativeStartPointerPosition:function(){var t=this.startPointerPosition,e=this.getElementBounds();return{left:(t.left-e.left)/e.width,top:(t.top-e.top)/e.height}},windowEventListeners:function(){return{mousemove:this.onMouseMove,mouseup:this.onMouseUp}}};var h={activeEventListeners:function(e,n){return{onTouchStart:function(t){1===t.touches.length&&(t.preventDefault(),Object.assign(this.startPointerPosition,{left:t.touches[0].clientX,top:t.touches[0].clientY}),e({onTouchMove:function(t){1===t.touches.length&&(t.preventDefault(),this.dragged=!0,Object.assign(this.pointerPosition,{left:t.touches[0].clientX,top:t.touches[0].clientY}),e({onTouchMove:function(t){1===t.touches.length&&(t.preventDefault(),Object.assign(this.pointerPosition,{left:t.touches[0].clientX,top:t.touches[0].clientY}))},onTouchEnd:function(t){1===t.changedTouches.length&&(t.preventDefault(),Object.assign(this.pointerPosition,{left:t.changedTouches[0].clientX,top:t.changedTouches[0].clientY}),this.dragged=!1,n())}}))},onTouchEnd:function(t){1===t.changedTouches.length&&(t.preventDefault(),n())}}))},onMouseDown:function(t){1===t.which&&(t.preventDefault(),Object.assign(this.startPointerPosition,{left:t.clientX,top:t.clientY}),e({onMouseMove:function(t){t.preventDefault(),this.dragged=!0,Object.assign(this.pointerPosition,{left:t.clientX,top:t.clientY}),e({onMouseMove:function(t){t.preventDefault(),Object.assign(this.pointerPosition,{left:t.clientX,top:t.clientY})},onMouseUp:function(t){1===t.which&&(t.preventDefault(),Object.assign(this.pointerPosition,{left:t.clientX,top:t.clientY}),this.dragged=!1,n())}})},onMouseUp:function(t){1===t.which&&(t.preventDefault(),n())}}))}}},emiters:function(t,i){if(this.dragged){var e=this.data,n=this.ghostPosition;return t(function(){var t=this.data,e=this.dragged,n=this.ghostPosition;return e?[["drag",{data:t,position:Object.assign({},n)}]]:(i(),[["drag-end",{data:t,position:Object.assign({},n)}]])}),[["drag-start",{data:e,position:Object.assign({},n)}]]}}};var a={emiters:function(t){var i=this;t&&t.forEach(function(t){var e=t[0],n=t[1];i.$emit(e,n)})}},f=["onTouchStart","onTouchMove","onTouchEnd","onMouseDown","onMouseMove","onMouseUp"].reduce(function(t,n){var e;return Object.assign(t,((e={})[n]=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];this.eventListeners[n].apply(this,t)},e))},{}),d={left:0,top:0,width:0,height:0};var g=Object.assign({},f,{getElementBounds:function(){var t=this.$el;if(t){var e=t.getBoundingClientRect();return{left:e.left,top:e.top,width:e.width,height:e.height}}return d},getGhostSize:function(){var t=this.$refs;if(t){var e=t.ghost;if(e){var n=e.getBoundingClientRect();return{width:n.width,height:n.height}}}return i},getRestrictBounds:function(){var t,e=this.restrict;return s(e)&&(e=e()),(t=e)&&t._isVue&&(e=e.$el),e instanceof HTMLElement&&(e=e.getBoundingClientRect()),e?{left:e.left,top:e.top,width:e.width,height:e.height}:n},updateGhostSize:function(){Object.assign(this.ghostSize,this.getGhostSize())},updateRestrictBounds:function(){Object.assign(this.restrictBounds,this.getRestrictBounds())}});function l(e,n){var i,o;i=function(t){requestAnimationFrame(function(){!1!==e()&&setTimeout(t,n)})},(o=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return i.call.apply(i,[this,o].concat(t))})()}var p,v,b={name:"VueDragItem",mixins:[(p=h,v={},Object.entries(p).forEach(function(t){var i=t[0],e=t[1],n=function(e){var n=this;this.$nextTick(function(){var t;n[r+i]=s(t=e)?t:o(t)})};v[i]=function(){return this[r+i].call(this,n.bind(this),n.bind(this,e))}}),{data:function(){var i={};return Object.entries(p).forEach(function(t){var e=t[0],n=t[1];i[r+e]=n}),i},computed:v})],props:t,data:function(){return{dragged:!1,ghostSize:Object.assign({},i),pointerPosition:{left:0,top:0},restrictBounds:Object.assign({},n),startPointerPosition:{left:0,top:0}}},computed:e,watch:a,methods:g,mounted:function(){var t=this,e=this.windowEventListeners;Object.entries(e).forEach(function(t){var e=t[0],n=t[1];window.addEventListener(e,n)}),l(function(){if(t._isDestroyed)return!1;t.updateGhostSize(),t.updateRestrictBounds()},1e3/60);var n=this.$refs;n.ghost&&document.body.appendChild(n.ghost)},beforeDestroy:function(){var t=this.windowEventListeners;Object.entries(t).forEach(function(t){var e=t[0],n=t[1];window.removeEventListener(e,n)})},render:function(t){var e=this.$scopedSlots,n=this.dragged,i=this.tag;e=Object.assign({},{default:c,ghost:c},e);var o,s={},r={position:"absolute",zIndex:999999};if(n){var u=this.ghostPosition;Object.assign(s,{dragged:{position:u}}),Object.assign(r,{left:u.left+"px",top:u.top+"px"}),o=e.ghost(s)}var h=e.default(s);return t(i,{style:{display:"inline"}},[t("div",{style:{position:"relative"},on:{touchstart:this.onTouchStart,touchmove:this.onTouchMove,touchend:this.onTouchEnd,mousedown:this.onMouseDown}},[h]),t("div",{style:r,ref:"ghost"},[o])])}},m=o(!0);var w={name:"VueDropArea",props:{tag:{type:String,default:"div"},accept:{type:Function,default:m}},mounted:function(){var t=this;l(function(){if(t._isDestroyed)return!1},1e3)},render:function(t){var e=this.$scopedSlots;return t(this.tag,{style:{display:"inline-block"}},[(e=Object.assign({},{default:c},e)).default({dragged:{inside:!0}})])}},O=Object.freeze({DragItem:b,DropArea:w}),j=Object.assign({},{install:function(e){Object.values(this.components).forEach(function(t){e.component(t.name,t)})},components:O},O);return"undefined"!=typeof window&&window.Vue&&window.Vue.use(j),j});
