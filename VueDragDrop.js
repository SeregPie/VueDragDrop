!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.VueDragDrop=e()}(this,function(){"use strict";function r(t){return function(){return t}}var s="staged_";var t={tag:{type:String,default:"div"},revertDuration:{type:Number,default:0},restrict:{},data:{}};function u(){}var e={eventListeners:function(){return Object.assign({},{onTouchStart:u,onTouchMove:u,onTouchEnd:u,onMouseDown:u,onMouseMove:u,onMouseUp:u},this.activeEventListeners)},windowEventListeners:function(){return{mousemove:this.onMouseMove,mouseup:this.onMouseUp}}};var a=function(t){return Array.isArray(t)?t.map(a):(n=t)&&"object"==typeof n?(e=t,o=a,i={},Object.entries(e).forEach(function(t){var e=t[0],n=t[1];i[e]=o(n,e)}),i):t;var e,o,i,n};var n={triggerDrag:function(){var t=this.data,e=this.position;e=a(e),this.$emit("drag",{data:t,position:e})},triggerDragEnd:function(){var t=this.data,e=this.position;e=a(e),this.$emit("drag-end",{data:t,position:e})},triggerDragStart:function(){var t=this.data,e=this.position;e=a(e),this.$emit("drag-start",{data:t,position:e})},onTouchStart:function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];this.eventListeners.onTouchStart.apply(this,t)},onTouchMove:function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];this.eventListeners.onTouchMove.apply(this,t)},onTouchEnd:function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];this.eventListeners.onTouchEnd.apply(this,t)},onMouseDown:function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];this.eventListeners.onMouseDown.apply(this,t)},onMouseMove:function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];this.eventListeners.onMouseMove.apply(this,t)},onMouseUp:function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];this.eventListeners.onMouseUp.apply(this,t)}};function o(e,n){var o,i;o=function(t){requestAnimationFrame(function(){!1!==e()&&setTimeout(t,n)})},(i=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return o.call.apply(o,[this,i].concat(t))})()}var i,c,h,f={name:"VueDragItem",mixins:[(i={activeEventListeners:function(e){return{onTouchStart:function(t){1===t.touches.length&&(t.preventDefault(),e({onTouchMove:function(t){1===t.touches.length&&(t.preventDefault(),this.dragged=!0,this.pointerPosition={left:t.touches[0].clientX,top:t.touches[0].clientY},this.triggerDragStart(),this.triggerDrag(),e({onTouchMove:function(t){1===t.touches.length&&(t.preventDefault(),this.pointerPosition={left:t.touches[0].clientX,top:t.touches[0].clientY},this.triggerDrag())},onTouchEnd:function(t){1===t.changedTouches.length&&(t.preventDefault(),this.pointerPosition={left:t.changedTouches[0].clientX,top:t.changedTouches[0].clientY},this.dragged=!1,this.triggerDragEnd(),e())}}))},onTouchEnd:function(t){1===t.changedTouches.length&&(t.preventDefault(),e())}}))},onMouseDown:function(t){1===t.which&&(t.preventDefault(),e({onMouseMove:function(t){t.preventDefault(),this.dragged=!0,this.pointerPosition={left:t.clientX,top:t.clientY},this.triggerDragStart(),this.triggerDrag(),e({onMouseMove:function(t){t.preventDefault(),this.pointerPosition={left:t.clientX,top:t.clientY},this.triggerDrag()},onMouseUp:function(t){1===t.which&&(t.preventDefault(),this.pointerPosition={left:t.clientX,top:t.clientY},this.dragged=!1,this.triggerDragEnd(),e())}})},onMouseUp:function(t){1===t.which&&(t.preventDefault(),e())}}))}}}},c={},h={},Object.entries(i).forEach(function(t){var o=t[0],i=t[1],e=function(){for(var t,e=[],n=arguments.length;n--;)e[n]=arguments[n];this[s+o]=e.length?"function"==typeof(t=e[0])?t:r(t):i};c[s+o]=i,h[o]=function(){return this[s+o].call(this,e.bind(this))}}),{data:function(){return c},computed:h})],props:t,data:function(){return{dragged:!1,pointerPosition:{left:0,top:0}}},computed:e,methods:n,mounted:function(){var t=this;Object.entries(this.windowEventListeners).forEach(function(t){var e=t[0],n=t[1];window.addEventListener(e,n)}),o(function(){if(t._isDestroyed)return!1},1e3);var e=this.$refs;e.ghost&&document.body.appendChild(e.ghost)},beforeDestroy:function(){Object.entries(this.windowEventListeners).forEach(function(t){var e=t[0],n=t[1];window.removeEventListener(e,n)})},render:function(t){var e,n=this.$scopedSlots,o=this.dragged,i=this.pointerPosition,r=this.tag,s=(n=Object.assign({},{default:u,ghost:u},n)).default({dragged:o});return o&&(e=n.ghost({dragged:o})),t(r,{style:{display:"inline-block"}},[t("div",{style:{position:"relative"},on:{touchstart:this.onTouchStart,touchmove:this.onTouchMove,touchend:this.onTouchEnd,mousedown:this.onMouseDown}},[s]),t(r,{style:{position:"absolute",zIndex:999999,left:i.left+"px",top:i.top+"px"},ref:"ghost"},[e])])}},d=r(!0);var g={name:"VueDropArea",props:{tag:{type:String,default:"div"},accept:{type:Function,default:d},data:{}},mounted:function(){var t=this;o(function(){if(t._isDestroyed)return!1},1e3)},render:function(t){var e=this.$scopedSlots;return t(this.tag,{style:{display:"inline-block"}},[(e=Object.assign({},{default:u},e)).default({dragged:{inside:!0}})])}},p=Object.freeze({DragItem:f,DropArea:g}),l=Object.assign({},{install:function(e){Object.values(this.components).forEach(function(t){e.component(t.name,t)})},components:p},p);return"undefined"!=typeof window&&window.Vue&&window.Vue.use(l),l});
