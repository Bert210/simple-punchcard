import store from '../store';

window.Vue = require('vue');

Vue.component('Days', require('../components/Days.vue'));
Vue.component('time-view', require('../components/TimeView.vue'));
Vue.component('time-range', require('../components/TimeRange'));

const app = new Vue({
  el: '#app',
  store,
});