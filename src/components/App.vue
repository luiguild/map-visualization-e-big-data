<style lang="sass">
    @import ../sass/app

    #map
        height: 100%
        width: 100%
        top: 0
        left: 0
        z-index: 1
</style>

<template lang="pug">
    #map
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    import * as module from '../assets/modules'

    export default {
        props: [],
        data: () => ({}),
        created: function () {},
        mounted: function () {
            module.esri.startMap()
        },
        updated: function () {},
        destroyed: function () {},
        components: {},
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
