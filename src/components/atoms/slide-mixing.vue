<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #internal
        position: relative
        height: 80%
        width: 100%
        border-radius: $pixel-proportion / 2
        +flex(row, n, center, center)

        > .box
            width: 100%
            height: 100%
            background-color: $transparent
            box-shadow: none
            border: none
            +flex(column, n, flex-end, center)

            > h1,
            > h4
                font-weight: 900

            > h2
                font-weight: 600
                font-size: 80px

            > h1,
            > h2,
            > h4
                color: $white
                text-align: left
                text-shadow: 0 0 30px $black, 0 0 50px $black

            > h1
                font-size: 140px
                line-height: 50px
                text-shadow: 0 0 30px $black

            > h3
                font-size: 180px
                line-height: 200px
</style>

<template lang="pug">
    #internal
        .box
            h3.subtitle.is-1.is-marginless 😜
            h2.subtitle.is-1.is-marginless dá até pra
            h1.subtitle.is-1.is-marginless misturar
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'mixing',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: 19.41982543403911,
                    longitude: -99.0880133310566
                },
                scale: 2515,
                camera: {
                    tilt: 0,
                    heading: 0
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
