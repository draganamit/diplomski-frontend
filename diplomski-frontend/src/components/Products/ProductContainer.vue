<template>
  <div class="content-products">
    <ProductBase
      v-for="(product, key) in products"
      :key="key"
      @open="openWindowUpdate(product.id)"
      :name="product.name"
      :price="product.price"
    ></ProductBase>
  </div>
</template>

<script>
import ProductBase from "@/components/Products/ProductBase.vue";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  components: {
    ProductBase,
  },
  props: {},
  watch: {
    searchModel: {
      deep: true,
      async handler() {
        await this.GetProductsForIndex(this.searchModel);
      },
    },
  },
  methods: {
    ...mapActions(["GetProductsForIndex"]),
    ...mapMutations(["setProducts"]),
    openWindowUpdate(id) {
      this.$emit("openUpdate", id);
    },
  },
  async created() {
    await this.GetProductsForIndex(this.searchModel);
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
      searchModel: (state) => state.products.searchModel,
    }),
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
