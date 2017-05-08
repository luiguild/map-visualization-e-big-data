<style lang="sass">
    @import ../../sass/imports/_extend

    #slide
        position: relative
        z-index: 5
        margin-left: auto
        margin-right: auto
        height: 100%
        width: 100%
        +flex(row, n, center, center)
        +transition(.2s)

        > .body
            height: 80%
            width: 75%
            background-color: transparentize($white, .3)
            border-radius: $pixel-proportion / 2

            > .content
                height: 100%
                width: 100%

    .hide
        left: 100%

    .show
        left: 0
</style>

<template lang="pug">
    #slide.show
        .body
            .content(:is="slideComponent")
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'

    export default {
        props: [],
        data: () => ({
            slideComponent: ''
        }),
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
            ...mapMutations([])
        },
        filters: {},
        watch: {}
    }
</script>
