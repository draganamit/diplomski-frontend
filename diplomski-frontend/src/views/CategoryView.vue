<template>
  <div class="container-category">
    <div class="add">
      <div>Kategorije</div>
      <div class="button-add">
        <button>Dodaj kategoriju</button>
      </div>
    </div>
    <div class="all-category">
      <CategoryBase v-for="n in 10" :key="n"></CategoryBase>
    </div>
  </div>
</template>

<script>
import CategoryBase from "@/components/CategoryBase.vue";
export default {
  components: {
    CategoryBase,
  },
};
</script>

<style scoped>
.container-category {
  display: flex;
  padding: 3rem 20rem;
  flex-direction: column;
}
.add {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 1rem;
}
.button-add {
  display: flex;
  margin-left: auto;
}
button {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: 1px solid gray;
  padding: 1rem 1rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  width: 10rem;
  border-radius: 0.5rem;
}
.all-category {
  margin: 0.5rem 1rem;
  padding: 0.5rem;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
}
</style>
