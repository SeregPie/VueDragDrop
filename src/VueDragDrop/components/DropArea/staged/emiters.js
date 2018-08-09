let a;
let b;

a = function(set, reset) {
	let emiters = [];
	let {accepted} = this;
	if (accepted) {
		let {
			data,
			dragged,
			ghostPosition,
		} = this;
		if (dragged) {
			let {draggedInside} = this;
			if (draggedInside) {
				emiters.push(['drag', {
					data,
					position: {...ghostPosition},
				}]);
				emiters.push(['drag-in', {
					data,
					position: {...ghostPosition},
				}]);
			} else {
				emiters.push(['drag-out', {
					data,
					position: {...ghostPosition},
				}]);
				set(b);
			}
		} else {
			emiters.push(['drag-out', {
				data,
				position: {...ghostPosition},
			}]);
			emiters.push(['drag-end', {
				data,
				position: {...ghostPosition},
			}]);
			reset();
		}
	} else {
		reset();
	}
	return emiters;
};

b = function(set, reset) {
	let emiters = [];
	let {accepted} = this;
	if (accepted) {
		let {
			data,
			dragged,
			ghostPosition,
		} = this;
		if (dragged) {
			let {draggedInside} = this;
			if (draggedInside) {
				emiters.push(['drag-in', {
					data,
					position: {...ghostPosition},
				}]);
				set(a);
			} else {
				emiters.push(['drag', {
					data,
					position: {...ghostPosition},
				}]);
				emiters.push(['drag-outside', {
					data,
					position: {...ghostPosition},
				}]);
			}
		} else {
			emiters.push(['drag-end', {
				data,
				position: {...ghostPosition},
			}]);
			reset();
		}
	} else {
		reset();
	}
	return emiters;
};

export default function(set) {
	let emiters = [];
	let {dragged} = this;
	if (dragged) {
		let {accepted} = this;
		if (accepted) {
			let {
				data,
				draggedInside,
				ghostPosition,
			} = this;
			emiters.push(['drag-start', {
				data,
				position: {...ghostPosition},
			}]);
			if (draggedInside) {
				emiters.push(['drag-in', {
					data,
					position: {...ghostPosition},
				}]);
				set(a);
			} else {
				set(b);
			}
		} else {
			// pass
		}
	} else {
		// pass
	}
	return emiters;
}
