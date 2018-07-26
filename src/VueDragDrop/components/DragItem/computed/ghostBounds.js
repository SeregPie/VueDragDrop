export default function() {
	return {
		...this.ghostPosition,
		...this.ghostSize,
	};
}
