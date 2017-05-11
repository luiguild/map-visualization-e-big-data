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
</style>

<template lang="pug">
    #internal
        .box
            h1.title.is-1 WebRadar
            h1.subtitle.is-5 www.webradar.com
            h1.subtitle.is-3.is-marginless NPI
            h1.subtitle.is-4.is-marginless.has-text-centered Novos produtos, pesquisa e inovação
            h2.subtitle.is-4.has-text-centered Criamos SaaS inteligentes que envolvem mapas, geoprocessamento de big data e analytics para internet das coisas utilizando redes neurais, código genético e muito malabarismo pra ligar tudo isso em soluções que atendam clientes de telecom, transportes, segurança e energia no mundo todo.
            h2.subtitle.is-4.is-marginless.has-text-centered Nosso stack de map-visualization é baseado em soluções ESRI ArcGIS, OpenStreetMap, Mapbox, HERE Maps, Google Maps e Leaflet.
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({}),
        created: function () {},
        mounted: function () {},
        updated: function () {},
        destroyed: function () {},
        components: {},
        computed: {
            ...mapGetters([]),
            ...mapState({})
        },
        methods: {
            ...mapActions([])
        },
        filters: {},
        watch: {}
    }
</script>
