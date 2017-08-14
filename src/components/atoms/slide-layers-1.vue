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
            // background-color: transparentize($white, .3)
            background-color: $transparent
            box-shadow: none
            border: none
            +flex(column, n, center, flex-start)

            > h1,
            > h2,
            > h3
                color: $white
                text-shadow: 0 0 20px $black, 0 0 50px $black

            > h2
                font-size: 80px
                line-height: 40px

            > h1
                font-weight: 900
                font-size: 190px
                line-height: 140px
</style>

<template lang="pug">
    #internal
        .box
            h3.subtitle.is-3.is-marginless ESRI ArcGIS
            h1.subtitle.is-1.is-marginless 25 tipos
            h2.subtitle.is-1.is-marginless de layers disponíveis
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'layers-1',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: -31.543327662453358,
                    longitude: 159.0686284905842
                },
                scale: 13497.607197748148,
                camera: {
                    tilt: 0,
                    heading: 30
                },
                basemap: 'satellite',
                layer: []
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
