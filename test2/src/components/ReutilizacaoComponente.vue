<template>
    <div>
        <button @click="ativar">{{mensagem_btn}}</button>
        <span v-show="ativou">Ativado!</span>
    </div>
</template>

<script>
    export default {
        name: "ReutilizacaoComponente",
        data() {
            return {
                ativou: false,
                mensagem_btn: "Clique aqui para ativar"
            }
        },
        methods: {
            ativar() {
                this.ativou = !this.ativou

                if(this.ativou) {
                    this.mensagem_btn = "Clique aqui para desativar"
                } else {
                    this.mensagem_btn = "Clique aqui para ativar"
                }
            }
        }
    }
</script>