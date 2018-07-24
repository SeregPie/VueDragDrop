import Function_noop from '/utils/Function/noop';

export default function (createElement) {
	let {
		$scopedSlots,
		tag,
	} = this;
	$scopedSlots = {
		default: Function_noop,
		...$scopedSlots,
	};
	let defaultSlotElement = $scopedSlots.default({dragged: {inside: true}});
	let mainElement = createElement(
		tag,
		{
			style: {
				display: 'inline-block',
			},
		},
		[defaultSlotElement],
	);
	return mainElement;
}
