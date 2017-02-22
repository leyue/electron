/**
 * Created by hasee on 2017/1/18.
 */
import PageSearch from '../components/PageSearch.vue'
import PageChart from '../components/PageChart.vue'
import PageSettings from '../components/PageSettings.vue'
import VueRouter from 'vue-router'
// var cfg = require('../../../../config/cfg');

module.exports = new VueRouter({
  // mode: cfg.development?'history':'hash',
  // base: cfg.development?'/':'/simba-chart',
  routes: [{
      path: '/',
      component: PageSearch
    },{
      path: '/search',
      component: PageSearch
    },{
      path: '/chart',
      component: PageChart
    },{
      path: '/settings',
      component: PageSettings
    }]
});




