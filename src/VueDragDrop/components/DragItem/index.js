import VueStrategy from '/utils/Vue/Strategy';

import props from './props';
import data from './data';
import strategy from './strategy';
import computed from './computed';
import methods from './methods';
import mounted from './mounted';
import beforeDestroy from './beforeDestroy';
import render from './render';

export default {
	name: 'VueDragItem',
	mixins: [
		VueStrategy(strategy),
	],
	props,
	data,
	computed,
	methods,
	mounted,
	beforeDestroy,
	render,
};
