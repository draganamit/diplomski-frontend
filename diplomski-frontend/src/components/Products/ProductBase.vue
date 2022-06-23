<template>
  <div class="container-product" @click.stop="setProductId()">
    <div class="image"></div>
    <div style="display: flex">
      <div class="name">{{ name }}</div>
      <div class="price">{{ price }} KM</div>
    </div>

    <div class="icons">
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
export default {
  props: {
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
};
</script>

<style scoped>
.container-product {
  border: 1px solid grey;
  height: 10rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}
.image {
  border: 1px solid grey;
  height: 7rem;
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
}
</style>
