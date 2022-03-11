<template>
  <div class="itemboxDiv">
    <div class="itemBox" @click="openModal">{{ todoitem[0].title }}</div>
    <button class="deleteBtn">삭제</button>
    <content-modal v-if="modalopen" @close-modal="closeModal"></content-modal>
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
  props: { todoitem: Array },
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
  },
};
</script>
<style scoped>
.itemboxDiv {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: none;
  gap: 7px;
}

.itemBox {
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
