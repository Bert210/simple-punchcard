window.Vue = require('vue');

Vue.component('excomp', require('../components/ExampleComponent.vue'));

const app = new Vue({
  el: '#app'
});