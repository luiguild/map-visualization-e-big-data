<style lang="sass">
    @import ../../sass/app

    .root
        height: 100%
        width: 100%
</style>

<template lang="pug">
    .root
        webradar
        arceasy
        slide
        controls
        esri-map
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import esriMap from '../atoms/map'
    import controls from '../atoms/controls'
    import slide from '../molecules/slides'
    import webradar from '../atoms/webradar'
    import arceasy from '../atoms/arceasy'

    export default {
        props: [],
        data: () => ({}),
        created: function () {},
        mounted: function () {},
        updated: function () {},
        destroyed: function () {},
        components: {
            webradar,
            arceasy,
            slide,
            controls,
            esriMap
        },
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
