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
                <div>
                    <select name="status" class="status" @change="updateBurger($event, burger.id)">
                        <option v-for="status in status" :key="status.id" :value="status.tipo" :selected="burger.status == status.tipo">{{ status.tipo }}</option>
                    </select>
                </div>
                <div>
                    <select name="status_pagamento" class="status_pagamento" @change="updateBurger($event, burger.id)">
                        <option v-for="status in status_pagamento" :key="status.id" :value="status.tipo" :selected="burger.status == status.tipo">{{ status.tipo }}</option>
                    </select>
                </div>
                <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
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
            status: [],
            status_pagamento: [],
            msg: null
        }
    },
    components: {
        MessageSystem
    },
    methods: {
        async getPedidos() {
            const require = await fetch("http://localhost:3000/burgers");

            const data = await require.json();

            this.burgers = data;

            console.log(data);
            console.log(this.status_pagamento)

            this.getStatus();
            this.getStatusPagamento();
        },
        async getStatus() {
            const require = await fetch("http://localhost:3000/status");

            const data = await require.json();

            this.status = data;

        },
        async getStatusPagamento() {
            const require = await fetch("http://localhost:4000/status_pagamento");

            const data = await require.json();

            this.status_pagamento = data;

        },
        async deleteBurger(id) {
            
            const require = await fetch(`http://localhost:3000/burgers/${id}`, {
                method: "DELETE"
            });

            const result = await require.json();

            this.msg = `Pedido removido com sucesso!`;

            setTimeout(() => this.msg= "", 3000)

            this.getPedidos();
        },
        async updateBurger(event, id) {

            const option = event.target.value;
            const colunaDisparada = event.target.name;

            console.log(colunaDisparada, option)

            const dataJson = JSON.stringify({ [colunaDisparada]: option })

            const require = await fetch(`http://localhost:3000/burgers/${id}`, {
                method: "PATCH",
                headers: { "Content-Type" : "application/json" },
                body: dataJson
            });

            const result = await require.json();

            this.msg = `O pedido ${result.id} foi alterado para ${option}!`;

            setTimeout(() => this.msg= "", 3000)

            this.sendMessage(result.nome, option, result.email, colunaDisparada);

        },
        sendMessage(nome, option, email, colunaDisparada) {
            axios.get(
                "http://localhost:9000?nome="+nome+"&option="+option+"&email="+email+"&colunaDisparada="+colunaDisparada
            )
        }
    },
    mounted() {
        this.getPedidos();
    }
}
</script>

<style scoped>
#burger-table {
    max-width: 1400px;
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
    width: 12%;
}

.burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 3px solid #CCC;
}

#burger-table-heading .order-id,
  .burger-table-row .order-number {
    width: 5%;
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
}

.delete-btn:hover {
    background-color: transparent;
    color: #222;
}
</style>