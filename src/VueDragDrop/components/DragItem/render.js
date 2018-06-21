import Function_identity from '/utils/Function/identity';
import Object_mapValues from '/utils/Object/mapValues';

export default function (createElement) {
	let {
		$scopedSlots,
		dragged,
		relativePosition,
		revertDuration,
		tag,
	} = this;

	$scopedSlots = {
		default: Function_identity,
		...$scopedSlots,
	};

	let slotElement = $scopedSlots.default({dragged});
	let wrapElementStyle = {
		position: 'relative',
	};
	if (dragged) {
		wrapElementStyle.transform = `translate(${relativePosition.map(x => `${x}px`).join(',')})`;
	} else
	if (revertDuration > 0) {
		wrapElementStyle.transition = [
			'transform',
			`${revertDuration}ms`
		];
	}
	let wrapElement = createElement(
		tag,
		{
			style: wrapElementStyle,
		},
		[slotElement],
	);
	let mainElement = createElement(
		tag,
		{
			style: {
				display: 'inline-block',
			},
			on: Object_mapValues({
				touchstart: this.onTouchStart,
				touchmove: this.onTouchMove,
				touchend: this.onTouchEnd,
				mousedown: this.onMouseDown,
			}, f => f.bind(this)),
		},
		[wrapElement],
	);
	return mainElement;
}
