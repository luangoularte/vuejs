<template>
    <div>
        <h2>Esta é a descriçäo da pessoa: {{ nome }}</h2>
        <InfoPessoa :email="email" :esta_trabalhando=false />
        <FormPessoa />
    </div>

</template>

<script>
    import InfoPessoa from "./InfoPessoa"
    import FormPessoa from "./FormPessoa"

    export default {
        name: "PessoaInfo",
        components: {
            InfoPessoa,
            FormPessoa
        },
        data() {
            return {
                nome: "Luan",
                email: "luan@email.com"
            }
        }
    }

</script>