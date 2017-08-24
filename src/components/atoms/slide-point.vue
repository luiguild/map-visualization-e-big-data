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
                margin-top: $pixel-proportion

            > h1,
            > h2,
            > h4
                color: $black
                text-shadow: 0 0 30px $white, 0 0 30px $white

            > h1
                font-size: 140px
                line-height: 90px
                // text-shadow: 0 0 30px $black

</style>

<template lang="pug">
    #internal
        .box
            h1.subtitle.is-1.is-marginless
                | Point
                br
                | Cloud
            h2.subtitle.is-4
                | É um conjunto de dados do tipo vetor
                br
                | organizados espacialmente após um processo específico
                br
                | de captura feito por aviões utilizando lasers,
                br
                | que consiste em grandes coleções
                br
                | de pontos 3D que é capaz de descrever as elevações do solo,
                br
                | os prédios, o desfiladeiro da floresta, as sobrepassagens da estrada
                br
                | e qualquer outra coisa captada no mundo real.
            h4.subtitle.is-5 Fonte: ESRI
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'point',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: 44.52461513861035,
                    longitude: -110.83637192874254
                },
                scale: 2599.208090318984,
                camera: {
                    tilt: 0,
                    heading: 220
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
