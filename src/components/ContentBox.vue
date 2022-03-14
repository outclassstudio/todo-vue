<template>
  <div class="itemboxDiv">
    <div class="itemBox" @click="openModal">
      <div class="issue-title">{{ element.title }}</div>
      <div class="date">수정날짜 : {{ element.updatedDate.split(" ")[0] }}</div>
    </div>
    <button
      class="deleteBtn"
      @click="deleteData"
      v-if="element.status !== 'Done'"
    >
      삭제
    </button>
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
    openModal() {
      this.modalopen = true;
    },
    closeModal() {
      this.modalopen = false;
    },
    editData(data) {
      this.$emit("edit-data", data);
    },
    deleteData() {
      this.$emit("delete-data", this.element.id);
    },
  },
};
</script>
<style scoped>
.itemboxDiv {
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: none;
  gap: 7px;
}

.itemBox {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  min-height: 50px;
  width: 230px;
  flex: 3 0 auto;
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

.issue-title {
  word-wrap: break-word;
}

.date {
  font-size: 11px;
  color: #999999;
  font-weight: 100;
}

.deleteBtn {
  flex: 1 0 auto;
  padding: 5px;
  /* border-radius: 5px; */
  /* border: none; */
  /* height: 100%; */
}
</style>
