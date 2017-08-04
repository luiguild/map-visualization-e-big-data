<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #internal
        position: relative
        height: 80%
        width: 75%
        border-radius: $pixel-proportion / 2
        +flex(row, n, flex-end, center)

        > .box
            width: 500px
            height: 100%
            background-color: transparentize($white, .3)
            +flex(column, n, center, center)

            h1
                font-weight: 900
</style>

<template lang="pug">
    #internal
        .box
            h1.title.is-1 Luigui Delyer
            h1.subtitle.is-5 (Sim esse é o meu nome.)
            h2.subtitle.is-4.is-marginless.has-text-centered Front-End @ WebRadar
            h2.subtitle.is-4.is-marginless.has-text-centered Reps @ Mozilla
            h2.subtitle.is-4.is-marginless.has-text-centered Criador do ArcEasy, VBar e Tekoá
            h1.subtitle.is-4.is-marginless.has-text-centered
                br
                | Apaixonado pela web
                br
                | desde quando fazia barulho
            h1.subtitle.is-5.is-marginless.has-text-centered
                br
                | Sou daqueles que pagam internet pra ver memes
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({}),
        created: function () {},
        mounted: function () {},
        updated: function () {},
        destroyed: function () {},
        components: {},
        computed: {
            ...mapGetters([]),
            ...mapState({})
        },
        methods: {
            ...mapActions([])
        },
        filters: {},
        watch: {}
    }
</script>
