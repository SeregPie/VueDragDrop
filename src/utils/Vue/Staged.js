import Array_last from '../Array/last';
import Function_cast from '../Function/cast';
import Number_isNumber from '../Number/isNumber';

let prefix = 'staged_';

export default function(staged) {
	let computed = {};
	Object.entries(staged).forEach(([key, initialStage]) => {
		let next = function(stage = 0) {
			this.$nextTick(() => {
				if (Number_isNumber(stage)) {
					this[prefix+key].splice(stage);
				} else {
					this[prefix+key].push(Function_cast(stage));
				}
			});
		};
		computed[key] = function() {
			return Array_last([initialStage, ...this[prefix+key]]).call(this, next.bind(this));
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
