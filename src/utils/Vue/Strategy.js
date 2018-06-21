import Function_cast from '../Function/cast';

export default function({
	get: getPartialStrategy,
	default: defaultStrategy,
}) {
	getPartialStrategy = Function_cast(getPartialStrategy);
	let methods = {};
	Object.keys(defaultStrategy).forEach(key => {
		methods[key] = function(...args) {
			return this.strategy[key].apply(this, args);
		};
	});
	let next = function(value) {
		this.getPartialStrategy = value ? Function_cast(value) : getPartialStrategy;
	};
	return {
		data() {
			return {getPartialStrategy};
		},
		computed: {
			strategy() {
				return {
					...defaultStrategy,
					...this.getPartialStrategy(next.bind(this)),
				};
			},
		},
		methods,
	};
}
