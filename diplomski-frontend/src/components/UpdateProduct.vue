<template>
  <ValidationObserver ref="observer" class="v-observer">
    <div class="cls">
      <div @click="closeWindowUpdate()">X</div>
    </div>
    <div class="update">
      <form class="product-form">
        <div class="form-container">
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
          <div class="input-div">
            <div class="text-div">Kategorija:</div>
            <div class="input">
              <ValidationProvider
                name="category"
                rules="required"
                v-slot="{ errors }"
              >
                <select name="category" class="list" v-model="model.categoryId">
                  <option
                    v-for="(category, key) in categories"
                    :key="key"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
                <span v-if="errors.length && showError" class="error">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="input-div">
            <div class="text-div">Opis:</div>
            <div class="input">
              <ValidationProvider
                name="description"
                rules="required"
                v-slot="{ errors }"
              >
                <input type="text" v-model="model.description" />
                <span v-if="errors.length && showError" class="error">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="input-div">
            <div class="text-div">Stanje:</div>
            <div class="input">
              <ValidationProvider
                name="state"
                rules="required"
                v-slot="{ errors }"
              >
                <input type="number" v-model.number="model.state" />
                <span v-if="errors.length && showError" class="error">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="input-div">
            <div class="text-div">Cijena:</div>
            <div class="input">
              <ValidationProvider
                name="price"
                rules="required"
                v-slot="{ errors }"
              >
                <input type="number" v-model.number="model.price" />
                <span v-if="errors.length && showError" class="error">{{
                  errors[0]
                }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="input-div">
            <div class="text-div">Tagovi:</div>
            <div class="addTag">
              <input type="text" v-model="tag" @keydown.enter="addTags()" />
              <button type="button" class="button-add-tag" @click="addTags()">
                Dodaj
              </button>
            </div>
          </div>

          <div class="tags" v-if="model.tags.length">
            <div class="tag" v-for="(tag, key) in model.tags" :key="key">
              {{ tag }}
              <button type="button" class="delete-tag" @click="deleteTag(key)">
                x
              </button>
            </div>
          </div>
          <div v-if="!model.tags.length && tagError" class="error">
            Tagovi su obavezni
          </div>
          <div class="product-images">
            <div class="add-image">
              <i
                class="icon-camera"
                style="padding: 0.5rem 0rem; color: dodgerblu"
              ></i>
              <p style="width: 100%; margin: 0">Dodaj sliku proizvoda</p>
              <input
                type="file"
                style="
                  position: absolute;
                  height: 100%;
                  opacity: 0;
                  cursor: pointer;
                "
                @change="uploadImage"
              />
            </div>
            <div class="add-image" v-for="(img, key) in images" :key="key">
              <div class="delete-image" @click="removeFromImages(key)">
                <i class="icon-bin delete-icon"></i>
              </div>
              <img :src="img" alt="" style="width: 100%; height: 100%" />
            </div>
            <div
              class="add-image"
              v-for="(img, key) in model.images"
              :key="key"
            >
              <div class="delete-image" @click="removeFromModelImges(key)">
                <i class="icon-bin delete-icon"></i>
              </div>
              <img
                :src="'http://localhost:5000/Images/' + img"
                alt=""
                style="width: 100%; height: 100%; object-fit: contain"
              />
            </div>
          </div>
          <div
            v-if="(!images.length && imageError) || imageUpdateError"
            class="error"
          >
            Slika proizvoda je obavezna
          </div>
        </div>

        <button
          class="btn-add"
          type="button"
          @click="model.id ? updateProducts() : addProducts()"
        >
          {{ textButton }}
        </button>
      </form>
    </div>
  </ValidationObserver>
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
        tags: [],
        images: [],
        imageFiles: [],
      },
      tag: "",
      images: [],
      showError: false,
      tagError: false,
      imageError: false,
      imageUpdateError: false,
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
      this.model.tags = response.tags;
      this.model.images = response.images;
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
      const valid = await this.$refs.observer.validate();
      this.showError = true;

      if (!this.model.tags.length) {
        this.tagError = true;
      }

      if (!this.images.length) {
        this.imageError = true;
      }

      if (!valid || this.tagError || this.imageError) return;

      //Instanca za slanje objekta sa fajlovima
      let formData = new FormData();

      //iteracija kroz objekat
      for (const [key, value] of Object.entries(this.model)) {
        if (
          (key === "images" && value.length == 0) ||
          (key === "imageFiles" && value.length == 0)
        ) {
          //ako je model.images prazan, ne treba se apendat
        } else if (key === "imageFiles" || key === "tags") {
          for (let i = 0; i < value.length; i++) {
            formData.append(key, value[i]);
          }
        } else {
          formData.append(key, value);
        }
      }

      await this.addProduct(formData);
      this.$emit("save");
    },
    async updateProducts() {
      const valid = await this.$refs.observer.validate();
      this.showError = true;
      if (!this.model.tags.length) {
        this.tagError = true;
      }
      if (!this.model.images.length) {
        if (!this.images.length) {
          this.imageUpdateError = true;
        }
      }
      if (!valid || this.tagError || this.imageUpdateError) return;

      let formData = new FormData();

      //iteracija kroz objekat
      for (const [key, value] of Object.entries(this.model)) {
        if (
          (key === "images" && value.length == 0) ||
          (key === "imageFiles" && value.length == 0)
        ) {
          //ako je model.images prazan, ne treba se apendat
        } else if (key === "imageFiles" || key === "images" || key === "tags") {
          for (let i = 0; i < value.length; i++) {
            formData.append(key, value[i]);
          }
        } else {
          formData.append(key, value);
        }
      }
      await this.updateProduct(formData);
      this.$emit("save");
    },
    addTags() {
      if (this.tag != "") {
        this.model.tags.push(this.tag);
        this.tag = "";
        this.tagError = false;
      }
    },
    deleteTag(key) {
      this.model.tags.splice(key, 1);
    },
    uploadImage(e) {
      this.images.push(URL.createObjectURL(e.target.files[0]));
      this.model.imageFiles.push(e.target.files[0]);
      this.imageError = false;
      this.imageUpdateError = false;
    },
    removeFromImages(key) {
      this.images.splice(key, 1);
    },
    removeFromModelImges(key) {
      this.model.images.splice(key, 1);
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

.update {
  padding-top: 2rem;
  height: 100%;
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
input:focus {
  border: 1px solid grey;
}
select:focus {
  border: 1px solid grey;
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
.btn-add {
  background-color: rgb(19 187 35);
  color: rgb(241, 241, 226);
  border: transparent;
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  width: 100%;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
  cursor: pointer;
}
.btn-add:hover {
  background-color: rgb(16 161 30);
}
.tag {
  padding: 0.5rem 1rem;
  border: 1px solid #e1e8ee;
  border-radius: 10px;
  margin-left: 0.5rem;
  background-color: rgb(213, 210, 210);
  font-size: 1rem;
  display: flex;
  align-items: center;
}
.tags {
  display: flex;
  align-content: center;

  padding: 1rem;
  font-size: 1.2rem;
}
.addTag {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
}
.button-add-tag {
  background-color: rgb(19 187 35);
  color: rgb(241, 241, 226);
  border: transparent;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  /* height: 100%; */
  cursor: pointer;
}
.button-add-tag:hover {
  background-color: rgb(16 161 30);
}
.delete-tag {
  font-weight: bold;
  margin-left: 0.5rem;
  color: dimgray;
  border: transparent;
  border-radius: 2px;
  cursor: pointer;
}
.product-images {
  display: flex;
  width: 100%;
  align-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  font-size: 1.2rem;
}
.add-image {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  border: 1px solid gainsboro;
  width: 10rem;
  height: 9rem;
  font-size: 1rem;
  color: dodgerblue;

  position: relative;
  min-width: 10rem;
  min-height: 9rem;
}
.add-image:hover {
  background: #e9e9e9;
}
.add-image:hover .delete-image {
  display: block;
}
.delete-image {
  position: absolute;
  color: dimgray;
  border: transparent;
  display: none;
  right: 0;
  top: 0;
  cursor: pointer;
}
.delete-icon {
  font-size: 1.2rem;
  color: red;
  background: white;
  font-size: 22px;
  cursor: pointer;
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
  display: flex;
  padding: 1rem;
  font-size: 1.2rem;
}
.v-observer {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
}
.product-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
}
.form-container {
  height: 100%;
  background: white;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
