import elementBounds from './constants/defaultElementBounds';
import ghostSize from './constants/defaultGhostSize';
import restrictBounds from './constants/defaultRestrictBounds';

export default function() {
	return {
		dragged: false,
		pointerPosition: {left: 0, top: 0},
		//relativeStartPointerPosition: {left: 0, top: 0},
		elementBounds,
		ghostSize,
		restrictBounds,
	};
}
