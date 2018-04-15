import store from '../store';

window.Vue = require('vue');

Vue.component('Days', require('../components/Days.vue'));
Vue.component('Times', require('../components/TimeInput.vue'));

const app = new Vue({
  el: '#app',
  store,
});