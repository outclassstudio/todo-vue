<template>
  <div class="mainDiv">
    <div class="summary">{{ todoitem.length }} 이슈</div>
    <div class="subDiv" v-for="el in todoitem" :key="el">
      <content-box
        v-bind:element="el"
        @add-data="addData"
        @edit-data="editData"
        @delete-data="deleteData"
      ></content-box>
    </div>
    <!-- <div class="add-box">+ 이슈만들기</div> -->
    <!-- <div class="add-box">{{ $route }}</div> -->
  </div>
</template>

<script>
import ContentBox from "./ContentBox";

export default {
  name: "Background-Box",
  data: function () {
    return {
      topTitle: { ToDo: "할 일", Progress: "진행 중", Done: "완료" },
    };
  },
  props: { todoitem: Array },
  components: {
    "content-box": ContentBox,
  },
  methods: {
    addData(data) {
      this.$emit("add-data", data);
    },
    editData(data) {
      this.$emit("edit-data", data);
    },
    deleteData(data) {
      this.$emit("delete-data", data);
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
  width: 300px;
  min-height: 700px;
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
  width: 280px;
  display: flex;
  justify-content: left;
  border-radius: 5px;
  cursor: pointer;
}

.add-box:hover {
  background-color: #64646420;
}
</style>
