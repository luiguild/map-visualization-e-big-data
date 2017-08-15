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
            +flex(column, n, flex-end, flex-end)

            > h1,
            > h4
                font-weight: 900

            > h2
                font-weight: 600

            > h1,
            > h2,
            > h4
                color: $black
                text-align: right
                // text-shadow: 0 0 30px $black, 0 0 50px $black

            > h1
                font-size: 140px
                line-height: 50px
                // text-shadow: 0 0 30px $black
</style>

<template lang="pug">
    #internal
        .box
            h1.subtitle.is-1.is-marginless Vector
            h2.subtitle.is-4
                | Desenho vetorial é o uso
                br
                | de primitivas geométricas como pontos,
                br
                | linhas, curvas e formas ou polígonos
                br
                | - todos os quais são baseados
                br
                | em expressões matemáticas -
                br
                | para representar imagens
                br
                | em computação gráfica.
            h4.subtitle.is-5 Fonte: Wikipédia
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'vector',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: 26.358224064237042,
                    longitude: 127.7831652745187
                },
                scale: 934.4757970933606,
                camera: {
                    tilt: 0,
                    heading: 200
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
