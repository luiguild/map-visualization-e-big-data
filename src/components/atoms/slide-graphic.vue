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
            +flex(column, n, flex-end, flex-start)

            > h1,
            > h4
                font-weight: 900

            > h2
                font-weight: 600

            > h1,
            > h2,
            > h4
                color: $white
                text-align: left
                // text-shadow: 0 0 30px $black, 0 0 50px $black

            > h1
                font-size: 140px
                line-height: 50px
                // text-shadow: 0 0 30px $black
</style>

<template lang="pug">
    #internal
        .box
            h1.subtitle.is-1.is-marginless Graphic
            h2.subtitle.is-4
                | Pode conter mais de um tipo de geometria,
                br
                | como por exemplo, pontos, linhas, polígonos
                br
                | e vetores geométricos discretos
                br
                | que representam fenômenos no mundo real.
            h4.subtitle.is-5 Fonte: ESRI
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'graphic',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: 51.92048334432284,
                    longitude: 4.4907825367537475
                },
                scale: 1541.5135403876832,
                camera: {
                    tilt: 0,
                    heading: 170
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
