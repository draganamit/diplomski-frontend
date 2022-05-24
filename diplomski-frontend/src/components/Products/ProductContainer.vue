<template>
  <div class="content-products">
    <ProductBase
      v-for="(obj, key) in products"
      :key="key"
      @open="openWindowUpdate(obj.id)"
      :name="obj.name"
      :price="obj.price"
    ></ProductBase>
  </div>
</template>

<script>
import ProductBase from "@/components/Products/ProductBase.vue";
export default {
  components: {
    ProductBase,
  },
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Product1",
          price: "5",
        },
        {
          id: 2,
          name: "Product2",
          price: "7",
        },
        {
          id: 3,
          name: "Product3",
          price: "6",
        },
        {
          id: 4,
          name: "Product4",
          price: "8",
        },
        {
          id: 5,
          name: "Product5",
          price: "2",
        },
      ],
    };
  },

  methods: {
    openWindowUpdate(id) {
      this.$emit("openUpdate", id);
    },
  },
};
</script>
<style scoped>
.content-products {
  border: 1px solid grey;
  margin: 0.5rem 1rem;
  padding: 0.5rem;
  display: grid;
  gap: 3rem 3rem;
  grid-template-columns: repeat(4, 1fr);
  background-color: blanchedalmond;
}
@media (max-width: 1100px) {
  .content-products {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 900px) {
  .content-products {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .content-products {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
