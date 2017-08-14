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

            .emoji
                font-size: 150px
                margin-top: $pixel-proportion * -12
                margin-bottom: $pixel-proportion * -10

            .title
                margin-top: 0

            > h1,
            > h2
                color: $black
                // text-shadow: 0 0 30px $black

            > h2
                font-weight: 900
                font-size: 100px

            > h1
                font-weight: 900
                font-size: 190px
                line-height: 120px
</style>

<template lang="pug">
    #internal
        .box
            .emoji 🤔
            h2.title.is-2.is-marginless.has-text-centered.npidescri Big Data e IoT...
            h1.subtitle.is-3.is-marginless.npi ...que IoT?
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'webradar-3',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: -22.962179,
                    longitude: -43.182069
                },
                scale: 20000,
                camera: {
                    tilt: 77,
                    heading: 65
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
