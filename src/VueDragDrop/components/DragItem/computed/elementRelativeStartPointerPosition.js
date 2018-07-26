export default function() {
	let {startPointerPosition} = this;
	let elementBounds = this.getElementBounds();
	return {
		left: (startPointerPosition.left - elementBounds.left) / elementBounds.width,
		top: (startPointerPosition.top - elementBounds.top)  / elementBounds.height,
	};
}
