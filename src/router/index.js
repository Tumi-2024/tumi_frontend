import Vue from "vue";
import VueRouter from "vue-router";
import { Cookies } from "quasar";

import routes from "./routes";
import Vuex from "../store";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach((to, from, next) => {
    const value = Cookies.get("tumi");
    console.log(Vuex, from);

    if (to.name === "signIn" || to.name === "signUp") {
      next();
    } else if (!value) {
      next("/sign-in");
    } else {
      next();
    }
    //  else if (!value && to.name === 'signIn') {
    //   next('/sign-in')
    // } else if (!value && to.name === 'signUp') {
    //   next('/sign-up')
    // } else {
    //   next()
    // }
  });

  return Router;
}
