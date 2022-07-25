<template>
  <div class="main">
    <FiltersContainer v-model="searchModel" @search="search"></FiltersContainer>
    <HomeProductsContainer
      v-model="searchModel"
      @search="search"
    ></HomeProductsContainer>
  </div>
</template>

<script>
import FiltersContainer from "./Filters/FiltersContainer.vue";
import HomeProductsContainer from "./Products/HomeProductContainer.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: { FiltersContainer, HomeProductsContainer },
  data() {
    return {
      searchModel: {
        categoryId: null,
        location: "",
        priceFrom: 0,
        priceTo: 0,
        name: "",
      },
    };
  },
  computed: {
    ...mapState({
      stateSearchModel: (state) => state.products.searchModel,
    }),
  },
  methods: {
    ...mapMutations(["setSearchModel"]),

    search() {
      this.setSearchModel({
        pageNum: this.$route.query.pageNum
          ? Number(this.$route.query.pageNum)
          : 1,
        pageSize: this.$route.query.pageSize
          ? Number(this.$route.query.pageSize)
          : 8,
        categoryId: this.searchModel.categoryId
          ? Number(this.searchModel.categoryId)
          : null,
        priceFrom: this.searchModel.priceFrom
          ? Number(this.searchModel.priceFrom)
          : null,
        priceTo: this.searchModel.priceTo
          ? Number(this.searchModel.priceTo)
          : null,
        location: this.searchModel.location ? this.searchModel.location : "",
        name: this.searchModel.name ? this.searchModel.name : "",
        userId: this.$route.query.userId
          ? Number(this.$route.query.userId)
          : null,
      });
      this.$router.replace({ query: this.stateSearchModel });
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  padding: 1rem;
}
</style>
