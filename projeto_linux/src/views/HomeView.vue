<template>
  <div class="main-container">
    <BannerHome />
    <h1>Monte seu Burger:</h1>
    <BurgerForm />
  </div>
</template>

<script>
  import BannerHome from "../components/BannerHome.vue";
  import BurgerForm from '../components/BurgerForm.vue';

  export default {
    name: "HomeView",
    components: {
      BannerHome,
      BurgerForm
    },
    mounted() {
      document.title = 'Make Your Burger';
    }
  }
</script>

<style scoped>
 
</style>
