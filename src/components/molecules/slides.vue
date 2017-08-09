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
    // import * as libESRI from '@/assets/modules'
    import * as arceasy from 'arceasy'
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
            component: ''
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
                arceasy.layers.hideAll()

                if (this.slides[slideId].light !== undefined) {
                    // if (this.slides[slideId].light.cameraTracking !== undefined) {
                    //     arceasy.view.light({
                    //         cameraTracking: this.slides[slideId].light.cameraTracking
                    //     })
                    // }

                    if (this.slides[slideId].light.date !== undefined) {
                        arceasy.view.light({
                            date: this.slides[slideId].light.date
                        })
                    }
                }

                if (this.slides[slideId].coordinates !== undefined &&
                    this.slides[slideId].scale !== undefined &&
                    this.slides[slideId].camera !== undefined) {
                    arceasy.view.newPosition({
                        coordinates: this.slides[slideId].coordinates,
                        scale: this.slides[slideId].scale,
                        camera: this.slides[slideId].camera
                    })
                }

                if (this.slides[slideId].basemap !== undefined) {
                    arceasy.view.changeBasemap(
                        this.slides[slideId].basemap
                    )
                }

                if (this.slides[slideId].symbol !== undefined) {
                    arceasy.utils.addGraphicLayer(
                        this.slides[slideId].symbol,
                        this.slides[slideId].point
                    )
                }

                if (this.slides[slideId].layer !== undefined) {
                    this.slides[slideId].layer.forEach((cur, indx, arr) => {
                        arceasy.layers.setVisibility(
                            cur,
                            true
                        )
                    })
                }

                if (this.slides[slideId].opacity !== undefined &&
                    this.slides[slideId].layer !== undefined) {
                    this.slides[slideId].layer.forEach((cur, indx, arr) => {
                        arceasy.layers.setOpacity(
                            cur,
                            this.slides[slideId].opacity
                        )
                    })
                }

                if (slideId === 13) {
                    arceasy.utils.hideGraphicLayers()
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
