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
                id: 'states-3d',
                light: {
                    cameraTracking: true
                },
                coordinates: {
                    latitude: -11.390017686219654,
                    longitude: -52.31754424776893
                },
                scale: 33815017,
                camera: {
                    tilt: 10,
                    heading: 0
                },
                basemap: 'streets',
                layer: ['States 3D']
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
