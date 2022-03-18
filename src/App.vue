<template>
  <div>
    <header-global></header-global>
    <router-view class="space"></router-view>
    <footer-global></footer-global>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/SimpleFooter.vue";

export default {
  name: "App",

  components: {
    "header-global": Header,
    "footer-global": Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.space {
  margin-top: 80px;
}
</style>
