<template>
    <div class="main-container">
        <h1>Login</h1>
        <LoginForm />
    </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
    name: "LoginView",
    components: {
        LoginForm
    },
    mounted() {
        document.title = 'Login';
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