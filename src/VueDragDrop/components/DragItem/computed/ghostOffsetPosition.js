export default function() {
	let {
		elementRelativeStartPointerPosition,
		ghostSize,
	} = this;
	return {
		left: elementRelativeStartPointerPosition.left * ghostSize.width,
		top: elementRelativeStartPointerPosition.top * ghostSize.height,
	};
}
