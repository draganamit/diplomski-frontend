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
          <div class="product-images">
            <div class="add-image">
              <i
                class="icon-camera"
                style="padding: 0.5rem 0rem; color: dodgerblu"
              ></i>
              <p style="width: 100%; margin: 0">Dodaj sliku proizvoda</p>
              <input
                type="file"
                style="position: absolute; height: 100%; opacity: 0"
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
                style="width: 100%; height: 100%"
              />
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
        tags: [],
        images: [],
        imageFiles: [],
      },
      tag: "",
      images: [],
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
      this.model.tags.push(this.tag);
      this.tag = "";
    },
    deleteTag(key) {
      this.model.tags.splice(key, 1);
    },
    uploadImage(e) {
      this.images.push(URL.createObjectURL(e.target.files[0]));
      this.model.imageFiles.push(e.target.files[0]);
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
  border-bottom-right-radius: 0;
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
  padding: 0.5rem 1rem;
  font-size: 1rem;
  height: 100%;
}
.delete-tag {
  font-weight: bold;
  margin-left: 0.5rem;
  color: dimgray;
  border: transparent;
  border-radius: 2px;
}
.product-images {
  display: flex;
  width: 100%;
  align-content: center;
  flex-wrap: wrap;
  gap: 1rem;
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
  cursor: pointer;
  position: relative;
  min-width: 10rem;
  min-height: 9rem;
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
}
.delete-icon {
  font-size: 1.2rem;
  color: red;
  background: white;
  font-size: 22px;
}
</style>
