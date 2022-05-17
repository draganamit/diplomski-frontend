<template>
      <div class="container">
        <div class="header">Kategorije</div>
        <div @click="dajSveProizvode" style="padding:0.5rem">Svi proizvodi</div>
      </div>
</template>

<script>
export default {
  data()
  {
    return{
      IdCategory: null
    }
  },
  created()
  {
      this.IdCategory = this.$route.query.cateogory
  },

  methods:
  {
    dajSveProizvode()
    {
      this.IdCategory = "prosledjeni id"
      this.$router.push({
        query:{
          nazivGore: this.IdCategory
        }
      })
    }
  }

}
</script>

<style scoped>
.container
{
  display:flex; 
  flex-direction: column; 
  border: 1px solid gray; 
  margin: 0.5rem 0;
}
.header
{
  background-color: rgb(230, 91, 40); 
  color:white; 
  padding:0.5rem;
}
</style>