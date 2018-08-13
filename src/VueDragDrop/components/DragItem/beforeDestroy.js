import Document_removeElement from '/utils/Document/removeElement';

export default function() {
	let {windowEventListeners} = this;
	Object.entries(windowEventListeners).forEach(([name, listener]) => {
		window.removeEventListener(name, listener);
	});
	let {$refs} = this;
	if ($refs.ghost) {
		Document_removeElement($refs.ghost);
	}
}
