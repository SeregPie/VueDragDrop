import Object_hasOwn from './hasOwn';

export default function(object) {
	let returns = 0;
	for (let key in object) {
		if (Object_hasOwn(object, key)) {
			returns++;
		}
	}
	return returns;
}
