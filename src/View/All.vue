<template>
  <div class="all">
    <todo-view
      v-bind:todoitem="todoitem"
      @add-data="addData"
      @edit-data="editData"
      @delete-data="deleteData"
    ></todo-view>
    <progress-view
      v-bind:todoitem="todoitem"
      @add-data="addData"
      @edit-data="editData"
      @delete-data="deleteData"
    ></progress-view>
    <done-view
      v-bind:todoitem="todoitem"
      @add-data="addData"
      @edit-data="editData"
      @delete-data="deleteData"
    ></done-view>
  </div>
</template>

<script>
import Todo from "./Todo.vue";
import Progress from "./Progress.vue";
import Done from "./Done.vue";

export default {
  name: "All-View",
  props: { todoitem: Array },
  components: {
    "todo-view": Todo,
    "progress-view": Progress,
    "done-view": Done,
  },
  methods: {
    // openModal() {
    //   this.modalopen = true;
    // },
    // closeModal() {
    //   this.modalopen = false;
    // },
    addData(data) {
      this.$emit("add-data", data);
    },
    editData(data) {
      this.$emit("edit-data", data);
    },
    deleteData(data) {
      this.$emit("delete-data", data);
    },
    // todofilter() {
    //   let filtered = this.todoitem.filter((el) => {
    //     return el.status === "ToDo";
    //   });
    //   return filtered;
    // },
  },
};
</script>

<style scoped>
.all {
  /* width: 300px; */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
</style>
