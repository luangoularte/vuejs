<template>
    <div>
        <h1>Olá Vue</h1>
        <p>Meu nome é {{ nome }} e trabalho como {{ profissao }}</p>
        <MultiplosEventos />
        <ReutilizacaoComponente />
    </div>
</template>

<script>
    import MultiplosEventos from "./MultiplosEventos"
    import ReutilizacaoComponente from './ReutilizacaoComponente.vue'

    export default {
        name: "PrimeiroComponente",
        components: {
            MultiplosEventos,
            ReutilizacaoComponente
        },
        data() {
            return {
                nome: "Luan",
                profissao: "Programador"
            }
        }
    }
</script>