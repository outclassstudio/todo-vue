<template>
  <div class="header">
    <div class="wrapper">
      <div>
        <router-link to="/" :class="{ active: $route.path === '/' }"
          >All</router-link
        >
      </div>
      <div>
        <router-link to="/todo" :class="{ active: $route.path === '/todo' }"
          >Todo</router-link
        >
      </div>
      <div>
        <router-link
          to="/progress"
          :class="{ active: $route.path === '/progress' }"
          >Progress</router-link
        >
      </div>
      <div>
        <router-link to="/done" :class="{ active: $route.path === '/done' }"
          >Done</router-link
        >
      </div>
      <div class="add-btn" @click="openModal">+</div>
      <add-modal
        v-if="modalopen"
        @close-modal="closeModal"
        @add-data="addData"
      ></add-modal>
    </div>
  </div>
</template>

<script>
import AddModal from "../components/AddModal.vue";

export default {
  name: "header-global",
  data: function () {
    return {
      modalopen: false,
    };
  },
  components: {
    "add-modal": AddModal,
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
  },
};
</script>

<style scoped>
.header {
  background-color: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 30px;
  position: fixed;
  left: 0;
  top: 0;
  align-items: center;
  padding: 10px;
  margin-bottom: 25px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 4px 0px;
}

a {
  text-decoration: none;
  color: #3b3b3b;
  margin: 7px;
}

a:hover {
  text-decoration: underline;
}

.logo {
  width: 50px;
}

.wrapper {
  display: flex;
  align-items: center;
}

.active {
  color: red;
}

.add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  font-size: 20px;
  /* border: 1px soild #797979; */
  border-radius: 2px;
  background-color: #444444;
  color: #ffffff;
  cursor: pointer;
  margin: 7px;
}

.add-btn:hover {
  background-color: #b10000;
}

.add-btn:active {
  background-color: #8a0000;
}
</style>
