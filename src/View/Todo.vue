<template>
  <div class="to-do">
    <header-global></header-global>
    <div class="title">
      <div>To-Do Items</div>
      <button @click="openModal">추가</button>
    </div>
    <background-box v-bind:todoitem="todoitem"></background-box>
    <add-modal v-if="modalopen" @close-modal="closeModal"></add-modal>
    <!-- <div>{{ todoitem[0].title }}</div> -->
  </div>
</template>

<script>
import BackGround from "../components/Background";
import AddModal from "../components/AddModal.vue";
import Header from "../components/Header.vue";

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
    "header-global": Header,
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

<style>
.to-do {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  width: 240px;
  height: 25px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px 10px 0px;
}
</style>
