<template>
  <div class="header">
    <div class="wrapper">
      <div>
        <router-link to="/">Todo</router-link>
      </div>
      <div>
        <router-link to="/progress">Progress</router-link>
      </div>
      <div>
        <router-link to="/done">Done</router-link>
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
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
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
</style>
