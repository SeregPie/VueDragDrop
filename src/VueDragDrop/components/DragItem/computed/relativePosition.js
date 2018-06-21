import Array_zip from '/utils/Array/zip';

export default function() {
	let {
		relativeCurrentPosition,
		relativeStartPosition,
	} = this;

	return Array_zip(relativeCurrentPosition, relativeStartPosition).map(([currentPosition, startPosition]) => currentPosition - startPosition);
}
