<template>
  <div @drop="drop($event)" @dragenter.prevent.stop @dragover.prevent.stop>
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

  methods: {
    drop(event) {
      const targetId = event.dataTransfer.getData("id");
      const issue = document.getElementById(targetId);
      issue.style.display = "flex";
    },
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
  padding-top: 80px;
}
</style>
