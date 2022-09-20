<template>
  <div class="container-product" @click.stop="setProductId()">
    <div style="position: relative">
      <div class="product-state" v-if="!productOnState">
        <div style="color: #dfd9d9">Trenutno nema na stanju</div>
      </div>
      <div class="image">
        <img :src="'http://localhost:5000/Images/' + images[0]" alt="" />
      </div>
      <div style="display: flex">
        <div style="text-align: start; padding-right: 0" class="name">
          {{ name }}
        </div>
        <div style="padding-left: 0" class="price">
          {{ Number(price).toFixed(2) }} KM
        </div>
      </div>
      <div
        style="
          position: absolute;
          padding: 0 0.5rem;
          font-family: cursive;
          color: #e65b28;
        "
      >
        <i class="icon-location"></i> {{ location }}
      </div>
    </div>

    <div
      v-if="
        user &&
        (user.type == 0 || user.id == productUserId) &&
        ($route.path == '/product' || $route.path == '/userprofile')
      "
      class="icons"
    >
      <div @click.stop="openWindow()" class="update-product">
        <i style="color: #e65b28; font-size: 1.2rem" class="icon-pencil"></i>
      </div>
      <div @click.stop="remove()" class="update-product">
        <i style="color: #b70707" class="icon-bin"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    productOnState: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: null,
    },
    id: {
      type: Number,
      default: null,
    },
    productUserId: {
      type: Number,
      default: null,
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    openWindow() {
      this.$emit("open");
    },
    remove() {
      this.$emit("remove");
    },
    setProductId() {
      this.$router
        .push({
          name: "productdescription",
          query: {
            productId: this.id,
          },
        })
        .catch();
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
.container-product {
  height: 13rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
}
.container-product:hover {
  /*box-shadow: inset 0px 0px 9px 0px #e7905a8c;*/
  box-shadow: 0px 0px 9px 0px #e7905a8c;
}
.image {
  height: 8rem;
  margin-top: 5px;
}

.image > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.name {
  padding: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  font-family: cursive;
}
.price {
  padding: 0.5rem;
  font-size: 1rem;
  margin-left: auto;
  color: red;
  font-family: cursive;
}
.icons {
  display: flex;
  justify-content: end;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  /* padding: 1rem; */
  padding-bottom: 0.2rem;
}
.product-state {
  position: absolute;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  display: flex;
}
.update-product {
  padding: 0.2rem 0.6rem;
  font-size: 1.2rem;

  border-radius: 0.2rem;
  margin-right: 0.3rem;
  cursor: pointer;
  background: #d8d1d1;
}
.update-product:hover {
  background: #bdb6b6;
}
</style>
