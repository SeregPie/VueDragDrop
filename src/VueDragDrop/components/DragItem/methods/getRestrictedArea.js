import Function_isFunction from '/utils/Function/isFunction';
import Object_isObject from '/utils/Object/isObject';

export default function() {
	let {restrict} = this;

	if (Function_isFunction(restrict)) {
		restrict = restrict();
	}
	if (Array.isArray(restrict)) {
		return restrict;
	}
	if (restrict) {
		if (restrict.$el) {
			restrict = restrict.$el;
		}
		if (restrict instanceof HTMLElement) {
			restrict = restrict.getBoundingClientRect();
		}
		if (Object_isObject(restrict)) {
			let {left, top, width, height} = restrict;
			return [left, left + width, top, top + height];
		}
	}
	return [0, Infinity, 0, Infinity];
}
