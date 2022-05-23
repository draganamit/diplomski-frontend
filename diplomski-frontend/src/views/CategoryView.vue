<template>
  <div class="container-category">
    <div v-if="update" class="update-category">
      <UpdateCategory
        @closed="closeWindow()"
        :textButton="idCategory ? 'Sačuvaj izmjene' : 'Dodaj kategoriju'"
      ></UpdateCategory>
    </div>
    <div class="add">
      <div>Kategorije</div>
      <div class="button-add">
        <button @click="openUpdateCategory()">Dodaj kategoriju</button>
      </div>
    </div>
    <div class="all-category">
      <CategoryBase
        v-for="(obj, key) in categories"
        :key="key"
        @open="openUpdateCategory(obj.id)"
        :nameCategory="obj.name"
      ></CategoryBase>
    </div>
    <div v-if="update" class="mask" @click.self="closeWindow()"></div>
  </div>
</template>

<script>
import UpdateCategory from "@/components/UpdateCategory.vue";
import CategoryBase from "@/components/CategoryBase.vue";

export default {
  components: {
    CategoryBase,
    UpdateCategory,
  },
  data() {
    return {
      update: false,
      idCategory: null,
      categories: [
        {
          id: 1,
          name: "Kategorija1",
        },
        {
          id: 2,
          name: "Kategorija2",
        },
        {
          id: 3,
          name: "Kategorija3",
        },
        {
          id: 4,
          name: "Kategorija4",
        },
        {
          id: 5,
          name: "Kategorija5",
        },
        {
          id: 6,
          name: "Kategorija6",
        },
      ],
    };
  },
  methods: {
    openUpdateCategory(id = null) {
      this.idCategory = id;
      this.update = true;
    },
    closeWindow() {
      this.update = false;
    },
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
.update-category {
  position: absolute;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid black;
  border-radius: 0.5rem;
  width: 50%;
  margin: auto;
  z-index: 2;
}
.mask {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
}
</style>
