<template>
    <div>
        <p>{{ email }}</p>
        <p v-if="esta_trabalhando">Estou trabalhando no momento</p>
        <p v-else> Estou em buscas de novas oportunidades!</p>
        <p>Utilizo as seguintes tecnologias:</p>
        <ul>
            <li v-for="(tecnologia, index) in tecnologias_back" v-bind:key="index">
                {{ tecnologia }}
            </li>
        </ul>
        <p>Utilizo as seguintes tecnologias para front-end</p>
        <ul>
            <li v-for="tecnologia in tecnologias_front" v-bind:key="tecnologia.id">
                {{ tecnologia.tecnologia }}
            </li>
        </ul>
        <div>
            <button @click="showEmail">{{texto_botao}}</button>
        </div>
        <input type="checkbox" id="email" v-model="mostrar_email">Mostrar email
        <p v-show="mostrar_email">Mande mensagem para: {{ email }}</p>
        <p>Para acessar meu portfólio <a v-bind:href="meu_link" target="_blank">clique aqui</a></p>
        <PictureAvatar />
    </div>
</template>

<script>
    import PictureAvatar from "./FormBuild/PictureAvatar.vue"

    export default {
        name: "InfoPessoa",
        components: {
            PictureAvatar
        },
        props: {
            email: String,
            esta_trabalhando: Boolean
        },
        data() {
            return {
                mostrar_email: true,
                meu_link: "https://luangoularte.github.io/portfolio/",
                texto_botao: "Mostrar email",
                tecnologias_back: ["PHP", "Laravel"],
                tecnologias_front: [
                    {id: 1, tecnologia: "HTML"},
                    {id: 2, tecnologia: "CSS"},
                    {id: 3, tecnologia: "Vue"},
                ]
            }
        },
        methods: {
            showEmail() {
                this.mostrar_email = !this.mostrar_email
                if(!this.mostrar_email) {
                    this.texto_botao = "Mostrar email"
                } else {
                    this.texto_botao = "Esconder email"
                }
            }
        }
    }
</script>