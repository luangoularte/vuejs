<template>
    <div id="main-banner">
        <h1>Make Your Burger</h1>
    </div>
</template>

<script>
    export default {
        name: "BannerHome"
    }
</script>


<style scoped>
    #main-banner {
    background-image: url('C:\Users\luana\OneDrive\Área de Trabalho\vuejs\projeto_linux\public\img\burger.jpg');
    background-position: 0 -250px;
    background-size: cover;
    height: 700px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  #main-banner h1 {
    color: #fff;
    text-align: center;
    font-size: 80px;
    background-color: #222;
    padding: 20px 40px;
  }
</style>