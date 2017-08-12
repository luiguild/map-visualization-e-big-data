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
    // import * as arceasy from 'arceasy'
    import * as logger from '@/assets/modules/logger'

    import slideInitial from '../atoms/slide-initial'
    import slideCover from '../atoms/slide-cover'
    import slideMindBlown from '../atoms/slide-mind-blown'
    import slideAbout from '../atoms/slide-about'
    import slideStack from '../atoms/slide-stack'
    import slideWebradar1 from '../atoms/slide-webradar-1'
    import slideWebradar2 from '../atoms/slide-webradar-2'
    import slideWebradar3 from '../atoms/slide-webradar-3'
    import slideSygicHongkong from '../atoms/slide-sygic-hongkong'
    import slideSp99 from '../atoms/slide-sp-99'
    import slideMapasSaoPoderosos from '../atoms/slide-mapas-sao-poderosos'
    import slideEsri from '../atoms/slide-esri'
    import slideMaUtilizacao from '../atoms/slide-ma-utilizacao'
    import slidePossibilidades from '../atoms/slide-possibilidades'
    import slideCidades1 from '../atoms/slide-cidades-1'
    import slideCidades2 from '../atoms/slide-cidades-2'
    import slideCidades3 from '../atoms/slide-cidades-3'
    import slideCidades4 from '../atoms/slide-cidades-4'
    import slideComoFazemosIsso from '../atoms/slide-como-fazemos-isso'
    import slideRaster from '../atoms/slide-raster'
    import slideRj99 from '../atoms/slide-rj-99'
    import slideSygicParis from '../atoms/slide-sygic-paris'
    import slideDistanceToSupermarkets from '../atoms/slide-distance-to-supermarkets'
    import slideLandUse from '../atoms/slide-land-use'
    import slideVector from '../atoms/slide-vector'
    import slideStatesColors from '../atoms/slide-states-colors'
    import slideStates3d from '../atoms/slide-states-3d'
    import slideParqueDoPovo from '../atoms/slide-parque-do-povo'
    import slidePerguntas from '../atoms/slide-perguntas'
    import slideEncerramento from '../atoms/slide-encerramento'
    import slideIss from '../atoms/slide-iss'
    import slidePossibilidades3d from '../atoms/slide-possibilidades-3d'
    import slidePalmSprings from '../atoms/slide-palm-springs'

    export default {
        props: [],
        data: () => ({
            visible: true,
            component: ''
        }),
        created: function () {
            this.startPresentention()
        },
        mounted: function () {},
        updated: function () {},
        destroyed: function () {},
        components: {
            slideInitial,
            slideCover,
            slideMindBlown,
            slideAbout,
            slideStack,
            slideWebradar1,
            slideWebradar2,
            slideWebradar3,
            slideSygicHongkong,
            slideSp99,
            slideMapasSaoPoderosos,
            slideEsri,
            slideMaUtilizacao,
            slidePossibilidades,
            slideCidades1,
            slideCidades2,
            slideCidades3,
            slideCidades4,
            slideComoFazemosIsso,
            slideRaster,
            slideRj99,
            slideSygicParis,
            slideDistanceToSupermarkets,
            slideLandUse,
            slideVector,
            slideStatesColors,
            slideStates3d,
            slideParqueDoPovo,
            slidePerguntas,
            slideEncerramento,
            slideIss,
            slidePossibilidades3d,
            slidePalmSprings
        },
        computed: {
            ...mapGetters([
                'slides',
                'slide'
            ]),
            ...mapState({
                actual: state => state.app.actual,
                visibility: state => state.app.visibility
            }),
            toggleSlide () {
                if (this.visibility) {
                    if (this.visible) {
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
            ...mapActions([
                'startPresentention'
            ])
        },
        filters: {},
        watch: {
            actual: function (change) {
                const slide = this.slides[change]

                logger.log(`Actual slide: ${slide}`)

                if (change >= 0) {
                    this.component = `slide-${slide}`
                }
            }
        }
    }
</script>
