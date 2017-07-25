<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #internal
        position: relative
        height: 80%
        width: 75%
        border-radius: $pixel-proportion / 2
        +flex(row, n, center, center)
        transform: rotate(-40deg)

        > .box
            width: 400px
            height: 100%
            background-color: $transparent
            box-shadow: none
            border: none
            +flex(column, n, center, center)

            > h1,
            > h2
                color: $white
                text-shadow: 0 0 30px $black

            > h1
                font-weight: 900
                font-size: 80px
                line-height: 65px

</style>

<template lang="pug">
    #internal
        .box
            h1.title.is-1.has-text-centered Mapas são poderosos!
            h2.subtitle.is-3.is-marginless ArcGIS
            h2.subtitle.is-3.is-marginless OpenStreetMap
            h2.subtitle.is-3.is-marginless Mapbox
            h2.subtitle.is-3.is-marginless HERE Maps
            h2.subtitle.is-3.is-marginless Google Maps
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
