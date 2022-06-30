<template>
  <div class="description-div">
    <div v-if="order" class="order-form">
      <OrderProduct
        @closed="away()"
        :name="name"
        :price="price"
        :state="state"
        :images="images"
        :forOrder="true"
        @save="away()"
      ></OrderProduct>
    </div>
    <div style="display: flex; width: 100%">
      <div class="image-div">
        <gallery
          :images="imagesArray"
          :index="index"
          @close="index = null"
        ></gallery>

        <img
          :src="'http://localhost:5000/Images/' + images[0]"
          @click="index = 0"
          style="width: 25rem; height: 100%"
          alt=""
        />>
      </div>

      <div class="description-button">
        <div class="description">
          <div class="text-div">{{ username }}</div>
          <div class="text-div">Naziv: {{ name }}</div>
          <div class="text-div">Kategorija: {{ category }}</div>
          <div class="text-div">Opis: {{ description }}</div>
          <div class="text-div">Stanje: {{ state }}</div>
          <div class="text-div">Cijena: {{ price }}</div>
          <div class="text-div">Tagovi:</div>
          <div class="tags">
            <div class="tag" v-for="tag in tags" :key="tag">{{ tag }}</div>
          </div>
        </div>
        <div class="button-div">
          <button @click="openOrderWindov()">Naruči</button>
        </div>
      </div>
    </div>
    <div v-if="order" class="mask" @click.self="away()"></div>
  </div>
</template>

<script>
import VueGallery from "vue-gallery";
import OrderProduct from "@/components/OrderProduct.vue";
import { mapActions } from "vuex";
export default {
  components: {
    OrderProduct,
    gallery: VueGallery,
  },
  data() {
    return {
      order: false,
      username: "",
      name: "",
      category: "",
      description: "",
      state: null,
      price: null,
      tags: [],
      images: [],
      index: null,
      imagesArray: [],
    };
  },
  async created() {
    const response = await this.getProductById(
      Number(this.$route.query.productId)
    );
    this.name = response.name;
    this.username = response.user.email;
    this.category = response.category.name;
    this.description = response.description;
    this.state = response.state;
    this.price = response.price;
    this.tags = response.tags;
    this.images = response.images;
    for (let i = 0; i < this.images.length; i++) {
      this.imagesArray.push("http://localhost:5000/Images/" + this.images[i]);
    }
  },
  methods: {
    ...mapActions(["getProductById"]),
    openOrderWindov() {
      this.order = true;
    },
    away() {
      this.order = false;
    },
  },
};
</script>

<style scoped>
.description-div {
  display: flex;
  border: 1px solid grey;
  align-items: center;
  padding: 2rem 10rem;
}
.image-div {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
  margin: 5px;
  cursor: pointer;
}
.image-div > img {
  width: 100%;
  height: 100%;
}
.description {
  display: flex;
  flex-direction: column;
  text-align: start;
  padding: 0 3rem;
}
.text-div {
  padding: 1rem;
  margin-bottom: 0.5rem;
}
.button-div {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}
button {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: 1px solid gray;
  padding: 1rem 1rem;
  font-size: 1rem;
  width: 10rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
}
.description-button {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: start;
  background-color: blanchedalmond;
}
.order-form {
  position: absolute;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  width: 60%;
  margin: auto;
  z-index: 2;
  top: 1rem;
}
.mask {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
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
