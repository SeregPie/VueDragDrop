import Function_noop from '/utils/Function/noop';

export default function (createElement) {
	let {
		$scopedSlots,
		active,
		tag,
	} = this;
	$scopedSlots = {
		default: Function_noop,
		ghost: Function_noop,
		...$scopedSlots,
	};
	let props = {};
	let ghostElementStyle = {
		position: 'absolute',
		zIndex: 999999,
	};
	let ghostSlotElement;
	if (active) {
		let {ghostPosition} = this;
		Object.assign(props, {
			dragged: {
				position: ghostPosition,
			},
		});
		Object.assign(ghostElementStyle, {
			left: `${ghostPosition.left}px`,
			top: `${ghostPosition.top}px`,
		});
		ghostSlotElement = $scopedSlots.ghost(props);
	}
	let defaultSlotElement = $scopedSlots.default(props);
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
		'div',
		{
			style: ghostElementStyle,
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
