<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #internal
        position: relative
        height: 80%
        width: 75%
        +flex(column, n, center, center)

        > h1
            font-size: 120px
            font-weight: 900
            line-height: 90px

        > h2
            font-size: 40px
            line-height: 30px
            margin-top: 1px

        > h1,
        > h2
            text-shadow: 0 0 30px $black
            color: $white
            // +upper-case
</style>

<template lang="pug">
    #internal
        h1.title.is-1.has-text-centered
            | Map
            br
            | visualization
            br
            | e Big Data
        h2.subtitle.is-2.has-text-centered
            | Transformando informação em valor,
            br
            | latitude e longitude.
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'cover',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: -34.026807,
                    longitude: 18.350787
                },
                scale: 30000,
                camera: {
                    tilt: 60,
                    heading: 130
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
