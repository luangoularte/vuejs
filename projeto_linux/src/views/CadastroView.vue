<template>
    <div class="main-container">
        <h1>Cadastro</h1>
        <CadastroForm />
    </div>
</template>

<script>
import CadastroForm from '../components/CadastroForm.vue';

export default {
    name: "CadastroView",
    components: {
        CadastroForm
    }
}
</script>

<style scoped>
h1 {
    width: 100%;
    padding: 12px;
    border-bottom: 3px solid #222;
}

</style>