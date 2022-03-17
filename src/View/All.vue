<template>
  <div class="all">
    <todo-view></todo-view>
    <progress-view></progress-view>
    <done-view></done-view>
  </div>
</template>

<script>
import Todo from "./Todo.vue";
import Progress from "./Progress.vue";
import Done from "./Done.vue";

export default {
  name: "All-View",

  components: {
    "todo-view": Todo,
    "progress-view": Progress,
    "done-view": Done,
  },
};
</script>

<style scoped>
.all {
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 25px;
  margin-bottom: 15px;
}
</style>
