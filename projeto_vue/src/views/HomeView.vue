<template>
  <BannerHome />
  <div class="main-container">
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
  }
}
</script>

<style scoped>
 
</style>
