/**
 * Created by hasee on 2017/1/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
  DBTrd: {
    enable: false,
    projects: []
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
