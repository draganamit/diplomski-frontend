<template>
  <div>
    <div class="cls">
      <div @click="closeWindowUpdate()">X</div>
    </div>
    <div class="update">
      <div class="form-container">
        <form>
          <div>
            <div class="text-div">Naziv:</div>
            <input type="text" v-model="model.name" />
          </div>

          <button
            type="button"
            @click="categoryId ? updateCategories() : addCategories()"
            style="width: 100%; cursor: pointer"
          >
            {{ textButton }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    textButton: {
      type: String,
      default: "",
    },
    categoryId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      model: {
        name: "",
        id: null,
      },
    };
  },
  methods: {
    ...mapActions(["addCategory", "getCategoryById", "updateCategory"]),
    closeWindowUpdate() {
      this.$emit("closed");
    },
    async addCategories() {
      await this.addCategory(this.model);
      this.$emit("save");
    },
    async updateCategories() {
      await this.updateCategory(this.model);
      this.$emit("save");
    },
  },
  async created() {
    if (this.categoryId) {
      const response = await this.getCategoryById(this.categoryId);
      this.model.name = response.name;
      this.model.id = response.id;
    }
  },
};
</script>

<style scoped>
.cls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.cls > div {
  color: white;
  border: 1px solid white;
  background: red;
  cursor: pointer;
  border-radius: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  padding: 0.3rem 0;
}
form > div {
  display: flex;
  padding: 1rem 2rem;
  font-size: 1.2rem;
}
.update {
  padding-top: 2rem;
}
.text-div {
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: left;
}
input {
  width: 100%;
  display: flex;
  background-color: rgb(213, 210, 210);
  border-color: transparent;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  outline: none;
  font-size: 1rem;
}
button {
  background-color: rgb(19 187 35);
  color: rgb(241, 241, 226);
  border: transparent;
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  margin-top: 2rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
