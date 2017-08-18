<style scoped lang="sass">
    @import ../../sass/imports/_extend


    #colorMixMode
        background-color: transparentize($white, .3)
        border-radius: $pixel-proportion / 2
        padding: $pixel-proportion * 2
        position: absolute
        bottom: $pixel-proportion * 2
        left: $pixel-proportion * 2
        +dont_select

        > input
            margin: $pixel-proportion

        > label
            font-weight: 400
            font-size: 20px

    #colorMixMode label
        padding-right: 10px
        cursor: pointer

</style>

<template lang="pug">
    #colorMixMode
        h1.title.is-4.is-marginless Helsinki Buildings
        input#replace(type="radio", name="mode", checked)
        label(for="replace") Remove texture
        br
        input#original(type="radio", name="mode")
        label(for="original") Buildings with original texture
        br
        input#select(type="radio", name="mode")
        label(for="select") Show commercial buildings
        br
        input#emphasize(type="radio", name="mode")
        label(for="emphasize") Emphasize commercial buildings
        br
        input#desaturate(type="radio", name="mode")
        label(for="desaturate") Desaturate texture
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
                    latitude: 60.168372879265206,
                    longitude: 24.951637093418615
                },
                scale: 3951.002528823407,
                camera: {
                    tilt: 70,
                    heading: 310
                },
                basemap: 'streets'
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
