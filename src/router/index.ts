import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/counter",
    component: () => import("../views/Counter.vue"),
  },
  {
    path: "/todolist",
    component: () => import("../views/TodoList.vue"),
  },
  {
    path: "/",
    redirect: "/counter",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
