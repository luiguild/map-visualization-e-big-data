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
            > h2
                color: $white
                text-shadow: 0 0 30px $black

            > h2
                font-weight: 400
                font-size: 60px

            > h1
                font-weight: 900
                font-size: 100px
                line-height: 50px
</style>

<template lang="pug">
    #internal
        .box
            h2.subtitle.is-1.has-text-centered.is-marginless
                | Se tem 3D...
                br
            h1.subtitle.is-1.has-text-centered.is-marginless
                | Tem three.js!
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'possibilidades-3d',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: -13.78,
                    longitude: -52.17
                },
                scale: 250000000,
                camera: {
                    tilt: 0,
                    heading: 0
                },
                basemap: 'satellite'
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
