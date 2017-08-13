<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #internal
        position: relative
        height: 80%
        width: 75%
        border-radius: $pixel-proportion / 2
        +flex(row, n, center, center)
        transform: rotate(-40deg)

        > .box
            width: 400px
            height: 100%
            background-color: $transparent
            box-shadow: none
            border: none
            +flex(column, n, center, center)

            > h1,
            > h2
                color: $white
                text-shadow: 0 0 30px $black

            > h1
                font-weight: 900
                font-size: 80px
                line-height: 65px

</style>

<template lang="pug">
    #internal
        .box
            h1.title.is-1.has-text-centered Mapas são poderosos!
            h2.subtitle.is-3.is-marginless ArcGIS (1999)
            h2.subtitle.is-3.is-marginless OpenStreetMap (2004)
            h2.subtitle.is-3.is-marginless Mapbox (2010)
            h2.subtitle.is-3.is-marginless CartoDB (2011)
            h2.subtitle.is-3.is-marginless HERE Maps (2001)
            h2.subtitle.is-3.is-marginless Google Maps (2005)
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'mapas-sao-poderosos',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: 8.956709869641337,
                    longitude: -79.56912269795791
                },
                scale: 7000,
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
