let a = function(set, reset) {
	let emiters = [];
	let {
		data,
		dragged,
		ghostPosition,
	} = this;
	emiters.push(['drag', {
		data,
		position: {...ghostPosition},
	}]);
	if (dragged) {
		// pass
	} else {
		emiters.push(['drag-end', {
			data,
			position: {...ghostPosition},
		}]);
		reset();
	}
	return emiters;
};

export default function(set) {
	let emiters = [];
	let {dragged} = this;
	if (dragged) {
		let {
			data,
			ghostPosition,
		} = this;
		emiters.push(['drag-start', {
			data,
			position: {...ghostPosition},
		}]);
		set(a);
	} else {
		// pass
	}
	return emiters;
}
