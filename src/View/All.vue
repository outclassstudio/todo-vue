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
    //데이터 추가 함수
    addData(data) {
      this.$emit("add-data", data);
    },

    //데이터 수정 함수
    editData(data) {
      this.$emit("edit-data", data);
    },

    //데이터 삭제 함수
    deleteData(data) {
      this.$emit("delete-data", data);
    },
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
