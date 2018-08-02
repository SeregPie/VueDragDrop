import defaultGhostSize from './constants/defaultGhostSize';
import defaultRestrictBounds from './constants/defaultRestrictBounds';

export default function() {
	return {
		dragged: false,
		ghostSize: {...defaultGhostSize},
		pointerPosition: {left: 0, top: 0},
		restrictBounds: {...defaultRestrictBounds},
		startPointerPosition: {left: 0, top: 0},
	};
}
