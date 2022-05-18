<template>
  <div class="description-div">
    <div class="image-div"></div>
    <div class="description-button">
      <div class="description">
        <div class="text-div">Naziv</div>
        <div class="text-div">Kategorija</div>
        <div class="text-div">Opis</div>
        <div class="text-div">Stanje</div>
        <div class="text-div">Cijena</div>
      </div>
      <div class="button-div">
        <button>Naruči</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.description-div {
  display: flex;
  border: 1px solid grey;
  align-items: center;
  padding: 2rem 10rem;
}
.image-div {
  border: 1px solid grey;
  width: 20rem;
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
}
.button-div {
  display: flex;
  justify-content: end;
  margin-left: auto;
}
button {
  background-color: rgb(230, 91, 40);
  color: rgb(241, 241, 226);
  border: 1px solid gray;
  padding: 1rem 1rem;
  font-size: 1rem;
  width: 10rem;
  border-radius: 0.5rem;
}
.description-button {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: start;
  background-color: blanchedalmond;
}
</style>
