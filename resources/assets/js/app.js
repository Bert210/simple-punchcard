import store from '../store';

window.Vue = require('vue');

Vue.component('excomp', require('../components/ExampleComponent.vue'));
Vue.component('Days', require('../components/Days.vue'));
// Vue.component('TimeInput', require('../components/TimeInput.vue'));

const app = new Vue({
  el: '#app',
  store,
});