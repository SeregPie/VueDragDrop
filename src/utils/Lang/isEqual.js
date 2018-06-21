import Object_hasOwn from '../Object/hasOwn';
import Object_isObject from '../Object/isObject';

let Lang_isEqual = function(value, otherValue) {
	if (value === otherValue) {
		return true;
	}
	if (Array.isArray(value)) {
		if (Array.isArray(otherValue)) {
			if (value.length === otherValue.length) {
				return value.every((value, index) => Lang_isEqual(value, otherValue[index]));
			}
		}
	} else
	if (Object_isObject(value)) {
		if (Object_isObject(otherValue)) {
			let keys = Object.keys(value);
			let otherKeys = Object.keys(otherValue);
			if (keys.length === otherKeys.length) {
				if (Lang_isEqual(keys.sort(), otherKeys.sort())) {
					return keys.every(key => Lang_isEqual(value[key], otherValue[key]));
				}
			}
		}
	}
	return false;
};

export default Lang_isEqual;
