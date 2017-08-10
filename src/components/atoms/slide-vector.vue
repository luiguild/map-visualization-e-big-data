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
            h1.subtitle.is-1.is-marginless.has-text-centered Vector Layer
            h2.subtitle.is-4.has-text-centered Desenho vetorial é o uso de primitivas geométricas como pontos, linhas, curvas e formas ou polígonos - todos os quais são baseados em expressões matemáticas - para representar imagens em computação gráfica.
            h2.subtitle.is-4.has-text-centered Os desenhos vetoriais são baseados em vetores (também chamados de caminhos), que conduzem através de locais chamados pontos de controle ou nós. Cada um desses pontos possui uma posição definida nos eixos x e y do plano de trabalho e determinam a direção do caminho.
            h2.subtitle.is-4.has-text-centered Além disso, a cada caminho pode ser atribuído uma cor de traço, forma, espessura e preenchimento.
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
                    latitude: -18.407171901856543,
                    longitude: -51.98852640010841
                },
                scale: 25766491,
                camera: {
                    tilt: 10,
                    heading: 0
                },
                basemap: 'streets',
                layer: ['States Colors']
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
