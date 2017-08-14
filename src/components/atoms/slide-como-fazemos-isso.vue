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
            +flex(column, n, center, center)

            > h1,
            > h2
                color: $white
                text-shadow: 0 0 30px $black

            > h2
                font-size: 70px
                line-height: 70px

            > h1
                font-weight: 900
                font-size: 170px
                line-height: 100px
</style>

<template lang="pug">
    #internal
        .box
            h2.subtitle.is-3.is-marginless Como fazemos isso?
            h1.subtitle.is-1.is-marginless.has-text-centered Layers!
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'como-fazemos-isso',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: 25.12042267976343,
                    longitude: 55.13135616354976
                },
                scale: 10792,
                camera: {
                    tilt: 0,
                    heading: 340
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
