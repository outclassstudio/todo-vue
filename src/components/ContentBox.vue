<template>
  <div class="itemboxDiv">
    <div class="itemBox" @click="openModal">{{ element.title }}</div>
    <button class="deleteBtn">삭제</button>
    <content-modal
      v-if="modalopen"
      @close-modal="closeModal"
      v-bind:element="element"
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
  width: 100%;
  flex: 3 0 auto;
  padding: 5px;
  background-color: #8a8a8a;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.deleteBtn {
  flex: 1 0 auto;
  padding: 5px;
  /* border-radius: 5px; */
  /* border: none; */
  /* height: 100%; */
}
</style>
