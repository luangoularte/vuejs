<template>
    <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Projetos</a></li>
        <li><a href="#">Contato</a></li>
        <li v-if="esta_logado"><a href="#">Meu Perfil</a></li>
    </ul>
</template>

<script>
    export default {
        name: "HeaderPage",
        props: ["esta_logado"]
    }
</script>

<style scoped>
    ul {
        list-style: none;
        display: flex;
        background: white;
        
    }

    li {
        margin-right: 10px;
    }

    a {
        color: brown;
        text-decoration: none;
        transition: .5s;
    }

    a:hover {
        color: turquoise;
    }

</style>