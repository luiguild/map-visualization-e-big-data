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
                border: 1px solid #000
                // background-color: #ffffff
                border-radius: $pixel-proportion * 2
                min-width: $pixel-proportion * 32
                min-height: $pixel-proportion * 26
                margin-top: $pixel-proportion * 2
                margin-left: $pixel-proportion * -10
                padding: $pixel-proportion / 2
                padding-left: $pixel-proportion
                content: 'Google Maps'
                font-weight: 900
                font-size: 20px
                position: absolute
                z-index: 9

        .esri
            min-width: $pixel-proportion * 88
            min-height: $pixel-proportion * 38
            margin-top: $pixel-proportion * 2
            margin-bottom: $pixel-proportion * -1.5

        > .box
            width: 100%
            height: 100%
            background-color: transparentize($white, .1)
            box-shadow: none
            border: none
            +flex(column, n, center, center)

            > h1
                font-weight: 900
                font-size: 150px
                line-height: 90px

            .area
                +flex(column, n, center, center)
                position: relative
                z-index: 5
                // border: 1px solid #000
                border-radius: $pixel-proportion
                padding: $pixel-proportion * 2
                margin: $pixel-proportion * 2
                margin-bottom: $pixel-proportion * 3
                // margin-top: $pixel-proportion * 3
                background-color: $color1
                min-width: $pixel-proportion * 40
                min-height: $pixel-proportion * 15

                > h1,
                > h2
                    margin: 0
                    color: $white

        .top
            z-index: 9 !important
</style>

<template lang="pug">
#internal
    .box
        h2.subtitle.is-1.is-marginless.has-text-centered O que é
        h1.title.is-1.is-marginless.has-text-centered GIS?
        h5.subtitle.is-4.is-marginless.has-text-centered Sistema de Informação Geográfica
        h3.subtitle.is-2.is-marginless.has-text-centered Conceitualmente...
        .columns.is-paddingless.esri
            .column.is-marginless.is-paddingless
                .area.top.google
                    h1.title.is-1 Seleção
                    h2.subtitle.is-marginless.is-4 Busca e navegação

                .area
                    h1.title.is-1 Manipulação
                    h2.subtitle.is-marginless.is-4 Criar novos mapas

            .column.is-marginless.is-paddingless
                .area
                    h1.title.is-1 Exploração
                    h2.subtitle.is-marginless.is-4 Modelagem estatística

                .area
                    h1.title.is-1 Confirmação
                    h2.subtitle.is-marginless.is-4 Predição

        h4.subtitle.is-5 Fonte: Interactive techniques and Exploratory Spatial Data Analysis - Anselin (1999)
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'gis-3',
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
