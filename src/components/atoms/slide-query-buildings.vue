<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #containerDiv
        background-color: transparentize($white, .3)
        border-radius: $pixel-proportion / 2
        padding: $pixel-proportion
        position: absolute
        bottom: $pixel-proportion * 2
        left: $pixel-proportion * 2
        text-align: center

        > #title
            font-size: 14pt
</style>

<template lang="pug">
    #containerDiv
        #title Construction Year
        #slider
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import { queryBuildings } from '@/assets/modules/query-buildings'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'query-buildings',
                // presentation: false,
                light: {
                    cameraTracking: true
                },
                camera: {
                    position: {
                        x: -8240208,
                        y: 4965848,
                        z: 960,
                        spatialReference: {
                            wkid: 3857
                        }
                    },
                    heading: 24,
                    tilt: 77
                },
                basemap: 'dark-gray'
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
                    queryBuildings()
                }
            }
        }
    }
</script>
