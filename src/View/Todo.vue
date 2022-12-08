<template>
  <div class="to-do">
    <div class="title">
      <div>To Do List</div>
      <div class="add-btn" @click="openModal">이슈만들기</div>
    </div>
    <background-box
      v-bind:todoitem="todofilter()"
      v-bind:status="status"
      @edit-data="editData"
      @delete-data="deleteData"
      @add-data="addData"
    ></background-box>
    <add-modal
      v-if="modalopen"
      @close-modal="closeModal"
      @add-data="addData"
    ></add-modal>
  </div>
</template>

<script>
import BackGround from "../components/BackgroundTodo";
import AddModal from "../components/AddModal.vue";

export default {
  name: "To-Do",
  data: function () {
    return {
      modalopen: false,
      status: "ToDo",
    };
  },

  props: { todoitem: Array },

  computed: {
    issues() {
      //this.$store로 호출
      return this.$store.state.issues;
    },
  },

  components: {
    "add-modal": AddModal,
    "background-box": BackGround,
  },

  methods: {
    //모달창 여는 함수
    openModal() {
      this.modalopen = true;
    },

    //모달창 닫는 함수
    closeModal() {
      this.modalopen = false;
    },

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

    //현재 상태에 해당하는 데이터 추출
    todofilter() {
      let filtered = this.issues.filter((el) => {
        return el.status === "ToDo";
      });
      // let filtered = this.todoitem.filter((el) => {
      //   return el.status === "ToDo";
      // });
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
  margin-bottom: 20px;
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

.add-btn:active {
  box-shadow: rgba(0, 0, 0, 0.2) 0px -1px 0px 0px;
  background-color: #383838;
}
</style>
