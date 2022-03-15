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
    </div>
  </div>
</template>

<script>
export default {
  name: "header-global",
  data: function () {
    return {
      pathAll: false,
      pathTodo: false,
      pathProgress: false,
      pathDone: false,
    };
  },
  // created() {
  //   console.log("안되냐");
  //   this.route = this.$route.path;
  // },
};
</script>

<style scoped>
.header {
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  padding: 10px;
  margin-bottom: 25px;
  /* justify-content: center; */
  /* height: 500px; */
}

a {
  text-decoration: none;
  color: white;
  margin: 5px;
}

.logo {
  width: 50px;
}

.wrapper {
  display: flex;
}

.active {
  color: red;
}
</style>
