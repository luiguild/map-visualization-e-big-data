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
            .title
                font-size: 300px
                line-height: 250px
</style>

<template lang="pug">
    #internal
        .box
            h1.title.is-1.is-marginless JS
            h1.subtitle.is-1.is-marginless Vue, Pug e SASS
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'stack',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: -22.915,
                    longitude: -43.105
                },
                scale: 20000,
                camera: {
                    tilt: 70,
                    heading: 200
                },
                basemap: 'satellite',
                symbol: {
                    width: 700,
                    height: 1000,
                    primitive: 'inverted-cone',
                    color: '#E1392F'
                },
                point: {
                    x: -43.112443,
                    y: -22.899816,
                    z: 100
                }
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
