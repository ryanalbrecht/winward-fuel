import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import settings from './settings'

// plugins
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

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
      settings
    },

    plugins: [vuexLocal.plugin],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  if (process.env.DEV) {
    window.$dev_store = Store
  }

  return Store
}
