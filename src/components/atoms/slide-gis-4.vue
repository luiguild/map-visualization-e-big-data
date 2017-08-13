<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #internal
        position: relative
        height: 80%
        width: 75%
        border-radius: $pixel-proportion / 2
        +flex(row, n, center, center)

        .google
            &::before
                border: 1px dashed #000
                // background-color: #ffffff
                border-radius: $pixel-proportion * 2
                min-width: $pixel-proportion * 42
                min-height: $pixel-proportion * 20
                margin-top: $pixel-proportion * -3
                padding: $pixel-proportion / 2
                padding-left: $pixel-proportion
                content: 'Google Maps'
                font-weight: 900
                font-size: 20px
                position: absolute
                z-index: -1
                opacity: 0.3

        .esri
            min-width: $pixel-proportion * 88
            min-height: $pixel-proportion * 38
            margin-top: $pixel-proportion * 8

            &::before
                border: 1px solid #000
                // background-color: #ffffff
                border-radius: $pixel-proportion * 2
                min-width: $pixel-proportion * 88
                min-height: $pixel-proportion * 44.5
                margin-top: $pixel-proportion * -7.5
                padding: $pixel-proportion / 2
                padding-left: $pixel-proportion
                content: 'ESRI ArcGIS'
                font-weight: 900
                font-size: 25px
                position: absolute
                // z-index: -1

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
                font-size: 150px
                line-height: 90px

            .area
                +flex(row, n, center, center)
                position: relative
                z-index: 9
                // border: 1px solid #000
                border-radius: $pixel-proportion
                padding: $pixel-proportion * 4
                margin: $pixel-proportion * 2
                margin-bottom: $pixel-proportion * 3
                // margin-top: $pixel-proportion * 3
                background-color: $color1
                min-width: $pixel-proportion * 40
                min-height: $pixel-proportion * 15

                > h1
                    margin: 0
                    color: $white
</style>

<template lang="pug">
#internal
    .box
        h2.subtitle.is-1.is-marginless.has-text-centered O que é
        h1.title.is-1.is-marginless.has-text-centered GIS?
        h5.subtitle.is-4.is-marginless.has-text-centered Sistema de Informação Geográfica
        .columns.is-paddingless.esri
            .column.is-marginless.is-paddingless
                .area.google
                    h1.title.is-1 Seleção

                .area
                    h1.title.is-1 Manipulação
            .column.is-marginless.is-paddingless
                .area
                    h1.title.is-1 Exploração

                .area
                    h1.title.is-1 Confirmação
        h4.subtitle.is-5 Fonte: Análise Espacial - Anselin (1999)
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'gis-4',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: 51.498460195338005,
                    longitude: -0.027955641775762194
                },
                scale: 34288,
                camera: {
                    tilt: 0,
                    heading: 0
                },
                basemap: 'osm'
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
