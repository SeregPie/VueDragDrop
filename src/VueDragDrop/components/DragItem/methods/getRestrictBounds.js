import Function_isFunction from '/utils/Function/isFunction';
import Vue_isVue from '/utils/Vue/isVue';

import defaultRestrictBounds from '../constants/defaultRestrictBounds';

export default function() {
	let {restrict} = this;
	if (Function_isFunction(restrict)) {
		restrict = restrict();
	}
	if (Vue_isVue(restrict)) {
		restrict = restrict.$el;
	}
	if (restrict instanceof HTMLElement) {
		restrict = restrict.getBoundingClientRect();
	}
	if (restrict) {
		let {left, top, width, height} = restrict;
		return {left, top, width, height};
	}
	return defaultRestrictBounds;
}
