<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #internal
        position: relative
        height: 80%
        width: 75%
        border-radius: $pixel-proportion / 2
        +flex(row, n, center, center)

        > .box
            width: 100%
            height: 100%
            background-color: $transparent
            box-shadow: none
            border: none
            +flex(column, n, center, center)

            > h1,
            > h2
                color: $white
                text-shadow: 0 0 30px $black

            > h1
                font-weight: 900
                font-size: 70px
                line-height: 50px

            > .fa-map-marker
                text-shadow: 0 0 30px $black
                font-size: 400px
                color: $white

</style>

<template lang="pug">
    #internal
        .box
            h2.subtitle.is-3.is-marginless Bla bla bla...
            h1.subtitle.is-1.is-marginless.has-text-centered
                | Minha empresa
                br
                | fica aqui
            i.fa.fa-map-marker
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
