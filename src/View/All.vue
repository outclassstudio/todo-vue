<template>
  <div class="main-container">
    <div class="btn-wrapper">
      <div class="add btn" @click="openModal">이슈만들기</div>
      <div class="clear btn" @click="clearAll">전체삭제</div>
    </div>
    <div class="all">
      <todo-view></todo-view>
      <progress-view></progress-view>
      <done-view></done-view>
    </div>
    <add-modal
      v-if="modalopen"
      @close-modal="closeModal"
      @add-data="addData"
    ></add-modal>
  </div>
</template>

<script>
import Todo from "./Todo.vue";
import Progress from "./Progress.vue";
import Done from "./Done.vue";
import AddModal from "../components/AddModal.vue";
import Swal from "sweetalert2";

export default {
  name: "All-View",

  components: {
    "todo-view": Todo,
    "progress-view": Progress,
    "done-view": Done,
    "add-modal": AddModal,
  },

  data: function () {
    return {
      modalopen: false,
    };
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

    clearAll() {
      Swal.fire({
        icon: "warning",
        title: "진짜 삭제하시려구요?",
        text: "한번 삭제하시면 복구할 수 없어요",
        confirmButtonText: "네!",
        showDenyButton: true,
        denyButtonText: "아니용",
      }).then((res) => {
        if (res.isConfirmed) {
          this.$store.commit("clearData");
        }
      });
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.all {
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 25px;
}
.btn-wrapper {
  display: flex;
  gap: 5px;
  margin-bottom: 12px;
}
.btn {
  width: 90px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border: 1px soild #797979;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 0px 0px;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
}
.clear {
  background-color: #be0505;
}
.clear:hover {
  background-color: #9e0000;
}
.clear:active {
  box-shadow: rgba(0, 0, 0, 0.2) 0px -1px 0px 0px;
  background-color: #7b0000;
}
.add {
  background-color: #8a8a8a;
}
.add:hover {
  background-color: #4b4b4b;
}
.add:active {
  box-shadow: rgba(0, 0, 0, 0.2) 0px -1px 0px 0px;
  background-color: #383838;
}
</style>
