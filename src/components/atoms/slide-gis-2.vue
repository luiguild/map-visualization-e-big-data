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
                font-size: 150px
                line-height: 90px

            .area
                +flex(row, n, center, center)
                // border: 1px solid #000
                border-radius: $pixel-proportion
                padding: $pixel-proportion * 4
                margin: $pixel-proportion * 2
                margin-bottom: $pixel-proportion * 3
                // margin-top: $pixel-proportion * 3
                background-color: $color1

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
        h3.subtitle.is-2.is-marginless.has-text-centered Conceitualmente...
        .columns.is-marginless.is-paddingless
            .column.is-marginless.is-paddingless
                .area
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
                id: 'gis-2',
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
