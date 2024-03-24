<template>
    <form action="" @submit="enviarFormulario($event)">
        <div>
            <input type="text" v-model="name">
        </div>
        <div>
            <input type="text" v-model="email">
        </div>        
        <div>
            <SubmitBtn />
        </div>        
    </form>
</template>

<script>
    //import InputText from "./FormBuild/InputText.vue"
    import SubmitBtn from "./FormBuild/SubmitBtn.vue"

    export default {
        name: "FormPessoa",
        components: {
            //InputText,
            SubmitBtn
        },
        data() {
            return {
                name: "",
                email: ""
            }
        },
        methods: {
            enviarFormulario(e) {

                e.preventDefault();

                const name = this.name;
                const email = this.email;

                console.log("Formulário Enviado!")

                console.log("O nome é: " + name)
                console.log("O email é: " + email)
            }
        }
    }
</script>