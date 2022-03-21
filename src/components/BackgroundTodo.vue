<template>
  <div class="mainDiv">
    <div class="summary" draggable="true">{{ todoitem.length }} 이슈</div>
    <div class="subDiv" v-for="el in todoitem" :key="el">
      <content-box v-bind:element="el"></content-box>
    </div>
    <quick-add
      v-if="quickadd"
      v-bind:todoitem="todoitem"
      v-bind:status="status"
      @close-modal="closeQuickAdd"
    ></quick-add>
    <div class="add-box" @click="openQuickAdd" v-else>+ 이슈 빠르게 만들기</div>
  </div>
</template>

<script>
import ContentBox from "./ContentBox";
import QuickAdd from "./QuickAdd.vue";

export default {
  name: "Background-Box",
  data: function () {
    return {
      modalopen: false,
      quickadd: false,
    };
  },

  props: { todoitem: Array, status: String },

  components: {
    "content-box": ContentBox,
    "quick-add": QuickAdd,
  },

  methods: {
    //빠른추가 여는 함수
    openQuickAdd() {
      this.quickadd = true;
    },

    //빠른 추가 닫는 함수
    closeQuickAdd() {
      if (this.quickadd === true) {
        this.quickadd = false;
      }
    },
  },
};
</script>

<style scoped>
.mainDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f6f6;
  width: 280px;
  min-height: 750px;
  border: 1px soild #bbbbbb;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 10px -5px,
    rgba(0, 0, 0, 0.6) 0px 10px 10px -15px;
  border-radius: 5px;
  padding: 10px;
  gap: 5px;
}

.subDiv {
  display: flex;
}

.summary {
  display: flex;
  justify-content: left;
  padding-left: 6px;
  margin-bottom: 10px;
  width: 100%;
  font-size: 13px;
  color: #646464;
}

.add-box {
  padding: 10px;
  font-size: 13px;
  color: #646464;
  width: 260px;
  display: flex;
  justify-content: left;
  border-radius: 5px;
  cursor: pointer;
}

.add-box:hover {
  background-color: #64646420;
}
</style>
