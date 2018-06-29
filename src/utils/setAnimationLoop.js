import Function_withSelf from './Function/withSelf';

export default function(callback, delay) {
	Function_withSelf(callSelf => {
		requestAnimationFrame(() => {
			if (callback() !== false) {
				setTimeout(callSelf, delay);
			}
		});
	})();
}
