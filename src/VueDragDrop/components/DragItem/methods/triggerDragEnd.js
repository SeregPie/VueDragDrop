import Lang_clone from '/utils/Lang/clone';

export default function(position) {
	this.position = position;
	this.dragged = false;
	this.$emit('drag-end', Lang_clone(this.restrictedPosition));
}
