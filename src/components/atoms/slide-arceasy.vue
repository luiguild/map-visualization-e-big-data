<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #internal
        position: relative
        height: 80%
        width: 56%
        border-radius: $pixel-proportion / 2
        +flex(row, n, flex-end, center)

        > .box
            width: 100%
            height: 100%
            // background-color: transparentize($white, .3)
            background-color: $white
            +flex(column, n, center, center)

            > h1
                font-weight: 900
                font-size: 80px

            > .links-group
                width: 80%
                +flex(row, n, space-around, center)
                margin-top: $pixel-proportion * 2
                margin-bottom: $pixel-proportion * 2
</style>

<template lang="pug">
    #internal
        .box
            img.paintbrush(src="static/img/arceasy.png")
            h3.subtitle.is-2.is-marginless.has-text-centered github.com/luiguild/arceasy
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'arceasy',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: 8.956709869641337,
                    longitude: -79.56912269795791
                },
                scale: 10000000000,
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
