import startAnimationLoop from '/utils/startAnimationLoop';

export default function() {
	let {windowEventListeners} = this;
	Object.entries(windowEventListeners).forEach(([name, listener]) => {
		window.addEventListener(name, listener);
	});
	startAnimationLoop(() => {
		if (this._isDestroyed) {
			return false;
		}
		this.updateGhostSize();
		this.updateRestrictBounds();
	}, 1000/60);
	let {$refs} = this;
	if ($refs.ghost) {
		document.body.appendChild($refs.ghost);
	}
}
