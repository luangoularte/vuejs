<template>
    <div>
        <button @click="primeiro(txt1), segundo(txt2), terceiro()">Ativar Múltiplos eventos</button>
        <p>{{ multiplos_eventos }}</p>
    </div>
</template>

<script>
    export default {
        name: "MultiplosEventos",
        data() {
            return {
                multiplos_eventos: "",
                txt1: "Primeiro evento",
                txt2: "Segundo evento"
            }
        },
        methods: {
            primeiro(txt) {
                this.multiplos_eventos = txt
            },
            segundo(txt) {
                setTimeout(() => this.multiplos_eventos = txt, 1000)
            },
            terceiro() {
                setTimeout(() => this.multiplos_eventos = "", 2000)
            }

        }
    }
</script>