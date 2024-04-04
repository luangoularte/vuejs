<template>
    <div id="burger-table">
        <MessageSystem :msg = "msg" v-show="msg"/>
        <div>
            <div id="burger-table-heading">
                <div class="order-id">#:</div>
                <div>Cliente:</div>
                <div>Pão:</div>
                <div>Carne:</div>
                <div>Opcionais:</div>
                <div>Valor:</div>
                <div>Status:</div>
                <div>Pagamento:</div>
            </div>
        </div>
        <div id="burger-table-rows">
            <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
                <div class="order-number">{{ burger.id }}</div>
                <div>{{ burger.nome }}</div>
                <div>{{ burger.pao }}</div>
                <div>{{ burger.carne }}</div>
                <div>
                    <ul>
                        <li v-for='(opcional, index) in (burger.opcionais.replace(/[{}"]/g, "").split(","))' :key="index">{{ opcional }}</li>
                    </ul>
                </div>
                <div>R${{ burger.total }}</div>
                <div>{{ burger.status }}</div>
                <div>{{ burger.status_pagamento }}</div>
                <div>
                    <button class="delete-btn" @click="deleteBurger(burger.id, burger.nome, burger.email, burger.total)">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MessageSystem from "./MessageSystem.vue";
import axios from "axios";


export default {
    name: "DashboardPedidos",
    data() {
        return {
            burgers: null,
            burger_id: null,
            msg: null,
            nome: null,
            email:null,
            acao: "Cancelar Pedido"
        }
    },
    components: {
        MessageSystem
    },
    methods: {
        async getDadosCliente(){
            const cliente = JSON.parse(localStorage.getItem('cliente'));
            this.nome = cliente.nome;
            this.email = cliente.email;
        },
        async getPedidosPorCliente(email) {
            const require = await fetch(`http://localhost:3000/burgers/${email}`);
            console.log(email)
            const data = await require.json();

            this.burgers = data;

            console.log(data);
        },
        async deleteBurger(id, nome, email, total) {
            
            const require = await fetch(`http://localhost:3000/burgers/${id}`, {
                method: "DELETE"
            });
            console.log(nome, email, total, id, this.acao);

            const result = await require.json();

            this.msg = `Pedido N°${id} removido com sucesso!`;

            setTimeout(() => this.msg= "", 3000);

            this.sendMessage(nome, email, total, id, this.acao);

            this.getPedidosPorCliente(this.email);
        },
        sendMessage(nome, email, total, id, acao) {
            axios.get(
                "http://localhost:9010?nome="+nome+"&email="+email+"&total="+total+"&acao="+acao+"&idPedido="+id
            )
        }
    },
    mounted() {
        this.getDadosCliente();
        this.getPedidosPorCliente(this.email);
    }
}
</script>

<style scoped>
#burger-table {
    max-width: 1550px;
    margin: 0 auto;
}

#burger-table-heading,
#burger-table-rows,
.burger-table-row {
    display: flex;
    flex-wrap: wrap;
}

#burger-table-heading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
}

#burger-table-heading div,
  .burger-table-row div {
    width: 11%;
}

.burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 3px solid #CCC;
}

#burger-table-heading .order-id,
  .burger-table-row .order-number {
    width: 12%;
}

select {
    padding: 12px 0px;
    margin-right: 12px;
    width: 80%;
}

.delete-btn {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
    width: 150px;
}

.delete-btn:hover {
    background-color: transparent;
    color: #222;
}
</style>