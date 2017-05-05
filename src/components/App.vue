<style lang="sass">
    @import ../sass/app

    #map
        height: 100%
        width: 100%
        top: 0
        left: 0
        z-index: 2

        &::before
            content: '\f110'
            font-family: 'FontAwesome'
            -webkit-animation: fa-spin 1s infinite steps(8)
            animation: fa-spin 1s infinite steps(8)
            z-index: 1
            position: absolute
            color: darken($grey-1, 10%)
            height: 100%
            width: 100%
            top: 0
            left: 0
            text-align: center
            font-size: 900%
            +flex(row, n, center, center)

        > .esri-view-root
            z-index: 2
            position: absolute

        .esri-ui-inner-container
            top: 0 !important
            left: 0 !important
            right: 0 !important

        .esri-ui-top-left
            width: 100%
            display: inline-block
            +flex(row, n, center, center)

            .esri-search
                position: relative
                top: -49px
                order: 1
                box-shadow: inherit
                margin: 0
                align-self: center
                width: $pixel-proportion * 46
                padding: $pixel-proportion
                background-color: $black-2
                border-radius: 0 0 $pixel-proportion $pixel-proportion
                +transition(.2s)

                .esri-search__container
                    flex: inherit
                    width: $pixel-proportion * 44
                    max-width: $pixel-proportion * 44
                    min-width: $pixel-proportion * 44

                    .esri-search__input-container
                        width: 100%
                        background-color: $white
                        border-radius: 0 0 0 $pixel-proportion / 2

                        > form > input
                            font-size: 16px

                        .esri-menu
                            margin: 0
                        //     bottom: 32px
                        //     z-index: 99
                        //     top: inherit
                        //     box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.3)
                        //     border-bottom: solid 1px rgba(210, 210, 210, 1)
                        //
                        //     div > ul
                        //         overflow-x: hidden
                        //         // +flex(column-reverse, n, flex-start, flex-start)
                        //         width: 100%
                        //
                        //         > li
                        //             width: 100%
                        //
                        //             &:first-child
                        //                 border-top: solid 1px rgba(50,50,50,0.2)
                        //
                        //             &:last-child
                        //                 border-top: none

                .esri-search__submit-button
                    background-color: $color1
                    border-radius: 0 0 $pixel-proportion / 2 0

                    > .esri-icon-search
                        color: $white

        .esri-ui-manual-container
            bottom: 15px !important
            +flex(row, '', center, center)

            > .esri-attribution
                bottom: -15px
                background: $transparent
                +flex(row, '', flex-end, center)
                text-shadow: 0 1px 4px rgba(0, 0, 0, 1)
                color: $white
                div
                    font-weight: 400
                a
                    color: $white
                    font-weight: 400

                &::before
                    content: 'HotSpots by WebRadar | Basemap'
                    font-weight: 400
                    margin-right: $pixel-proportion * -0.3

                > .esri-attribution__sources
                    display: none
</style>

<template lang="pug">
    #map(ref="map")
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    import * as esriCreator from '@/assets/modules'

    export default {
        props: [],
        data: () => ({}),
        created: function () {},
        mounted: function () {
            esriCreator.map.start(this.$refs.map)
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
