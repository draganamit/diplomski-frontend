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
          <div>
            <div class="text-div">Kategorija:</div>
            <select name="category" class="list" v-model="model.categoryId">
              <option
                v-for="(category, key) in categories"
                :key="key"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <div class="text-div">Opis:</div>
            <input type="text" v-model="model.description" />
          </div>
          <div>
            <div class="text-div">Stanje:</div>
            <input type="number" v-model.number="model.state" />
          </div>
          <div>
            <div class="text-div">Cijena:</div>
            <input type="number" v-model.number="model.price" />
          </div>
          <div>
            <div class="text-div">Tagovi:</div>
            <input type="text" />
          </div>
          <div class="tags">
            <div class="tag">sok</div>
          </div>
          <button
            style="width: 100%"
            type="button"
            @click="model.id ? updateProducts() : addProducts()"
          >
            {{ textButton }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    textButton: {
      type: String,
      default: "",
    },
    idProduct: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      model: {
        id: null,
        name: "",
        description: "",
        categoryId: null,
        state: null,
        price: null,
      },
    };
  },

  async created() {
    if (this.idProduct) {
      const response = await this.getProductById(this.idProduct);

      this.model.categoryId = response.category.id;
      this.model.name = response.name;
      this.model.description = response.description;
      this.model.state = response.state;
      this.model.price = response.price;
      this.model.id = this.idProduct;
    }

    await this.getAllCategories();
  },
  methods: {
    ...mapActions([
      "getAllCategories",
      "addProduct",
      "updateProduct",
      "getProductById",
    ]),

    closeWindowUpdate() {
      this.$emit("closed");
    },
    async addProducts() {
      await this.addProduct(this.model);
      this.$emit("save");
    },
    async updateProducts() {
      await this.updateProduct(this.model);
      this.$emit("save");
    },
  },
  computed: {
    ...mapState({
      categories: (state) => state.categories.categories,
      user: (state) => state.users.user,
    }),
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
  padding: 1rem;
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
.list {
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

  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.tag {
  padding: 0.5rem 1rem;
  border: 1px solid #e1e8ee;
  border-radius: 10px;
  margin-left: 0.5rem;
  background-color: rgb(213, 210, 210);
  font-size: 1rem;
}
.tags {
  display: flex;
  align-content: center;
}
</style>
