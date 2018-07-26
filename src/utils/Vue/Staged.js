import Function_cast from '../Function/cast';

let prefix = 'staged_';

export default function(staged) {
	let data = {};
	let computed = {};
	Object.entries(staged).forEach(([key, initialMethod]) => {
		let next = function(...args) {
			this[prefix+key] = args.length ? Function_cast(args[0]) : initialMethod;
		};
		data[prefix+key] = initialMethod;
		computed[key] = function() {
			return this[prefix+key].call(this, next.bind(this));
		};
	});
	return {
		data() {
			return data;
		},
		computed,
	};
}
