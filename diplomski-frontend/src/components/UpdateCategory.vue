<template>
  <ValidationObserver ref="observer">
    <div>
      <div class="cls">
        <div @click="closeWindowUpdate()">X</div>
      </div>
      <div class="update">
        <div class="form-container">
          <form>
            <div class="input-div">
              <div class="text-div">Naziv:</div>
              <div class="input">
                <ValidationProvider
                  name="name"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input type="text" v-model="model.name" />
                  <span v-if="errors.length && showError" class="error">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
              </div>
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
  </ValidationObserver>
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
      showError: false,
    };
  },
  methods: {
    ...mapActions(["addCategory", "getCategoryById", "updateCategory"]),
    closeWindowUpdate() {
      this.$emit("closed");
    },
    async addCategories() {
      const valid = await this.$refs.observer.validate();
      this.showError = true;
      if (!valid) return;

      await this.addCategory(this.model);
      this.$emit("save");
    },
    async updateCategories() {
      const valid = await this.$refs.observer.validate();
      this.showError = true;
      if (!valid) return;

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
  font-family: cursive;
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
  font-family: cursive;
  font-weight: bold;
  font-style: italic;
}
button:hover {
  background-color: rgb(16 161 30);
}
.cls > div:hover {
  background: #c40404;
}
.input {
  text-align: left;
  position: relative;
  width: 100%;
}
.error {
  margin: auto;
  text-align: left;
  color: red;
  background: transparent;
  font-size: 1rem;
}
.input-div {
  height: 2rem;
}
input:focus {
  border: 1px solid grey;
}
</style>
