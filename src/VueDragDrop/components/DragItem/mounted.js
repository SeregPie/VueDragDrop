export default function() {
	Object.entries(this.windowEventListeners).forEach(([eventName, eventListener]) => {
		window.addEventListener(eventName, eventListener);
	});
}
