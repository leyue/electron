/**
 * Created by hasee on 2017/1/18.
 */

import VueRouter from 'vue-router'
import PageHome from '../components/PageHome.vue'

module.exports = new VueRouter({
  // mode: cfg.development?'history':'hash',
  // base: cfg.development?'/':'/simba-full-scan',
  routes: [{
    path: '/',
    component: PageHome
  },{
    path: '/home',
    component: PageHome
  },]
});




