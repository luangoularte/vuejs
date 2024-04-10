<template>
  <div class="main-container">
    <h1>Gerenciar pedidos:</h1>
    <DashboardPedidos />
  </div>
</template>


<script>
import DashboardPedidos from '../components/DashboardPedidos.vue';

export default {
  name: "PedidosView",
  components: {
    DashboardPedidos
  },
  mounted() {
    document.title = 'Pedidos';
  }
}
</script>
