import triggerDrag from './triggerDrag';
import triggerDragEnd from './triggerDragEnd';
import triggerDragStart from './triggerDragStart';

export default {
	triggerDrag,
	triggerDragEnd,
	triggerDragStart,

	onTouchStart(...args) {
		this.eventListeners.onTouchStart.apply(this, args);
	},
	onTouchMove(...args) {
		this.eventListeners.onTouchMove.apply(this, args);
	},
	onTouchEnd(...args) {
		this.eventListeners.onTouchEnd.apply(this, args);
	},
	onMouseDown(...args) {
		this.eventListeners.onMouseDown.apply(this, args);
	},
	onMouseMove(...args) {
		this.eventListeners.onMouseMove.apply(this, args);
	},
	onMouseUp(...args) {
		this.eventListeners.onMouseUp.apply(this, args);
	},
};
