import VueDragDrop from './VueDragDrop';

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(VueDragDrop);
}

export default VueDragDrop;
