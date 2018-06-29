import setAnimationLoop from '/utils/setAnimationLoop';

export default function() {
	Object.entries(this.windowEventListeners).forEach(([eventName, eventListener]) => {
		window.addEventListener(eventName, eventListener);
	});
	setAnimationLoop(() => {
		if (this._isDestroyed) {
			return false;
		}
		this.updateElementBounds();
		this.updateGhostSize();
		this.updateRestrictBounds();
	}, 1000);
}
