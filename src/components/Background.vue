<template>
  <div class="mainDiv">
    <content-box v-bind:todoitem="todoitem"></content-box>
  </div>
</template>

<script>
import ContentBox from "./ContentBox";

export default {
  name: "Background-Box",
  props: { todoitem: Array },
  components: {
    "content-box": ContentBox,
  },
};
</script>

<style scoped>
.mainDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 200px;
  height: 200px;
  border: 1px soild #bbbbbb;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 10px 10px -15px,
    rgba(0, 0, 0, 0.6) 0px 10px 10px -15px;
  border-radius: 10px;
  padding: 20px;
}
</style>
