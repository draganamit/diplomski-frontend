<template>
  <div class="content-products">
    <ProductBase
      v-for="(product, key) in products"
      :key="key"
      @open="openWindowUpdate(product.id)"
      @remove="removeProduct(product.id)"
      :name="product.name"
      :price="product.price"
      :id="product.id"
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
    "$route.query"(newVal) {
      //newVal == this.$route.query
      this.mapQueryToSearchModel(newVal);
      // await this.GetProductsForIndex(this.searchModel);
    },
  },
  methods: {
    ...mapActions(["GetProductsForIndex", "deleteProduct"]),
    ...mapMutations(["setProducts", "setSearchModel"]),
    openWindowUpdate(id) {
      this.$emit("openUpdate", id);
    },
    async removeProduct(id) {
      await this.deleteProduct(id);
      await this.GetProductsForIndex(this.searchModel);
    },
    mapQueryToSearchModel(query) {
      this.setSearchModel({
        pageNum: query.pageNum ? Number(query.pageNum) : 1,
        pageSize: query.pageSize ? Number(query.pageSize) : 8,
        categoryId: query.categoryId ? Number(query.categoryId) : null,
        priceFrom: query.priceFrom ? Number(query.priceFrom) : null,
        priceTo: query.priceTo ? Number(query.priceTo) : null,
        location: query.location ? query.location : "",
        name: query.name ? query.name : "",
        userId: query.userId ? Number(query.userId) : null,
      });
    },
  },
  async created() {
    this.mapQueryToSearchModel(this.$route.query);
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
