<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #internal
        position: relative
        height: 80%
        width: 75%
        border-radius: $pixel-proportion / 2
        +flex(row, n, flex-end, center)

        > .box
            width: 500px
            height: 100%
            background-color: transparentize($white, .3)
            +flex(column, n, center, center)

            h1
                font-weight: 900

            .title
                font-size: 70px
                margin-bottom: $pixel-proportion

            .npi
                font-size: 60px
                margin-bottom: $pixel-proportion * -2 !important

            .npidescri
                margin-top: 0
</style>

<template lang="pug">
    #internal
        .box
            h1.title.is-1 WebRadar
            h1.subtitle.is-5 www.webradar.com
            h2.subtitle.is-4.has-text-centered Fundada em 2008, a WebRadar é uma empresa de tecnologia especializada em Big Data Analytics para IoT.
            h2.subtitle.is-4.is-marginless.has-text-centered  A WebRadar tem sua sede no Brasil, além de representantes de vendas na Europa, África e Ásia.
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'webradar-2',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: -22.962179,
                    longitude: -43.182069
                },
                scale: 20000,
                camera: {
                    tilt: 77,
                    heading: 65
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
