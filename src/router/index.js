import Vue from "vue";
import VueRouter from "vue-router";
import Pokedex from "../views/Pokedex.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   // component: () =>
  //   //   import(/* webpackChunkName: "about" */ "../views/About.vue")
  // },
  {
    path: "/",
    name: "pokedex",

    component: Pokedex
  },
  {
    path: "/description/:pokemonName",
    name: "description",
    props: true,
    component: () => import("../views/Description.vue")
    //ruta (path): el v-bind de pokemonName hace referencia al pokemonName de Description.vue
  },
  {
    path: "/type/:typeName",
    name: "type",
    props: true,
    component: () => import("../views/VsTypes.vue")
  },
  {
    path: "/login",
    name: "login",
    props: true,
    component: () => import("../views/Login.vue")
  },
  {
    path: "/chat",
    name: "chat",
    props: true,
    component: () => import("../views/Chat.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
