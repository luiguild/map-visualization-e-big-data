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
            h1.subtitle.is-3.is-marginless.npi NPI
            h1.subtitle.is-4.is-marginless.has-text-centered.npidescri Novos produtos, pesquisa e inovação
            h2.subtitle.is-4.has-text-centered Criamos SaaS inteligentes que envolvem mapas, geoprocessamento de big data e analytics para internet das coisas utilizando redes neurais, código genético e muito malabarismo pra ligar tudo isso em soluções que atendam clientes de telecom, transportes, segurança e energia no mundo todo.
            h2.subtitle.is-4.is-marginless.has-text-centered Nosso stack de map-visualization é baseado em soluções ESRI ArcGIS, OpenStreetMap, HERE Maps, Google Maps e Leaflet.
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'webradar-1',
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
