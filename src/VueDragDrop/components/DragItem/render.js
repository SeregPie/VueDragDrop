import Function_noop from '/utils/Function/noop';

export default function (createElement) {
	let {
		$scopedSlots,
		dragged,
		pointerPosition,
		tag,
	} = this;
	$scopedSlots = {
		default: Function_noop,
		ghost: Function_noop,
		...$scopedSlots,
	};
	let defaultSlotElement = $scopedSlots.default({dragged});
	let ghostSlotElement;
	if (dragged) {
		ghostSlotElement = $scopedSlots.ghost({dragged});
	}
	let defaultElement = createElement(
		'div',
		{
			style: {
				position: 'relative',
			},
			on: {
				touchstart: this.onTouchStart,
				touchmove: this.onTouchMove,
				touchend: this.onTouchEnd,
				mousedown: this.onMouseDown,
			},
		},
		[defaultSlotElement],
	);
	let ghostElement = createElement(
		tag,
		{
			style: {
				position: 'absolute',
				zIndex: 999999,
				left: `${pointerPosition.left}px`,
				top: `${pointerPosition.top}px`,
			},
			ref: 'ghost',
		},
		[ghostSlotElement],
	);
	let mainElement = createElement(
		tag,
		{
			style: {
				display: 'inline-block',
			},
		},
		[
			defaultElement,
			ghostElement,
		],
	);
	return mainElement;
}
