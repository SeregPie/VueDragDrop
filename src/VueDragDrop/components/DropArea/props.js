import Function_stubTrue from '/utils/Function/stubTrue';

export default {
	tag: {
		type: String,
		default: 'div',
	},

	accept: {
		type: Function,
		default: Function_stubTrue,
	},
};
