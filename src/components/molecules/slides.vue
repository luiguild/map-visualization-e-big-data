<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #slide
        position: relative
        z-index: 5
        margin-left: auto
        margin-right: auto
        height: 100%
        width: 100%
        +transition(.2s)
        +dont_select

        > .body
            height: 100%
            width: 100%
            +flex(row, n, center, center)

    .hide
        left: 100%

    .show
        left: 0%
</style>

<template lang="pug">
    #slide(:class="toggleSlide")
        .body
            .content(:is="component")
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import * as libESRI from '@/assets/modules'
    import * as logger from '@/assets/modules/logger'
    import slide2 from '../atoms/slide-2'
    import slide3 from '../atoms/slide-3'
    import slide4 from '../atoms/slide-4'

    export default {
        props: [],
        data: () => ({
            visible: false,
            component: '',
            slides: [
                {
                    extent: {},
                    camera: {},
                    basemap: ''
                },
                {
                    coordinates: {
                        latitude: -13.78,
                        longitude: -52.17
                    },
                    scale: 25000000,
                    camera: {
                        tilt: 0,
                        heading: 0
                    },
                    basemap: 'dark-gray'
                },
                {
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
                },
                {
                    coordinates: {
                        latitude: -20.267847,
                        longitude: -50.248642
                    },
                    scale: 20000,
                    camera: {
                        tilt: 65,
                        heading: 40
                    },
                    basemap: 'satellite',
                    symbol: {
                        width: 700,
                        height: 1000,
                        primitive: 'inverted-cone',
                        color: '#E1392F'
                    },
                    point: {
                        x: -50.258994,
                        y: -20.267383,
                        z: 550
                    }
                },
                {
                    coordinates: {
                        latitude: -22.907406,
                        longitude: -43.112915
                    },
                    scale: 20000,
                    camera: {
                        tilt: 70,
                        heading: 250
                    },
                    basemap: 'satellite',
                    symbol: {
                        width: 700,
                        height: 1000,
                        primitive: 'inverted-cone',
                        color: '#E1392F'
                    },
                    point: {
                        x: -43.112443,
                        y: -22.899816,
                        z: 100
                    }
                }
            ]
        }),
        created: function () {},
        mounted: function () {},
        updated: function () {},
        destroyed: function () {},
        components: {
            slide2,
            slide3,
            slide4
        },
        computed: {
            ...mapGetters([]),
            ...mapState({
                actual: state => state.app.actual,
                clear: state => state.app.clear
            }),
            toggleSlide () {
                if (this.visible && this.isClear(this.actual)) {
                    return 'show'
                } else {
                    return 'hide'
                }
            }
        },
        methods: {
            ...mapActions([]),
            isClear (slideId) {
                return this.clear.indexOf(slideId) < 0
            },
            changeMap (slideId) {
                libESRI.view.newPosition(
                    this.slides[slideId].coordinates,
                    this.slides[slideId].scale,
                    this.slides[slideId].camera
                )
                libESRI.view.changeBasemap(
                    this.slides[slideId].basemap
                )
            }
        },
        filters: {},
        watch: {
            actual: function (change) {
                logger.log(`Actual slide: ${change}`)

                if (change > 0) {
                    this.changeMap(change)

                    if (this.isClear(change)) {
                        this.component = `slide-${change}`
                        this.visible = true
                    } else {
                        this.visible = false
                    }

                    if (change === 3 || change === 4) {
                        libESRI.layers.addGraphicLayer(
                            this.slides[change].symbol,
                            this.slides[change].point
                        )
                    }
                } else {
                    this.visible = false
                }
            }
        }
    }
</script>
