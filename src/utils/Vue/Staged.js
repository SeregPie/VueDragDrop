import Function_cast from '../Function/cast';

let prefix = 'staged_';

export default function(staged) {
	let computed = {};
	Object.entries(staged).forEach(([key, initialStage]) => {
		let set = function(stage) {
			this.$nextTick(() => {
				this[prefix+key] = Function_cast(stage);
			});
		};
		computed[key] = function() {
			return this[prefix+key].call(this, set.bind(this), set.bind(this, initialStage));
		};
	});
	return {
		data() {
			let data = {};
			Object.entries(staged).forEach(([key, initialStage]) => {
				data[prefix+key] = initialStage;
			});
			return data;
		},
		computed,
	};
}
