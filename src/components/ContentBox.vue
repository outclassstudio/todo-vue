<template>
  <div class="itemboxDiv">
    <div class="itemBox" @click="openModal">
      <div class="issue-wrapper">
        <div class="issue-title">{{ element.title }}</div>
        <div class="sub-content">
          <div class="date">
            수정날짜 : {{ element.updatedDate.split(" ")[0] }}
          </div>
          <div class="date" :class="[element.status]">
            <div class="dot-wrap">
              <img
                class="dot"
                src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Location_dot_black.svg"
              />
            </div>
            {{ element.status }}
          </div>
        </div>
      </div>
      <div
        class="deleteBtn"
        @click="deleteData"
        v-if="element.status !== 'Done'"
      >
        삭제
      </div>
    </div>
    <content-modal
      v-if="modalopen"
      v-bind:element="element"
      @close-modal="closeModal"
      @edit-data="editData"
    ></content-modal>
  </div>
</template>

<script>
import ContentModal from "./ContentModal.vue";

export default {
  name: "Content-Box",
  data: function () {
    return {
      modalopen: false,
    };
  },
  props: { element: Object },
  components: {
    "content-modal": ContentModal,
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

    //데이터 수정 함수
    editData(data) {
      this.$emit("edit-data", data);
    },

    //데이터 삭제 함수
    deleteData() {
      // this.$emit("delete-data", this.element.id);
      this.$store.commit("deleteData", this.element.id);
    },
  },
};
</script>

<style scoped>
.itemboxDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: none;
  gap: 7px;
  /* overflow-x: hidden; */
}

.itemBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  width: 260px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  font-size: 14px;
  color: #505050;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 0px 0px;
  gap: 10px;
}

.itemBox:hover {
  background-color: #f0f0f0;
}

.issue-wrapper {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 10px;
}

.issue-title {
  max-width: 200px;
  word-break: break-all;
}

.deleteBtn {
  width: 22px;
  height: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 11px;
  border: 1px soild #797979;
  border-radius: 5px;
  background-color: #a0a0a0;
  color: #ffffff;
  cursor: pointer;
}

.deleteBtn:hover {
  background-color: #b10000;
}

.sub-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date {
  display: flex;
  align-items: center;
  font-size: 11px;
  color: #999999;
  font-weight: 100;
  gap: 4px;
  padding-left: 1px;
}

.ToDo {
  color: #f95335;
  margin-top: 1px;
}

.Progress {
  color: #fcaf38;
  margin-top: 1px;
}

.Done {
  color: #50a3a4;
  margin-top: 1px;
}

.dot-wrap {
  display: flex;
  align-items: center;
}

.dot {
  width: 4px;
}
</style>
