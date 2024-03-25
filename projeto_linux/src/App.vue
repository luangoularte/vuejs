<template>
  <div>
    <NavBar :logo="logo_src" :alt="app_name"/>
    <router-view/>
    <FooterPage />
  </div>
</template>

<script>
  import NavBar from "./components/NavBar.vue"
  import FooterPage from "./components/FooterPage.vue"

  export default {
    components: {
      NavBar,
      FooterPage
    },
    data() {
      return {
        logo_src: "/img/logo.png",
        app_name: "Make Your Burger"

      }
    }
  }
</script>

<style>

  * {
    font-family: sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .main-container {
    margin: 50px;
    min-height: 250px;
    padding: 0;
    margin: 0;
  }

  h1 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    margin-top: 20px;
    color: #222;
  }


</style>
