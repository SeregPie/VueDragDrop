export default function() {
	let {
		ghostBounds,
		elementBounds,
	} = this;
	if (ghostBounds && elementBounds) {
		return true;
	}
	return (Math.max(ghostBounds.left, elementBounds.left) - Math.min(ghostBounds.left + ghostBounds.width, elementBounds.left + elementBounds.width)) * (Math.max(ghostBounds.left, elementBounds.left) - Math.min(ghostBounds.left + ghostBounds.width, elementBounds.left + elementBounds.width));
}
