<template>
  <div class="container-category">
    <DeleteModal
      v-if="remove"
      @close="closeWindow()"
      @remove="removeCategory()"
      :textQuestion="'Da li ste sugurni da želite da obrišete kategoriju?'"
    ></DeleteModal>
    <div v-if="update" class="update-category">
      <UpdateCategory
        @closed="closeWindow()"
        @save="closeGetCategories()"
        :textButton="idCategory ? 'Sačuvaj izmjene' : 'Dodaj kategoriju'"
        :categoryId="idCategory"
      ></UpdateCategory>
    </div>
    <div class="add">
      <!-- <div>Kategorije</div> -->
      <div class="button-add">
        <button @click="openUpdateCategory()">Dodaj kategoriju</button>
      </div>
    </div>
    <div class="all-category">
      <CategoryBase
        v-for="(category, key) in categories"
        :key="key"
        @open="openUpdateCategory(category.id)"
        :nameCategory="category.name"
        @remove="openRemoveCategory(category.id)"
      ></CategoryBase>
    </div>
    <div v-if="update || remove" class="mask" @click.self="closeWindow()"></div>
  </div>
</template>

<script>
import UpdateCategory from "@/components/UpdateCategory.vue";
import CategoryBase from "@/components/CategoryBase.vue";
import DeleteModal from "@/components/DeleteModal.vue";

import { mapActions, mapState } from "vuex";

export default {
  components: {
    CategoryBase,
    UpdateCategory,
    DeleteModal,
  },
  data() {
    return {
      update: false,
      idCategory: null,
      remove: false,
    };
  },
  methods: {
    ...mapActions(["getAllCategories", "deleteCategory"]),
    openUpdateCategory(id = null) {
      this.idCategory = id;
      this.update = true;
    },
    closeWindow() {
      this.update = false;
      this.remove = false;
    },
    async closeGetCategories() {
      this.update = false;
      await this.getAllCategories();
    },
    openRemoveCategory(id) {
      this.idCategory = id;
      this.remove = true;
    },
    async removeCategory() {
      try {
        await this.deleteCategory(this.idCategory);
        this.remove = false;
        await this.getAllCategories();
      } catch (error) {
        console.log(error.response);
      }
    },
  },
  async created() {
    await this.getAllCategories();
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
    }),
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
  border: none;
  padding: 1rem 1rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  width: 10rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
button:hover {
  transform: scale(1.01);
  background-color: rgb(193 73 28);
}
.all-category {
  margin: 0.5rem 1rem;
  padding: 0.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
}
.update-category {
  position: absolute;
  left: 0;
  right: 0;
  background-color: white;
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
