<template>
  <div>
    <HeaderPage :esta_logado=true />
    <PrimeiroComponente />
    <p>O dado de App é: {{ testando }}</p>
    <LifeCycle />
    <PessoaInfo />
  </div>
</template>


<script>
  import PrimeiroComponente from './components/PrimeiroComponente.vue'
  import LifeCycle from './components/LifeCycle.vue'
  import PessoaInfo from './components/PessoaInfo.vue'
  import HeaderPage from './components/HeaderPage.vue'

  export default {
    name: "App",
    components: {
        HeaderPage,
        PrimeiroComponente,
        LifeCycle,
        PessoaInfo
    },
    data() {
      return {
        testando: "Teste"
      }
    }
  }
</script>

<style>
  body {
    background-color: beige;
    font-family: sans-serif;
  }
</style>