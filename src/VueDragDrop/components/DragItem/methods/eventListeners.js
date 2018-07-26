export default [
	'onTouchStart',
	'onTouchMove',
	'onTouchEnd',
	'onMouseDown',
	'onMouseMove',
	'onMouseUp',
].reduce((result, key) => Object.assign(result, {
	[key](...args) {
		this.eventListeners[key].apply(this, args);
	},
}), {});
