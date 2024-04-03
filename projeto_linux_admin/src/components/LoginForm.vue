<template>
    <div class="form-container">
        <form class="cadastro-form" @submit="logar" >
            <div class="imagem">
                <img src="/img/logo.png" alt="hamburguer" class="logo">
            </div>
            <MessageSystem :msg = "msg" v-show="msg"/>
            <div class="input-container">
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" v-model="email" placeholder="Digite seu email" required>
            </div>
            <div class="input-container">
                <label for="senha">Senha:</label>
                <input type="password" name="senha" id="senha" v-model="senha" placeholder="Digite sua senha" required>
            </div>
            <div class="input-container">
                <input class="submit-btn" type="submit" value="Entrar">
            </div>
        </form>
    </div>
</template>

<script>
import MessageSystem from './MessageSystem.vue';

export default {
    name: "LoginForm",
    data() {
        return {
            email: null,
            senha: null,
            msg: null
        }
    },
    methods: {
        async logar(e){
            e.preventDefault();

            const data = {
                email: this.email,
                senha: this.senha
            }

            const dataJson = JSON.stringify(data)

            const request = await fetch("http://localhost:4000/admin", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: dataJson
            });
            
            const result = await request.json();
            console.log(result)

            if (request.ok) {
                localStorage.setItem('admin', JSON.stringify({ email: this.email }));
                this.$router.push("/pedidos");
                setTimeout(() => window.location.reload(), 1);
            } else {
                this.msg = 'Email ou senha incorretos';
                setTimeout(() => this.msg= "", 4000);
            }
        }
    },
    components: {
        MessageSystem
    }
}

</script>

<style scoped>


.imagem {
    text-align: center;
}

.logo {
    width: 80px;
    height: 80px;
    margin-bottom: 30px;

}

.cadastro-form {
    max-width: 320px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 250px;
}

.input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

label {
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;
    padding: 5px 10px;
    border-left: 4px solid #fcba03;
}

input, select {
    padding: 5px 10px;
    width: 325px;
    font-size: 16px;
}

.submit-btn {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
}

.submit-btn:hover {
    background-color: transparent;
    color: #222;
}


</style>