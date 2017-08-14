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
                margin-top: $pixel-proportion * -5
                margin-bottom: $pixel-proportion * -10

            .title
                margin-top: 0

            > h1,
            > h2
                color: $black
                // text-shadow: 0 0 30px $black

            > h2
                font-weight: 900
                font-size: 60px

            > h1
                font-weight: 900
                font-size: 120px
                line-height: 80px
</style>

<template lang="pug">
    #internal
        .box
            .emoji 👀
            h1.title.is-1.has-text-centered
                | O que mais
                br
                | dá pra fazer?
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
                    latitude: -20.264693,
                    longitude: -50.574931
                },
                scale: 500000,
                camera: {
                    tilt: 0,
                    heading: 0
                },
                basemap: 'osm'
                // layer: ['Cities Rendered Outline White']
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
