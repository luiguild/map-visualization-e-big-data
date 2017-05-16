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
    import slide5 from '../atoms/slide-5'
    import slide6 from '../atoms/slide-6'
    import slide9 from '../atoms/slide-9'
    import slide10 from '../atoms/slide-10'
    import slide11 from '../atoms/slide-11'
    import slide12 from '../atoms/slide-12'
    import slide17 from '../atoms/slide-17'
    import slide18 from '../atoms/slide-18'
    import slide23 from '../atoms/slide-23'
    import slide27 from '../atoms/slide-27'
    import slide28 from '../atoms/slide-28'

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
                    title: 'welcome',
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
                    title: 'cover',
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
                    title: 'mind blown',
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
                    title: 'about',
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
                    title: 'stack',
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
                },
                {
                    title: 'webradar',
                    coordinates: {
                        latitude: -22.962179,
                        longitude: -43.182069
                    },
                    scale: 20000,
                    camera: {
                        tilt: 77,
                        heading: 65
                    },
                    basemap: 'satellite',
                    symbol: {
                        width: 700,
                        height: 1000,
                        primitive: 'inverted-cone',
                        color: '#E1392F'
                    },
                    point: {
                        x: -43.181262,
                        y: -22.953917,
                        z: 100
                    }
                },
                {
                    title: 'sygic - hong kong',
                    coordinates: {
                        latitude: 22.29832407873191,
                        longitude: 114.1549925655292
                    },
                    scale: 60000,
                    camera: {
                        tilt: 65,
                        heading: 20
                    },
                    basemap: 'satellite',
                    layer: ['Sygic Global']
                },
                {
                    title: '99 SP',
                    coordinates: {
                        latitude: -23.56289384931269,
                        longitude: -46.6547070000082
                    },
                    scale: 10000,
                    camera: {
                        tilt: 0,
                        heading: 0
                    },
                    basemap: 'gray',
                    layer: ['99 - LTE RSSI - São Paulo']
                },
                {
                    title: 'mapas são poderosos',
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
                },
                {
                    title: 'esri',
                    coordinates: {
                        latitude: 8.956709869641337,
                        longitude: -79.56912269795791
                    },
                    scale: 10000000000,
                    camera: {
                        tilt: 90,
                        heading: 0
                    },
                    basemap: 'satellite'
                },
                {
                    title: 'ma utilização',
                    coordinates: {
                        latitude: -12.13479271004742,
                        longitude: -39.35211653166833
                    },
                    scale: 10000,
                    camera: {
                        tilt: 75,
                        heading: 0
                    },
                    basemap: 'satellite'
                },
                {
                    title: 'possibilidades',
                    coordinates: {
                        latitude: 82.42876297646607,
                        longitude: -74.92952491669847
                    },
                    scale: 10000000,
                    camera: {
                        tilt: 90,
                        heading: 0
                    },
                    basemap: 'satellite'
                },
                {
                    title: 'cidades - fernandópolis e região',
                    coordinates: {
                        latitude: -20.264693,
                        longitude: -50.574931
                    },
                    scale: 500000,
                    camera: {
                        tilt: 0,
                        heading: 0
                    },
                    basemap: 'hybrid',
                    layer: ['Cities']
                },
                {
                    title: 'cidades - fernandópolis e região',
                    coordinates: {
                        latitude: -20.264693,
                        longitude: -50.574931
                    },
                    scale: 500000,
                    camera: {
                        tilt: 0,
                        heading: 0
                    },
                    basemap: 'none',
                    layer: ['Cities Rendered White']
                },
                {
                    title: 'cidades - fernandópolis e região',
                    coordinates: {
                        latitude: -20.264693,
                        longitude: -50.574931
                    },
                    scale: 500000,
                    camera: {
                        tilt: 0,
                        heading: 0
                    },
                    basemap: 'hybrid',
                    layer: ['Cities Rendered Colors']
                },
                {
                    title: 'cidades - fernandópolis e região',
                    coordinates: {
                        latitude: -20.264693,
                        longitude: -50.574931
                    },
                    scale: 800000,
                    camera: {
                        tilt: 45,
                        heading: 320
                    },
                    basemap: 'hybrid',
                    layer: ['Cities Rendered 3D']
                },
                {
                    title: 'como fazemos isso?',
                    coordinates: {
                        latitude: -20.264693,
                        longitude: -50.574931
                    },
                    scale: 800000,
                    camera: {
                        tilt: 45,
                        heading: 320
                    },
                    basemap: 'hybrid',
                    layer: ['Cities Rendered 3D']
                },
                {
                    title: '99 RJ',
                    coordinates: {
                        latitude: -22.96828010586395,
                        longitude: -43.18386017139429
                    },
                    scale: 7245,
                    camera: {
                        tilt: 70,
                        heading: 0
                    },
                    basemap: 'satellite',
                    layer: ['99 - WCDMA RSSI']
                },
                {
                    title: '99 RJ',
                    coordinates: {
                        latitude: -22.96828010586395,
                        longitude: -43.18386017139429
                    },
                    scale: 7245,
                    camera: {
                        tilt: 70,
                        heading: 0
                    },
                    basemap: 'satellite',
                    layer: ['99 - WCDMA RSSI']
                },
                {
                    title: 'sygic - paris',
                    coordinates: {
                        latitude: 48.852863866307175,
                        longitude: 2.3002438471155084
                    },
                    scale: 81707,
                    camera: {
                        tilt: 0,
                        heading: 0
                    },
                    basemap: 'satellite',
                    layer: ['Sygic Global']
                },
                {
                    title: 'distance to supermarkets',
                    coordinates: {
                        latitude: -23.613076481195602,
                        longitude: -46.70495241560792
                    },
                    scale: 19083,
                    camera: {
                        tilt: 0,
                        heading: 0
                    },
                    basemap: 'streets',
                    layer: ['Distance to Supermarkets'],
                    opacity: 50
                },
                {
                    title: 'land use',
                    coordinates: {
                        latitude: -23.594297204885137,
                        longitude: -46.70318280923385
                    },
                    scale: 10079,
                    camera: {
                        tilt: 0,
                        heading: 0
                    },
                    basemap: 'streets',
                    layer: ['Land Use São Paulo'],
                    opacity: 60
                },
                {
                    title: 'states',
                    coordinates: {
                        latitude: -18.407171901856543,
                        longitude: -51.98852640010841
                    },
                    scale: 25766491,
                    camera: {
                        tilt: 10,
                        heading: 0
                    },
                    basemap: 'streets',
                    layer: ['States']
                },
                {
                    title: 'states colors',
                    coordinates: {
                        latitude: -18.407171901856543,
                        longitude: -51.98852640010841
                    },
                    scale: 25766491,
                    camera: {
                        tilt: 10,
                        heading: 0
                    },
                    basemap: 'streets',
                    layer: ['States Colors']
                },
                {
                    title: 'states 3d',
                    coordinates: {
                        latitude: -11.390017686219654,
                        longitude: -52.31754424776893
                    },
                    scale: 33815017,
                    camera: {
                        tilt: 10,
                        heading: 0
                    },
                    basemap: 'streets',
                    layer: ['States 3D']
                },
                {
                    title: 'parque do povo',
                    coordinates: {
                        latitude: -23.58898691852486,
                        longitude: -46.691044527252934
                    },
                    scale: 4500,
                    camera: {
                        tilt: 60,
                        heading: 140
                    },
                    basemap: 'satellite',
                    layer: ['99 - LTE RSSI - São Paulo', '3D Buildings São paulo Throughput']
                },
                {
                    title: 'perguntas',
                    coordinates: {
                        latitude: 8.956709869641337,
                        longitude: -79.56912269795791
                    },
                    scale: 10000000000,
                    camera: {
                        tilt: 90,
                        heading: 0
                    },
                    basemap: 'satellite'
                },
                {
                    title: 'encerramento',
                    coordinates: {
                        latitude: 8.956709869641337,
                        longitude: -79.56912269795791
                    },
                    scale: 10000000000,
                    camera: {
                        tilt: 90,
                        heading: 0
                    },
                    basemap: 'satellite'
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
            slide4,
            slide5,
            slide6,
            slide9,
            slide10,
            slide11,
            slide12,
            slide17,
            slide18,
            slide23,
            slide27,
            slide28
        },
        computed: {
            ...mapGetters([]),
            ...mapState({
                actual: state => state.app.actual,
                clear: state => state.app.clear,
                visibility: state => state.app.visibility
            }),
            toggleSlide () {
                if (this.visibility) {
                    if (this.visible && this.isClear(this.actual)) {
                        return 'show'
                    } else {
                        return 'hide'
                    }
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
                libESRI.layers.hideAll()

                if (this.slides[slideId].coordinates !== undefined &&
                    this.slides[slideId].scale !== undefined &&
                    this.slides[slideId].camera !== undefined) {
                    libESRI.view.newPosition(
                        this.slides[slideId].coordinates,
                        this.slides[slideId].scale,
                        this.slides[slideId].camera
                    )
                }

                if (this.slides[slideId].basemap !== undefined) {
                    libESRI.view.changeBasemap(
                        this.slides[slideId].basemap
                    )
                }

                if (this.slides[slideId].symbol !== undefined) {
                    libESRI.layers.addGraphicLayer(
                        this.slides[slideId].symbol,
                        this.slides[slideId].point
                    )
                }

                if (this.slides[slideId].layer !== undefined) {
                    this.slides[slideId].layer.forEach((cur, indx, arr) => {
                        libESRI.layers.visibility(
                            cur,
                            true
                        )
                    })
                }

                if (this.slides[slideId].opacity !== undefined) {
                    libESRI.layers.opacity(
                        this.slides[slideId].layer,
                        this.slides[slideId].opacity
                    )
                } else {
                    libESRI.layers.opacity(
                        this.slides[slideId].layer,
                        100
                    )
                }

                if (slideId === 13) {
                    libESRI.layers.removePoints()
                }
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
                } else {
                    this.visible = false
                }
            }
        }
    }
</script>
