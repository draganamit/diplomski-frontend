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
        <div style="padding-left: 0" class="price">{{ price }} KM</div>
      </div>
    </div>

    <div
      v-if="user && (user.type == 0 || user.id == productUserId)"
      class="icons"
    >
      <div
        @click.stop="openWindow()"
        style="
          padding: 0 0.5rem;
          font-size: 1.1rem;
          border: 1px solid grey;
          border-radius: 0.2rem;
          margin-right: 0.3rem;
        "
      >
        <i class="icon-pencil"></i>
      </div>
      <div
        @click.stop="remove()"
        style="
          padding: 0 0.5rem;
          font-size: 1.1rem;
          border: 1px solid grey;
          border-radius: 0.2rem;
        "
      >
        <i class="icon-bin"></i>
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
  padding-bottom: 0.5rem;
  position: relative;
}
.image {
  height: 8rem;
}
.image > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.name {
  padding: 0.5rem;
  font-size: 1rem;
}
.price {
  padding: 0.5rem;
  font-size: 1rem;
  margin-left: auto;
}
.icons {
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
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
</style>
