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
                <div>Ações:</div>
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
                        <li v-for="(opcional, index) in burger.opcionais" :key="index">{{ opcional }}</li>
                    </ul>
                </div>
                <div>
                    <select name="status" class="status" @change="updateBurger($event, burger.id)">
                        <option v-for="status in status" :key="status.id" :value="status.tipo" :selected="burger.status == status.tipo">{{ status.tipo }}</option>
                    </select>
                    <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MessageSystem from "./MessageSystem.vue";

export default {
    name: "DashboardPedidos",
    data() {
        return {
            burgers: null,
            burger_id: null,
            status: [],
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

            this.getStatus();
        },
        async getStatus() {
            const require = await fetch("http://localhost:3000/status");

            const data = await require.json();

            this.status = data;

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

            const dataJson = JSON.stringify({ status: option });

            const require = await fetch(`http://localhost:3000/burgers/${id}`, {
                method: "PATCH",
                headers: { "Content-Type" : "application/json" },
                body: dataJson
            });

            const result = await require.json();

            this.msg = `O pedido ${result.id} foi alterado para ${result.status}!`;

            setTimeout(() => this.msg= "", 3000);

            this.sending(result.status, result.nome);

            console.log(result);
        },
        sending(status, nome) {
            var amqp = require('amqplib/callback_api');

            amqp.connect('amqp://localhost', function(error0, connection) {
                if (error0) {
                    throw error0;
                }
                connection.createChannel(function(error1, channel) {
                    if (error1) {
                    throw error1;
                    }
                    var queue = 'hello';
                    var msg = status;

                    channel.assertQueue(queue, {
                    durable: false
                    });

                    channel.sendToQueue(queue, Buffer.from(msg));
                    console.log('Prezado ' + nome + " seu pedido está ", msg);
                });
            });
            setTimeout(function() {
                connection.close();
                process.exit(0)
            }, 500);
        }
    },
    mounted() {
        this.getPedidos();
    }
}
</script>

<style scoped>
#burger-table {
    max-width: 1200px;
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
    width: 19%;
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
    width: 40%;
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