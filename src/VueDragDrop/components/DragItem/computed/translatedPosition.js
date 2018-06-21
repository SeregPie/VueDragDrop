export default function() {
	let {
		startPosition,
		restrictedPosition,
	} = this;

	return [
		restrictedPosition[0] - startPosition[0],
		restrictedPosition[1] - startPosition[1],
	];
}
