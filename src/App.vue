<template>
  <div>
    <header-global></header-global>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",

  components: {
    "header-global": Header,
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
