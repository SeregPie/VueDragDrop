export default function() {
	let {
		$el,
		currentPosition,
	} = this;

	if ($el) {
		let {left, top} = $el.getBoundingClientRect();
		return [
			currentPosition[0] - left,
			currentPosition[1] - top,
		];
	}
	return currentPosition;
}
