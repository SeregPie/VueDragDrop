import Math_clamp from '/utils/Math/clamp';

export default function() {
	let {position} = this;
	let restrictedArea = this.getRestrictedArea();

	return [
		Math_clamp(
			position[0],
			restrictedArea[0],
			restrictedArea[1],
		),
		Math_clamp(
			position[1],
			restrictedArea[2],
			restrictedArea[3],
		),
	];
}
