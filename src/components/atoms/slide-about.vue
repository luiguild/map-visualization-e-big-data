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

            .emoji
                font-size: 80px

            h1
                font-weight: 900
            .title
                font-size: 60px
                margin-top: 0
</style>

<template lang="pug">
    #internal
        .box
            .emoji 😌
            h1.title.is-1 Luigui Delyer
            h1.subtitle.is-5 (Sim esse é o meu nome.)
            h2.subtitle.is-4.is-marginless.has-text-centered Reps @ Mozilla
            h2.subtitle.is-4.is-marginless.has-text-centered Criador do ArcEasy, VBar e Tekoá
            h1.subtitle.is-4.is-marginless.has-text-centered
                br
                | Apaixonado pela web
                br
                | desde quando fazia barulho
            h1.subtitle.is-5.is-marginless.has-text-centered
                br
                | Sou daqueles que pagam internet pra ver memes
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'about',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: -20.26,
                    longitude: -50.245
                },
                scale: 20000,
                camera: {
                    tilt: 70,
                    heading: 10
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
