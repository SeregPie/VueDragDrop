export default function() {
	let {
		overlap,
		overlapThreshold,
	} = this;
	return overlap < overlapThreshold;
}
