<template>
  <div class="product-container">
    <div class="content-products">
      <ProductBase
        v-for="(product, key) in products"
        :key="key"
        @open="openWindowUpdate(product.id)"
        @remove="openRemoveWindow(product.id)"
        :name="product.name"
        :price="product.price"
        :location="product.user.location"
        :id="product.id"
        :images="product.images"
        :productUserId="product.user.id"
        :productOnState="product.state == 0 ? false : true"
      ></ProductBase>
    </div>
    <div
      v-if="!products.length"
      :class="$route.path == '/userprofile' ? 'no-product' : 'no-product-new'"
    >
      Nema proizvoda na stanju.
    </div>
    <div class="pagination" v-if="products.length && pageCount != 0">
      <!-- <div class="pagination" v-if="products.length && $route.fullPath != '/'"> -->
      <div class="page" @click="prevPage()">&#60;</div>
      <div
        class="page"
        :class="{ 'page-active': index == searchModel.pageNum }"
        v-for="index in pageCount"
        :key="index"
        @click="setPageNum(index)"
      >
        {{ index }}
      </div>
      <div class="page" @click="nextPage()">></div>
    </div>
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
    "$route.query"(newVal, oldVal) {
      //newVal == this.$route.query

      if (newVal.pageNum == oldVal.pageNum && newVal.pageNum > 1) {
        let query = Object.assign({}, newVal);
        query.pageNum = 1;
        this.$router
          .push({
            query: query,
          })
          .catch();
        return;
      }
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
    async openRemoveWindow(id) {
      this.$emit("openRemove", id);

      // await this.deleteProduct(id);
      // await this.GetProductsForIndex(this.searchModel);
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
    setPageNum(index) {
      let query = Object.assign({}, this.$route.query);
      query.pageNum = index;
      this.$router
        .push({
          query: query,
        })
        .catch();
    },
    prevPage() {
      if (this.searchModel.pageNum == 1) {
        return;
      }
      this.setPageNum(this.searchModel.pageNum - 1);
    },
    nextPage() {
      if (this.searchModel.pageNum == this.pageCount) {
        return;
      }
      this.setPageNum(this.searchModel.pageNum + 1);
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
      pageCount(state) {
        return Math.ceil(
          state.products.totalCount / state.products.searchModel.pageSize
        );
      },
    }),
  },
};
</script>
<style scoped>
.content-products {
  margin: 0.5rem 1rem;
  padding: 0.5rem;
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 1290px) {
  .content-products {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
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
.pagination {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: auto;
  margin-bottom: 1rem;
}
.page {
  border: 1px solid #e1e8ee;
  border-radius: 10px;
  padding: 1rem;
  margin-left: 0.5rem;
  background: white;
  font-size: 1rem;
  cursor: pointer;
}
.page:hover {
  background: #e3dbdb;
}
.page-active {
  border: 1px solid #bead84;
  background: #e3dbdb;
}
.product-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.no-product {
  color: red;
  width: 80%;
  /* position: absolute; */
  font-family: monospace;
  font-style: italic;
  font-weight: bold;
  font-size: 1.6rem;
  padding: 1rem;
  margin: 0 auto;
}

.no-product-new {
  color: red;
  padding: 0;
  left: 0;
  right: 0;
  /* position: absolute; */
  font-family: monospace;
  font-style: italic;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 3rem auto;
}
</style>
