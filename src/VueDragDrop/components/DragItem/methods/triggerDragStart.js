import Lang_clone from '/utils/Lang/clone';

export default function(position) {
	this.dragged = true;
	this.startPosition = position;
	this.position = position;
	this.$emit('drag-start', Lang_clone(this.restrictedPosition));
}
