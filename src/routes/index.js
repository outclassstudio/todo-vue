import { createRouter, createWebHistory } from "vue-router";
import Todo from "../View/Todo.vue";
import Progress from "../View/Progress.vue";
import Done from "../View/Done.vue";
import All from "../View/All.vue";
import Page from "../View/Page.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: All },
    { path: "/todo", component: Todo },
    { path: "/progress", component: Progress },
    { path: "/done", component: Done },
    { path: "/page/:id", name: "page", component: Page, props: true },
  ],
});
export default router;
