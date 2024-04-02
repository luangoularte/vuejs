<template>
    <div>
        <div>
            <h1 v-if="nome">Olá, {{ nome }}!</h1>
            <form id="burger-form" @submit="createBurger">
                <div class="input-container">
                    <label for="pao">Escolha o pão:</label>
                    <select name="pao" id="pao" v-model="pao" required>
                        <option value="" disabled selected>Selecione o seu pão</option>
                        <option v-for="pao in paes" v-bind:key="pao.id" :value="pao.tipo">
                            {{ pao.tipo }} <p class="valores">+R${{ pao.valor }}</p>
                        </option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="carne">Escolha a carne do seu Burger:</label>
                    <select name="carne" id="carne" v-model="carne" required>
                        <option value="" disabled selected>Selecione o tipo de carne</option>
                        <option v-for="carne in carnes" v-bind:key="carne.id" :value="carne.tipo">
                            {{ carne.tipo }} <p class="valores">+R${{ carne.valor }}</p>
                        </option>
                    </select>
                </div>
                <div class="input-container">
                    <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
                    <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
                        <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo">
                        <span>{{ opcional.tipo }}</span> +R${{ opcional.valor }}
                    </div>
                </div>
                <div class="total">
                    <h1>Total:</h1> 
                    <h1 v-if="total > 0">R${{ total }}</h1>
                    <h1 v-else>R$0.00</h1>
                </div>
                <div class="input-container">
                    <input class="submit-btn" type="submit" value="Criar meu Burger!">
                </div>
                <MessageSystem :msg = "msg" v-show="msg"/>
            </form>
        </div>
    </div>
</template>

<script>
import MessageSystem from "./MessageSystem.vue"
import axios from "axios";


export default {

    name: "BurgerForm",
    data() {
        return {
            paes: null,
            carnes: null,
            opcionaisdata: null,
            pao: null,
            carne: null,
            opcionais: [],
            msg: null,
            nome: null,
            email: null,
            total: null
        }
    },
    methods: {
        async getDadosCliente(){
            const cliente = JSON.parse(localStorage.getItem('cliente'));
            this.nome = cliente.nome;
            this.email = cliente.email;
        },
        async getIngredientes() {
            const request = await fetch("http://localhost:3000/ingredientes");
            const data = await request.json();

            this.paes = data.paes;
            this.carnes = data.carnes;
            this.opcionaisdata = data.opcionais;
        },

        async createBurger(e) {
            e.preventDefault()

            console.log(this.nome, this.email);

            const data = {
                nome: this.nome,
                email: this.email,
                carne: this.carne,
                pao: this.pao,
                opcionais: Array.from(this.opcionais),
                status: "solicitado"
            }

            const dataJson = JSON.stringify(data);

            const request = await fetch("http://localhost:3000/burgers", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: dataJson
            });
            
            const result = await request.json();
            console.log(result);

            this.msg = `Pedido realizado com sucesso!`;

            setTimeout(() => this.msg= "", 4000)

            this.nome = "";
            this.carne = "";
            this.pao = "";
            this.opcionais = [];
            
        }

    },
    mounted() {
        this.getIngredientes();
        this.getDadosCliente();
    },
    components: {
        MessageSystem 
    }
}
</script>

<style scoped>

h1 {
    font-size: 20px;
}

#burger-form {
    max-width: 500px;
    margin: 0 auto;
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
    width: 500px;
    font-size: 16px;
}

#opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
}

#opcionais-title {
    width: 100%;
}

.checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
    
}

.checkbox-container span,
.checkbox-container input {
    width: auto;
}

.checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
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


.total {
    text-align: left;
    display: flex;
}

</style>