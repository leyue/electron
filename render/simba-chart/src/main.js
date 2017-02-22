// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('./inject')();
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
//element-ui
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
import VueHighcharts from 'vue-highcharts'
import store from './store'
//app
import App from './App'
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(VueHighcharts);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: require('./routes/index'),
  store: store,
  ...App
});
