<template>
  <div class="home">
    <div class="image" v-if="Object.keys($route.query).length === 0">
       <img src="../assets/slika.jpg">
    </div>
    <MainContent></MainContent>
  </div>
</template>

<script>
// @ is an alias to /src
import MainContent from "../components/MainContent.vue";
export default {
  name: 'HomeView',
  components: {
    MainContent,
}
}
</script>
<style scoped>
.image
{
  width: 100%;
}
.image > img
{
  width: 100%;
  height: 42rem;
}
</style>
