<template>
<div>
<div class="title_div">
  <div class="title_line">
      <div class="title">Naslov</div>
      <div class="buttons">
        <button class="btnPrijava" @click="loginOpen()">Prijavi se</button>
        <button class="btnRegistracija" @click="registrationOpen()">Registruj se</button>
      </div>
  </div>
</div>
  <div class="prijava" v-if="log">
      <div class="clsWindow">
          <div class="empty"></div>
          <div class="cls" @click="closeWindowLogin()">X</div>
      </div>
      <div class="container">
        <div class="label">
            <label>Email:</label>
        </div>
        <div class="input">
            <input type="text" v-model="model.username">
        </div>
        <div class="label">
            <label>Lozinka:</label>
        </div>
        <div class="input">
            <input type="password" v-model="model.password">
        </div>
        <div v-if="errorLogin" class="error">
            Pogrešan email ili lozinka.
        </div>
        <div class="btnPrijaviSe">
            <button>Prijavi se</button>
        </div>
      </div>
  </div>
  <div class="prijava" v-if="registration">
      <div class="clsWindow">
          <div class="empty"></div>
          <div class="cls" @click="closeWindowRegistration()">X</div>
      </div>
      <div class="container">
        <div class="label">
            <label>Ime:</label>
        </div>
        <div class="input">
            <input type="text" v-model="name">
        </div>
        <div v-if="errorRegister" class="error">
            Polje mora biti popunjeno.
        </div>
        <div class="label">
            <label>Prezime:</label>
        </div>
        <div class="input">
            <input type="password" v-model="surname">
        </div>
        <div v-if="errorRegister" class="error">
            Polje mora biti popunjeno.
        </div>
        <div class="label">
            <label>Lokacija:</label>
        </div>
        <div class="input">
            <input type="password" v-model="location">
        </div>
        <div v-if="errorRegister" class="error">
            Polje mora biti popunjeno.
        </div>
        <div class="label">
            <label>Email:</label>
        </div>
        <div class="input">
            <input type="password" v-model="model.username">
        </div>
        <div v-if="errorRegister" class="error">
            Polje mora biti popunjeno.
        </div>
        <div class="label">
            <label>Lozinka:</label>
        </div>
        <div class="input">
            <input type="password" v-model="model.password">
        </div>
        <div v-if="errorRegister" class="error">
            Polje mora biti popunjeno.
        </div>
        <div class="label">
            <label>Potvrdi lozinku:</label>
        </div>
        <div class="input">
            <input type="password" v-model="confirmPasswordd">
        </div>
        <div v-if="errorRegister" class="error">
            Polje mora biti popunjeno.
        </div>
        <div class="btnPrijaviSe">
            <button>Registruj se</button>
        </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
    name:'TitleView',
    data() {
    return {
      model: {
        username: "",
        password: "",
      },
      name:"",
      surname:"",
      location:"",
      confirmPasswordd: "",
      log: false,
      registration: false,
      errorLogin: true,
      errorRegister: true,
    };
  },
   methods: {
       loginOpen()
       {
           this.log=true;
       },
       closeWindowLogin()
       {
           this.log=false;
       },
       registrationOpen()
       {
           this.registration=true;
       },
       closeWindowRegistration()
       {
           this.registration=false;
       }
   } 
}
</script>

<style>
.title_line
{
    display: flex;
    padding: 1%;
    line-height: 3;
}
.title
{
    flex: 12;
    text-align: start;
}
.buttons
{
    flex: 4; 
    display: flex;
    padding: 0.5%;
}
.btnPrijava
{
    margin-right: 2%;
    flex: 5;
}
.btnRegistracija
{
    flex: 5;
}
.title_div
{
    padding-left: 5%;
    padding-right: 5%;
    background-color: blanchedalmond;
}
.prijava
{
    position: absolute;
    top:3%;
    left:37%;
    padding-top: 0%;
    background: white;
    border: 1px solid black;
    border-radius: 5px;
    width: 20%;
}
.container
{
    margin: 10%;
}
.label
{
    text-align: left;
    padding:0.5rem;
    padding-left: 0;
    margin-top: 5%;
}
.input
{
    text-align: left;
    
}
input
{
    width: 100%;
    display: flex;
    height: 30px;
    background-color: rgb(213, 210, 210);
    border-color: transparent;
    border-radius: 0.2rem;
}
.btnPrijaviSe
{
    text-align: right;
}
button
{
width: 40%;
    height: 35px;
}
.clsWindow
{
    display: flex;
}
.empty
{
    flex: 10;
}
.cls
{
  color: white;
  border: 1px solid white;
  background: red;
  align-items: center;
  justify-content: center;
  height: 25px;
  display: flex;
  flex: 2;
  cursor: pointer;
  border-radius: 10%;
}
.error {
  margin: auto;
  padding: 0.2rem;
  text-align: left;
  color: red;
  background: white;
}
</style>