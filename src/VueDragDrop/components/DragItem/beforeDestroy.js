export default function() {
	let {windowEventListeners} = this;
	Object.entries(windowEventListeners).forEach(([name, listener]) => {
		window.removeEventListener(name, listener);
	});
}
