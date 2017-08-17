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


    #containerDiv
        background-color: white
        padding: 3px
        text-align: center

    #title
        font-size: 14pt
</style>

<template>
    <div id="containerDiv"><span id="title">Construction Year</span>
        <div id="slider"></div>
    </div>
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
