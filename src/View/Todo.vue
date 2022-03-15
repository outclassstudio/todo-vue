<template>
  <div class="to-do">
    <div class="title">
      <div>To Do List</div>
      <div class="add-btn" @click="openModal">이슈만들기</div>
    </div>
    <background-box
      v-bind:todoitem="todofilter()"
      @edit-data="editData"
      @delete-data="deleteData"
    ></background-box>
    <add-modal
      v-if="modalopen"
      v-bind:todoitem="todoitem"
      @close-modal="closeModal"
      @add-data="addData"
    ></add-modal>
  </div>
</template>

<script>
import BackGround from "../components/Background";
import AddModal from "../components/AddModal.vue";

export default {
  name: "To-Do",
  data: function () {
    return {
      modalopen: false,
    };
  },
  props: { todoitem: Array },
  components: {
    "add-modal": AddModal,
    "background-box": BackGround,
  },
  methods: {
    openModal() {
      this.modalopen = true;
    },
    closeModal() {
      this.modalopen = false;
    },
    addData(data) {
      this.$emit("add-data", data);
    },
    editData(data) {
      this.$emit("edit-data", data);
    },
    deleteData(data) {
      this.$emit("delete-data", data);
    },
    todofilter() {
      let filtered = this.todoitem.filter((el) => {
        return el.status === "ToDo";
      });
      return filtered;
    },
  },
};
</script>

<style scoped>
.to-do {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  width: 300px;
  height: 25px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px 10px 0px;
}

.add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 12px;
  border: 1px soild #797979;
  /* box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 5px -1px; */
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 0px 0px;
  border-radius: 5px;
  background-color: #8a8a8a;
  color: #ffffff;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #4b4b4b;
}
</style>
