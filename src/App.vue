<template>
  <div>
    <router-view v-bind:todoitem="item"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      item: [
        {
          id: 0,
          title: "임시",
          contents: {
            todo: "투두투두",
            progress: "",
            done: "",
          },
          status: "todo",
          updatedDate: "2022-03-11",
        },
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
