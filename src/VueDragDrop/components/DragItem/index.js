import VueStaged from '/utils/Vue/Staged';

import props from './props';
import data from './data';
import computed from './computed';
import staged from './staged';
import watch from './watch';
import methods from './methods';
import mounted from './mounted';
import beforeDestroy from './beforeDestroy';
import render from './render';

export default {
	name: 'VueDragItem',
	mixins: [
		VueStaged(staged),
	],
	props,
	data,
	computed,
	watch,
	methods,
	mounted,
	beforeDestroy,
	render,
};
