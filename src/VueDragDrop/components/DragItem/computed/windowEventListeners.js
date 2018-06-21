import Object_mapValues from '/utils/Object/mapValues';

export default function() {
	return Object_mapValues({
		mousemove: this.onMouseMove,
		mouseup: this.onMouseUp,
	}, f => f.bind(this));
}
