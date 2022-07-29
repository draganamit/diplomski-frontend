<template>
  <div id="app">
    <TitleView></TitleView>
    <div :class="$route.path == '/' ? 'content-main' : 'content'">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src

import TitleView from "./components/Header/TitleContainer.vue";
export default {
  components: {
    TitleView,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
body {
  margin: 0;
}

input {
  box-sizing: border-box;
}

.message {
  font-size: 1rem !important;
}
</style>

<style scoped>
.content {
  height: calc(100vh - 4.5rem);
  width: 100vw;
  overflow-x: hidden;
  background: rgb(244 244 244 / 63%);
}
.content-main {
  height: calc(100vh - 4.5rem);
  width: 100vw;
  overflow-x: hidden;
  background-image: url("./assets/slika.jpg");
  background-size: contain;
}
</style>
