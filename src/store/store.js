/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
// import Cookies from 'js-cookie';
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex);


export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  plugins: [createPersistedState(
    {
      state: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    }
  )],
  strict: process.env.NODE_ENV !== 'production'
})
