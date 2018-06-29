import defaultElementBounds from '../constants/defaultElementBounds';

export default function() {
	let {$el} = this;
	if ($el) {
		let {left, top, width, height} = $el.getBoundingClientRect();
		return {left, top, width, height};
	}
	return defaultElementBounds;
}
