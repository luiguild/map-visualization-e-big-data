<style lang="sass">
    @import ../../sass/app

    .root
        height: 100%
        width: 100%
</style>

<template lang="pug">
    .root
        slide
        controls
        esri-map
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    import esriMap from '../atoms/map'
    import controls from '../atoms/controls'
    import slide from '../atoms/slide'

    export default {
        props: [],
        data: () => ({}),
        created: function () {},
        mounted: function () {},
        updated: function () {},
        destroyed: function () {},
        components: {
            slide,
            controls,
            esriMap
        },
        computed: {
            ...mapGetters([]),
            ...mapState({})
        },
        methods: {
            ...mapMutations([])
        },
        filters: {},
        watch: {}
    }
</script>
