export default function() {
	let {
		$el,
		startPosition,
	} = this;

	if ($el) {
		let {left, top} = $el.getBoundingClientRect();
		return [
			startPosition[0] - left,
			startPosition[1] - top,
		];
	}
	return startPosition;
}
