import VueStrategy from '/utils/Vue/Strategy';

import props from './props';
import data from './data';
import strategy from './strategy';
import computed from './computed';
//import watch from './watch';
import mounted from './mounted';
import methods from './methods';
import render from './render';

export default {
	name: 'VueDragItem',
	mixins: [
		VueStrategy(strategy),
	],
	props,
	data,
	computed,
	//watch,
	mounted,
	methods,
	render,
};
