<style lang="sass">
    @import ../../sass/app

    .root
        height: 100%
        width: 100%
</style>

<template lang="pug">
    .root
        webradar
        slide
        controls
        esri-map
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import * as logger from '@/assets/modules/logger'
    import esriMap from '../atoms/map'
    import controls from '../atoms/controls'
    import slide from '../molecules/slides'
    import webradar from '../atoms/webradar'

    export default {
        props: [],
        data: () => ({}),
        created: function () {},
        mounted: function () {
            window.onkeydown = e => {
                switch (e.keyCode) {
                case 37:
                    this.previous()
                    break
                case 38:
                    console.log('up')
                    break
                case 39:
                    this.next()
                    break
                case 40:
                    console.log('down')
                    break
                }
            }
        },
        updated: function () {},
        destroyed: function () {},
        components: {
            webradar,
            slide,
            controls,
            esriMap
        },
        computed: {
            ...mapGetters([]),
            ...mapState({})
        },
        methods: {
            ...mapActions([
                'increment',
                'decrement'
            ]),
            next () {
                logger.log(`Next slide...`)
                this.increment()
            },
            previous () {
                logger.log(`Previous slide...`)
                this.decrement()
            }
        },
        filters: {},
        watch: {}
    }
</script>
