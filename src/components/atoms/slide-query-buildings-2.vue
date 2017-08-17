<style scoped lang="sass">
    @import ../../sass/imports/_extend

</style>

<template lang="html">
    <div id="colorMixMode">
        <input type="radio" id="original" name="mode" checked><label for="original">Buildings with original texture</label><br>
        <input type="radio" id="select" name="mode"><label for="select">Show commercial buildings</label><br>
        <input type="radio" id="emphasize" name="mode"><label for="emphasize">Emphasize commercial buildings</label><br>
        <input type="radio" id="desaturate" name="mode"><label for="desaturate">Desaturate texture</label><br>
        <input type="radio" id="replace" name="mode"><label for="replace">Remove texture</label>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import { queryBuildings2 } from '@/assets/modules/query-buildings-2'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'query-buildings-2',
                // presentation: false,
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: 60.17103237227355,
                    longitude: 24.943004967523876
                },
                scale: 18237.635366885745,
                camera: {
                    tilt: 0,
                    heading: 0
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
                    queryBuildings2()
                }
            }
        }
    }
</script>
