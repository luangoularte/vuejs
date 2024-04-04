<template>
    <nav>
        <router-link to="/home" id="logo-url">
            <img :src="logo" :alt="alt" id="logo">
        </router-link>
        <router-link to="/home">Home</router-link>
        <router-link to="/meusPedidos" v-show="autenticado">Meus Pedidos</router-link>
        <router-link to="/" v-if="!autenticado">Login</router-link>
        <router-link v-if="autenticado" to="/" @click.native="logout">Logout</router-link>
  </nav>
</template>

<script>
    
export default {
    name: "NavBar",
    props: ["logo", "alt"],
    data() {
        return {
            autenticado: localStorage.getItem('cliente') !== null
        }   
    },
    
    methods: {
        logout() {
            localStorage.removeItem('cliente');
            console.log('Logout realizado')
            window.location.reload()
        }
    }
}

</script>

<style scoped>
nav {
    background-color: #222;
    border-bottom: 4px solid #111;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

#logo-url {
    margin: auto;
    margin-left: 0;
}

#logo {
    width: 40px;
    height: 40px;
}

nav a {
    color: #fcba03;
    text-decoration: none;
    margin: 12px;
    transition: .5s;
} 

nav a:hover {
    color: #fff
}
</style>