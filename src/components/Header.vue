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
  align-items: center;
  padding: 10px;
  margin-bottom: 25px;
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
}

.active {
  color: red;
}
</style>
