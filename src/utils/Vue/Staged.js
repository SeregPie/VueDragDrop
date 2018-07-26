import Array_last from '../Array/last';
import Function_cast from '../Function/cast';
import Number_isNumber from '../Number/isNumber';

let prefix = 'staged_';

export default function(staged) {
	let computed = {};
	Object.entries(staged).forEach(([key, method]) => {
		let next = function(n = 0) {
			if (Number_isNumber(n)) {
				this[prefix+key].splice(n);
			} else {
				this[prefix+key].push(Function_cast(n));
			}
		};
		computed[key] = function() {
			return Array_last([method, ...this[prefix+key]]).call(this, next.bind(this));
		};
	});
	return {
		data() {
			let data = {};
			Object.keys(staged).forEach(key => {
				data[prefix+key] = [];
			});
			return data;
		},
		computed,
	};
}
