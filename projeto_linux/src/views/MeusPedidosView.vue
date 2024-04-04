<template>
    <div class="main-container">
        <h1>Meus Pedidos Ativos:</h1>
        <DashboardPedidos />
    </div>
</template>


<script>
import DashboardPedidos from '../components/DashboardPedidos.vue';

export default {
    name: "MeusPedidosView.vue",
    components: {
        DashboardPedidos
    }
}
</script>