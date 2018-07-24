import startAnimationLoop from '/utils/startAnimationLoop';

export default function() {
	startAnimationLoop(() => {
		if (this._isDestroyed) {
			return false;
		}
	}, 1000);
}
