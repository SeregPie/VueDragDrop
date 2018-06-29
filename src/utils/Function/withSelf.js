export default function(func) {
	let callSelf = function(...args) {
		return func.call(this, callSelf, ...args);
	};
	return callSelf;
}
