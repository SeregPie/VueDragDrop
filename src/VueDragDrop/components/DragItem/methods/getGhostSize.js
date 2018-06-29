import defaultGhostSize from '../constants/defaultGhostSize';

export default function() {
	let {$refs} = this;
	if ($refs) {
		let {ghost} = $refs;
		if (ghost) {
			let {width, height} = ghost.getBoundingClientRect();
			return {width, height};
		}
	}
	return defaultGhostSize;
}
