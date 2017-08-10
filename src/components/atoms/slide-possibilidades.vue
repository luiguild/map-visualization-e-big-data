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
            background-color: transparentize($white, .3)
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
            h1.subtitle.is-1.has-text-centered O que mais podemos fazer?
            h2.subtitle.is-3.is-marginless Pontos de interesse (POI)
            h2.subtitle.is-3.is-marginless Geocode reverso
            h2.subtitle.is-3.is-marginless Traçar rotas e cruzar informações
            h2.subtitle.is-3.is-marginless Controle logístico
            h2.subtitle.is-3.is-marginless Camadas de dados diversos
            h2.subtitle.is-3.is-marginless Projeção de prédios, monumentos
            h2.subtitle.is-3.is-marginless Qualquer coisa do mundo real
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'possibilidades',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: 82.42876297646607,
                    longitude: -74.92952491669847
                },
                scale: 10000000,
                camera: {
                    tilt: 90,
                    heading: 0
                },
                basemap: 'satellite'
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
