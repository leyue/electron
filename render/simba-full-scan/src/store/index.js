/**
 * Created by hasee on 2017/1/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
  fullScan: {
    rootDir: ''
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
