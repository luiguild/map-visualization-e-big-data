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
            +flex(column, n, center, center)

            > h1,
            > h4
                font-weight: 900

            > h2
                font-weight: 600
                margin-top: $pixel-proportion

            > h1,
            > h2,
            > h4
                text-align: center
                color: $white
                text-shadow: 0 0 10px darken(#927A60, 30%), 0 0 10px darken(#927A60, 20%), 0 0 30px darken(#927A60, 20%), 0 0 50px darken(#927A60, 20%)

            > h1
                font-size: 140px
                line-height: 90px
                text-shadow: 0 0 20px #927A60

</style>

<template lang="pug">
    #internal
        .box
            h1.subtitle.is-1.is-marginless Scene
            h2.subtitle.is-4
                | Especializado em Big Data, um SceneLayer pode armazenar
                br
                | volumes gigantes de dados e é focado em transmissão de rede.
                br
                | O carregamento é feito de forma progressiva,
                br
                | começando por representações grosseiras
                br
                | e refinando-as para detalhes mais altos,
                br
                | conforme necessário, para exibições de close-up.
            h4.subtitle.is-5 Fonte: ESRI
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'scene',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: 39.68893164125936,
                    longitude: -115.99675686359959
                },
                scale: 28823.710975184335,
                camera: {
                    tilt: 0,
                    heading: 150
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
