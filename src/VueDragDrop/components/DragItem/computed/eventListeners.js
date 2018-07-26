import Function_noop from '/utils/Function/noop';

export default function() {
	return {
		onTouchStart: Function_noop,
		onTouchMove: Function_noop,
		onTouchEnd: Function_noop,
		onMouseDown: Function_noop,
		onMouseMove: Function_noop,
		onMouseUp: Function_noop,
		...this.activeEventListeners,
	};
}
