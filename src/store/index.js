import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import settings from './settings'
import cars from './cars'
import app from './app'
import race from './race'

// plugins
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      settings,
      cars,
      app,
      race
    },

    plugins: [
      createPersistedState({
        key: 'vuex_store',
        storage: process.env.NODE_ENV === 'development' ? window.sessionStorage : window.localStorage,
        paths: [
          'Settings'
        ]
      }),

    ],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  if (process.env.DEV) {
    window.$dev_store = Store
  }

  return Store
}
