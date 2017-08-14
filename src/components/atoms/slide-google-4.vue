<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #internal
        position: relative
        height: 80%
        width: 75%
        border-radius: $pixel-proportion / 2
        +flex(row, n, center, center)

        .column
            margin: $pixel-proportion * 2
            overflow: hidden
            height: 210px
            width: 210px

            > .title
                +flex(row, n, center, center)
                height: 200px
                font-size: 120px
                color: $black-3

            .paintbrush,
            .phothoshop
                height: 200px
                max-width: 200px !important

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
                font-size: 150px
                line-height: 90px

            .area
                +flex(row, n, center, center)
                position: relative
                z-index: 9
                // border: 1px solid #000
                border-radius: $pixel-proportion
                padding: $pixel-proportion * 4
                margin: $pixel-proportion * 2
                margin-bottom: $pixel-proportion * 3
                // margin-top: $pixel-proportion * 3
                background-color: $color1
                min-width: $pixel-proportion * 40
                min-height: $pixel-proportion * 15

                > h1
                    margin: 0
                    color: $white
</style>

<template lang="pug">
#internal
    .box
        h2.subtitle.is-1.is-marginless.has-text-centered Tipo assim...
        .columns
            .column
                img.paintbrush(src="static/img/react.png")
            .column
                h1.title.is-1 X
            .column
                img.phothoshop(src="static/img/vue.png")
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'gis-google',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: 51.498460195338005,
                    longitude: -0.027955641775762194
                },
                scale: 34288,
                camera: {
                    tilt: 0,
                    heading: 0
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
