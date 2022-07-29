<template>
  <div class="home">
    <div class="image" v-if="Object.keys($route.query).length === 0">
      <img src="../assets/slika.jpg" />
    </div>
    <MainContent></MainContent>
  </div>
</template>

<script>
// @ is an alias to /src
import MainContent from "../components/HomeContainer.vue";
export default {
  name: "HomeView",
  components: {
    MainContent,
  },
};
</script>
<style scoped>
.image {
  width: 100%;
  display: none;
}
.image > img {
  width: 100%;
  height: 42rem;
}
.home {
  padding-bottom: 2rem;
}
</style>
