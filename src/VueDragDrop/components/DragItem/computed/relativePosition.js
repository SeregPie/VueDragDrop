export default function() {
	let {
		elementBounds,
		position,
	} = this;

	return {
		left: position.left - elementBounds.left,
		top: position.top - elementBounds.top,
	};
}
