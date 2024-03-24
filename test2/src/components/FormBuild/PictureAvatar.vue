<template>
    <div>
        <img :src="avatar" :alt="descricao">
        <MudarImagem @mudarImagem="trocarImagem"/>
    </div>
</template>

<script>
    import MudarImagem from '../MudarImagem.vue';

    export default {
        name: "PictureAvatar",
        components: {
            MudarImagem
        },
        data() {
            return {
                avatar: "/img/profile.png",
                descricao: "Luan Goularte"
            }
        },
        methods: {
            trocarImagem() {
                this.avatar = "/img/hacker.png"
                
            }
        }
    }
</script>

<style>
    img {
        height: 100px;
    }
</style>