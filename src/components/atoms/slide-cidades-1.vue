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
                font-size: 60px
</style>

<template lang="pug">
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({
            info: {
                id: 'cidades-1',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: -20.264693,
                    longitude: -50.574931
                },
                scale: 500000,
                camera: {
                    tilt: 0,
                    heading: 0
                },
                basemap: 'hybrid',
                layer: ['Cities Rendered Outline White']
            }
        }),
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
