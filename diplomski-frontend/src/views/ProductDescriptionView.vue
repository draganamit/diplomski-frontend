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
    <div class="description-content">
      <div class="image-div">
        <gallery
          :images="imagesArray"
          :index="index"
          @close="index = null"
        ></gallery>

        <img
          :src="'http://localhost:5000/Images/' + images[0]"
          @click="index = 0"
          style="width: 25rem; height: 100%; max-height: 505px"
          alt=""
        />
      </div>

      <div class="description-button">
        <div class="description">
          <div
            class="text-div"
            style="
              font-weight: bold;
              font-size: 1.5rem;
              font-style: italic;
              font-family: cursive;
              color: rgb(170, 52, 9);
            "
          >
            {{ name }}
          </div>
          <div class="text-div">
            <b style="font-family: cursive">Opis:</b> {{ description }}
          </div>
          <div class="text-div">
            <b style="font-family: cursive">Cijena:</b>
            <div style="color: red; font-weight: bold">
              {{ Number(price).toFixed(2) }} KM
            </div>
          </div>
          <div class="text-div">
            <b style="font-family: cursive">Prodavac:</b>
            <div style="cursor: pointer" @click="setIdUser(userProduct)">
              {{ username }}
            </div>
          </div>
          <div class="text-div">
            <b style="font-family: cursive">Lokacija:</b> {{ location }}
          </div>
          <div class="text-div">
            <b style="font-family: cursive">Kategorija:</b> {{ category }}
          </div>

          <!-- <div class="text-div">Stanje: {{ state }}</div> -->

          <div class="text-div">
            <b style="font-family: cursive">Tagovi:</b>
          </div>
          <div class="tags">
            <div class="tag" v-for="tag in tags" :key="tag">{{ tag }}</div>
          </div>
        </div>
        <div class="button-div">
          <button
            :class="
              user &&
              userProduct != user.id &&
              ($route.query.productOnState == 'true' ||
                $route.query.productOnState == true)
                ? 'button'
                : 'block-order'
            "
            @click="openOrderWindov()"
          >
            Naruči
          </button>
        </div>
      </div>
    </div>
    <div v-if="order" class="mask" @click.self="away()"></div>
  </div>
</template>

<script>
import VueGallery from "vue-gallery";
import OrderProduct from "@/components/OrderProduct.vue";
import { mapActions, mapState } from "vuex";
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
      location: "",
      description: "",
      state: null,
      price: null,
      tags: [],
      images: [],
      index: null,
      imagesArray: [],
      userProduct: null,
    };
  },
  async created() {
    const response = await this.getProductById(
      Number(this.$route.query.productId)
    );
    this.userProduct = response.user.id;
    this.name = response.name;
    this.username = response.user.email;
    this.category = response.category.name;
    this.location = response.user.location;
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
    setIdUser(id) {
      this.$router
        .push({
          name: "userprofile",
          query: {
            userId: id,
          },
        })
        .catch();
    },
    openOrderWindov() {
      this.order = true;
    },
    away() {
      this.order = false;
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
    }),
  },
};
</script>

<style scoped>
.description-div {
  display: flex;
  align-items: center;
  padding: 2rem 10rem;
}
@media (max-width: 1536px) {
  .description-div {
    padding: 2rem 8rem;
  }
}
@media (max-width: 1280px) {
  .description-div {
    padding: 2rem 4rem;
  }
}
@media (max-width: 1024px) {
  .description-div {
    padding: 2rem 6rem;
  }
}
@media (max-width: 768px) {
  .description-div {
    padding: 2rem 5rem;
  }
}
@media (max-width: 640px) {
  .description-div {
    padding: 2rem 3rem;
  }
}
.description-content {
  display: flex;

  width: 100%;
  align-items: center;
  justify-content: center;
}
@media (max-width: 1024px) {
  .description-content {
    flex-wrap: wrap;
  }
}
.image-div {
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;

  cursor: pointer;
}
.image-div > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  display: flex;
  font-family: cursive;
}
.button-div {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  margin-top: 0.5rem;
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
  cursor: pointer;
  border: none;
  font-family: cursive;
}
button:hover {
  transform: scale(1.01);
  background-color: rgb(193 73 28);
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
  min-width: 450px;
  border-radius: 5px;
  width: 40%;
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
  font-family: cursive;

  border-radius: 10px;
  margin-left: 0.5rem;
  background-color: rgb(213, 210, 210);
  font-size: 1rem;
  background: white;
}
.tags {
  display: flex;
  align-content: center;
}
.block-order {
  background: #b7b7b7;
  color: #8f8b8b;
  border: transparent;
  pointer-events: none;
  border: none;
}
b {
  margin-right: 0.5rem;
}
#blueimp-gallery {
  width: 100%;
}
</style>
