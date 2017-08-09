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
            // background-color: transparentize($white, .1)
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
                font-size: 170px
                line-height: 160px

            > h2
                font-size: 30px
</style>

<template lang="pug">
    #internal
        .box
            h1.subtitle.is-1.is-marginless.has-text-centered Perguntas?
            h2.subtitle.is-4.has-text-centered.is-marginless Eu espero fortemente que isso tudo que você viu
            h2.subtitle.is-4.has-text-centered.is-marginless tenha te gerado alguma dúvida...
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'perguntas',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: 8.956709869641337,
                    longitude: -79.56912269795791
                },
                scale: 10000000000,
                camera: {
                    tilt: 90,
                    heading: 0
                },
                basemap: 'satellite'
            }
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
            ...mapActions([])
        },
        filters: {},
        watch: {}
    }
</script>
