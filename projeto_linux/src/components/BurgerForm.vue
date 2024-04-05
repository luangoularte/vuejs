<template>
    <div>
        <div>
            <h1 v-if="nome">Olá, {{ nome }}!</h1>
            <form id="burger-form" @submit="createBurger">
                <div class="input-container">
                    <label for="pao">Escolha o pão:</label>
                    <select name="pao" id="pao" v-model="pao" required @change="calcularTotal">
                        <option value="" disabled selected>Selecione o seu pão</option>
                        <option v-for="pao in paes" v-bind:key="pao.id" :value="pao" >
                        <span>{{ pao.tipo }}</span> +R${{ pao.valor }}
                        </option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="carne">Escolha a carne do seu Burger:</label>
                    <select name="carne" id="carne" v-model="carne" required @change="calcularTotal">
                        <option value="" disabled selected>Selecione o tipo de carne</option>
                        <option v-for="carne in carnes" v-bind:key="carne.id" :value="carne">
                           {{ carne.tipo }} +R${{ carne.valor }}
                        </option>
                    </select>
                </div>
                <div class="input-container">
                    <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
                    <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
                        <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional" @change="calcularTotal">
                        <span>{{ opcional.tipo }}</span> +R${{ opcional.valor }}
                    </div>
                </div>
                <div class="total">
                    <h1>Total:</h1> 
                    <h1 v-if="total > 0" class="preco">R${{ total.toFixed(2) }}</h1>
                    <h1 v-else class="preco">R$0.00</h1>
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
            total: 0,
            acao: "Criar Pedido"
        }
    },
    methods: {
        async getDadosCliente(){
            if (localStorage.getItem('cliente')) {
                const cliente = JSON.parse(localStorage.getItem('cliente')) 
                this.nome = cliente.nome
                this.email = cliente.email
            }
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
            console.log(this.opcionais);
            const data = {
                nome: this.nome,
                email: this.email,
                carne: this.carne.tipo,
                pao: this.pao.tipo,
                opcionais: this.opcionais.map(opcional=>opcional.tipo),
                status: "Solicitado",
                status_pagamento: "Aguardando pagamento",
                total: this.total
            }

            const dataJson = JSON.stringify(data);

            const request = await fetch("http://localhost:3000/burgers", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: dataJson
            });
            
            const result = await request.json();
            console.log(result);

            this.msg = `Pedido no nome de ${data.nome} realizado com sucesso! No valor de R$${data.total.toFixed(2)} reais.`;

            this.sendMessage(data.nome, data.email, data.total.toFixed(2), data.id, this.acao)

            setTimeout(() => this.msg= "", 7000)

            this.carne = "";
            this.pao = "";
            this.opcionais = [];
            this.total = 0;
            
        },
        calcularTotal() {

            this.total = 0;

            if (this.pao) {
                this.total += parseFloat(this.pao.valor);
            }
            if (this.carne) {
                this.total += parseFloat(this.carne.valor);
            }

            if(this.opcionais) {
                this.opcionais.forEach(opcional => {
                    this.total += parseFloat(opcional.valor)
                })
            }
        },
        sendMessage(nome, email, total, id, acao) {
            axios.get(
                "http://localhost:9010?nome="+nome+"&email="+email+"&total="+total+"&acao="+acao+"&idPedido="+id
            )
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

.preco {
    margin-left: 5px
}



span {
    margin-right: auto;
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
    width: 100%;
    font-size: 16px;
    padding-right: 20px;
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