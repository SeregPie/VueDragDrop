import Math_clamp from '/utils/Math/clamp';

export default function() {
	let {
		ghostOffsetPosition,
		ghostSize,
		pointerPosition,
		restrictBounds,
	} = this;
	return {
		left: Math_clamp(
			pointerPosition.left - ghostOffsetPosition.left,
			restrictBounds.left,
			restrictBounds.left + restrictBounds.width - ghostSize.width,
		),
		top: Math_clamp(
			pointerPosition.top - ghostOffsetPosition.top,
			restrictBounds.top,
			restrictBounds.top + restrictBounds.height - ghostSize.height,
		),
	};
}
