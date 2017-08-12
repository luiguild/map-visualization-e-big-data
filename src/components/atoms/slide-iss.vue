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
            > h2,
            > h3
                color: $white
                text-shadow: 0 0 30px $black

            > h2
                font-weight: 900
                font-size: 90px

            > h3
                font-weight: 900
                font-size: 25px

            > h1
                font-weight: 900
                font-size: 190px
                line-height: 120px

</style>

<template lang="pug">
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'iss',
                presentation: false,
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
