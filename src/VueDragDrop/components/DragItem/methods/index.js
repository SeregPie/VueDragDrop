import eventListeners from './eventListeners';
import getElementBounds from './getElementBounds';
import getGhostSize from './getGhostSize';
import getRestrictBounds from './getRestrictBounds';
import updateGhostSize from './updateGhostSize';
import updateRestrictBounds from './updateRestrictBounds';

export default {
	...eventListeners,
	getElementBounds,
	getGhostSize,
	getRestrictBounds,
	updateGhostSize,
	updateRestrictBounds,
};
