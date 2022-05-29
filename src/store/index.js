// Import Section
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

// Modules
import { userStore } from "./modules/user";
import { insightsStore } from "./modules/insights";
import { mapStore } from "./modules/map";
import { estateStore } from "./modules/estate";
import { searchStore } from "./modules/search";
import { areaStore } from "./modules/area";
import { searchQueryStore } from "./modules/searchQuery";
import { queryBuilderStore } from "./modules/queryBuilder";

// Main Section
Vue.use(Vuex);

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
      user: userStore,
      insights: insightsStore,
      map: mapStore,
      estate: estateStore,
      search: searchStore,
      area: areaStore,
      searchQuery: searchQueryStore,
      searchOption: queryBuilderStore
    },

    plugins: [
      createPersistedState({
        // enable presisted state for users only
        paths: ["user.data"]
      })
    ],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });

  return Store;
}
