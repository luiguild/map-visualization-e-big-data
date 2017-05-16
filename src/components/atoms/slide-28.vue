<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #internal
        position: relative
        height: 80%
        width: 75%
        border-radius: $pixel-proportion / 2
        +flex(row, n, flex-end, center)

        > .box
            width: 100%
            height: 100%
            background-color: transparentize($white, .3)
            +flex(column, n, center, center)

            > h1
                font-weight: 900
                font-size: 80px

            > .links-group
                width: 80%
                +flex(row, n, space-around, center)
                margin-top: $pixel-proportion * 2
                margin-bottom: $pixel-proportion * 2
</style>

<template lang="pug">
    #internal
        .box
            h1.title.is-1 POROJÉSÓ!
            h2.subtitle.is-4.has-text-centered fb.com/luiguild | twitter.com/luiguild | github.com/luiguild
            h2.subtitle.is-2.is-marginless.has-text-centered WebRadar
            h2.subtitle.is-3.is-marginless.has-text-centered www.webradar.com
            br
            h2.subtitle.is-2.is-marginless.has-text-centered Mozilla
            h2.subtitle.is-3.is-marginless.has-text-centered www.mozilla.org
            .links-group
                .item
                    h2.subtitle.is-3.is-marginless.has-text-centered ESRI ArcGIS JS API
                    h2.subtitle.is-4.is-marginless.has-text-centered developers.arcgis.com
                .item
                    h2.subtitle.is-3.is-marginless.has-text-centered OpenStreetMaps
                    h2.subtitle.is-4.is-marginless.has-text-centered www.osm.org
            h3.subtitle.is-2.is-marginless.has-text-centered Muito Obrigado!
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
