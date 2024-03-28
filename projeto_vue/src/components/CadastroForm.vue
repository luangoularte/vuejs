<template>
    <div class="form-container">
        <form class="cadastro-form" @submit="criarCadastro" action="./BurgerForm">
            <div class="imagem">
                <img src="/img/logo.png" alt="hamburguer" class="logo">
            </div>
            <div class="input-container">
                <label for="nome">Nome do cliente:</label>
                <input type="text" name="nome" id="nome" v-model="nome" placeholder="Digite seu nome" required>
            </div>
            <div class="input-container">
                <label for="nome">Email:</label>
                <input type="email" name="email" id="email" v-model="email" placeholder="Digite seu email" required>
            </div>
            <div class="input-container">
                <input class="submit-btn" type="submit" value="Cadastrar">
            </div>
        </form>
    </div>
</template>


<script>
import BurgerForm from './BurgerForm.vue';


export default {
    name: "CadastroForm",
    data() {
        return {
            nome: null,
            email: null,
        }
    },
    components: {
        BurgerForm
    },
    methods: {
        async criarCadastro(e){
            e.preventDefault();

            const data = {
                nome: this.nome,
                email: this.email
            }

            const dataJson = JSON.stringify(data)

            const request = await fetch("http://localhost:3000/clientes", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: dataJson
            });

            const result = await request.json();
            console.log(result);

            this.nome = "";
            this.email = "";

            window.location.href = "/home";
        }   
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
    max-width: 300px;
    margin: 0 auto;
    margin-top: 30px;
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