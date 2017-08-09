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
            background-color: transparentize($white, .1)
            box-shadow: none
            border: none
            +flex(column, n, center, center)

            > h1,
            > h2
                // color: $white
                // text-shadow: 0 0 30px $black

            > h1
                font-weight: 900
                font-size: 70px
                line-height: 50px
</style>

<template lang="pug">
    #internal
        .box
            h1.subtitle.is-1.is-marginless.has-text-centered Raster Layer
            h2.subtitle.is-4.has-text-centered Dados raster (ou bitmap, que significa mapa de bits em inglês) são imagens que contêm a descrição de cada pixel, em oposição aos gráficos vectoriais.
            h2.subtitle.is-4.has-text-centered O tratamento de imagens deste tipo requer ferramentas especializadas, geralmente utilizadas em fotografia, pois envolvem cálculos muito complexos, como interpolação, álgebra matricial, etc.
            h4.subtitle.is-5 Fonte: Wikipédia
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'raster',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: -22.96828010586395,
                    longitude: -43.18386017139429
                },
                scale: 7245,
                camera: {
                    tilt: 70,
                    heading: 0
                },
                basemap: 'satellite',
                layer: ['99 - WCDMA RSSI']
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
