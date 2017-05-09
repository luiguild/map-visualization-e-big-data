<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #internal
        position: relative
        height: 80%
        width: 75%
        border-radius: $pixel-proportion / 2
        +flex(row, n, flex-start, center)

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
            h1.subtitle.is-5 (Sim, isso é um nome)
            h1.subtitle.is-2.is-marginless JavaScript <3
            h1.subtitle.is-3.is-marginless VueJS <3
            h2.subtitle.is-4.is-marginless.has-text-centered Angular 1x, jQuery, HTML5, PugLang, CSS3, LESS, SASS, PHP, MySQL, Postgres, MariaDB, Firebase, C#, Lua e Python
            h2.subtitle.is-4.has-text-centered Já fui designer gráfico e adoro UI.
            h2.subtitle.is-4.has-text-centered.is-marginless De vez em quando cozinha e tem vida além da informática.
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
