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
            +flex(column, n, center, flex-start)

            > h1,
            > h4
                font-weight: 900

            > h2
                font-weight: 600

            > h1,
            > h2,
            > h4
                color: $white
                text-shadow: 0 0 30px $black, 0 0 50px $black

            > h1
                font-size: 140px
                line-height: 50px
                text-shadow: 0 0 30px $black
</style>

<template lang="pug">
    #internal
        .box
            h1.subtitle.is-1.is-marginless Raster
            h2.subtitle.is-3 Dados raster (ou bitmap, que significa mapa de bits em inglês) são imagens que contêm a descrição de cada pixel, em oposição aos gráficos vectoriais.
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
                    latitude: 32.15374182439417,
                    longitude: -110.83275709143412
                },
                scale: 9413.008210296684,
                camera: {
                    tilt: 0,
                    heading: 0
                },
                basemap: 'satellite',
                layer: ['99 - WCDMA RSSI']
            }
        }),
        mounted: function () {
            this.checkSlide()
        },
        computed: {
            ...mapGetters([
                'slides'
            ]),
            ...mapState({
                actual: state => state.app.actual
            })
        },
        methods: {
            ...mapActions([
                'actualSlide'
            ]),
            checkSlide () {
                const slide = this.slides[this.actual]
                if (slide === this.info.id) {
                    this.actualSlide(this.info)
                }
            }
        }
    }
</script>
