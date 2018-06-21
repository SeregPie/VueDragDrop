import Function_identity from '/utils/Function/identity';
import Object_mapValues from '/utils/Object/mapValues';

export default function (createElement) {
	let {
		$scopedSlots,
		dragged,
		translatedPosition,
		revertDuration,
		tag,
	} = this;

	$scopedSlots = {
		default: Function_identity,
		...$scopedSlots,
	};

	let defaultSlotElement = $scopedSlots.default({dragged});
	let ghostElementStyle = {
		position: 'relative',
	};
	if (dragged) {
		ghostElementStyle.transform = `translate(${translatedPosition.map(v => `${v}px`).join(',')})`;
	} else
	if (revertDuration > 0) {
		ghostElementStyle.transition = [
			'transform',
			`${revertDuration}ms`
		];
	}
	let ghostElement = createElement(
		tag,
		{
			style: ghostElementStyle,
			ref: 'ghost',
		},
		[defaultSlotElement],
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
		[ghostElement],
	);
	return mainElement;
}
