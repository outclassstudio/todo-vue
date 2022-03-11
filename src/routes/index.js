import { createRouter, createWebHistory } from "vue-router";
import Todo from "../View/Todo.vue";
import Progress from "../View/Progress.vue";
import Done from "../View/Done.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Todo },
    { path: "/progress", component: Progress },
    { path: "/done", component: Done },
  ],
});
export default router;
