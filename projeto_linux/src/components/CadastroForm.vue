<template>
    <div class="form-container">
        <form class="cadastro-form" @submit="criarCadastro" >
            <div class="imagem">
                <img src="/img/logo.png" alt="hamburguer" class="logo">
            </div>
            <div class="input-container">
                <label for="nome">Nome do cliente:</label>
                <input type="text" name="nome" id="nome" v-model="nome" placeholder="Digite seu nome" required>
            </div>
            <div class="input-container">
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" v-model="email" placeholder="Digite seu email" required>
            </div>
            <div class="input-container">
                <label for="senha">Senha:</label>
                <input type="password" name="senha" id="senha" v-model="senha" placeholder="Digite sua senha" required>
            </div>
            <div class="input-container">
                <label for="senha1">Confirme sua senha:</label>
                <input type="password" name="senha_check" id="senha_check" v-model="senha_check" placeholder="Digite sua senha" required>
            </div>
            <div class="input-container">
                <input class="submit-btn" type="submit" value="Cadastrar">
            </div>
            <MessageSystem :msg = "msg" v-show="msg"/>
        </form>
    </div>
</template>


<script>
import BurgerForm from './BurgerForm.vue';
import MessageSystem from "./MessageSystem.vue"

export default {
    name: "CadastroForm",
    data() {
        return {
            nome: null,
            email: null,
            senha: null,
            senha_check: null,
            acao: "cadastrar",
            msg: null
        }
    },
    components: {
        BurgerForm,
        MessageSystem
    },
    methods: {
        async criarCadastro(e){
            e.preventDefault();

            if (this.senha != this.senha_check){
                this.msg = `Oops! Parece que as senhas digitadas não correspondem.`;

                setTimeout(() => this.msg= "", 4000);
                return
            }


            const data = {
                acao: this.acao,
                nome: this.nome,
                email: this.email,
                senha: this.senha
            }

            const dataJson = JSON.stringify(data)

            const request = await fetch("http://localhost:3000/clientes", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: dataJson
            });
            
            const result = await request.json();
            console.log(result)

            if (!request.ok) {
                this.msg = `Oops! Este email já está cadastrado.`;

                setTimeout(() => this.msg= "", 4000);
                return
            }

            this.nome = "";
            this.email = "";
            this.senha = "";
            this.senha_check = "";

            this.msg = `Cadastro realizado com sucesso!`;

            setTimeout(() => this.msg= "", 4000);
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