import startAnimationLoop from '/utils/startAnimationLoop';

export default function() {
	Object.entries(this.windowEventListeners).forEach(([eventName, eventListener]) => {
		window.addEventListener(eventName, eventListener);
	});
	startAnimationLoop(() => {
		if (this._isDestroyed) {
			return false;
		}
	}, 1000);
	let {$refs} = this;
	if ($refs.ghost) {
		document.body.appendChild($refs.ghost);
	}
}
