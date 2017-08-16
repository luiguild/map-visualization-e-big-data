<style lang="sass">
    @import ../../sass/imports/_extend

    #map
        position: absolute
        height: 100%
        width: 100%
        top: 0
        left: 0
        z-index: 3

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
            z-index: 3
            position: absolute

        .esri-ui-inner-container
            top: 0 !important
            left: 0 !important
            right: 0 !important

        .esri-ui-top-left
            width: 100%
            height: 100%
            top: 0
            +flex(row, n, flex-start, flex-start)

            .esri-search
                position: relative
                order: 1
                box-shadow: inherit
                margin: 0
                margin-left: $pixel-proportion * 20
                width: $pixel-proportion * 46
                padding: $pixel-proportion + 1
                background-color: transparentize($white, .2)
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
                            top: 37px
                            z-index: 99
                            // top: inherit
                            border-radius: $pixel-proportion / 2
                            box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.3)
                            border-bottom: solid 1px rgba(210, 210, 210, 1)

                            div > ul
                                overflow-x: hidden
                                // +flex(column-reverse, n, flex-start, flex-start)
                                width: 100%

                                > li
                                    width: 100%

                                    // &:first-child
                                    //     border-top: solid 1px rgba(50,50,50,0.2)
                                    //
                                    // &:last-child
                                    //     border-top: none

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
                    content: 'Luigui Delyer | Basemap'
                    font-weight: 400
                    margin-right: $pixel-proportion * -0.3

                > .esri-attribution__sources
                    display: none
</style>

<template lang="pug">
    #map(ref="map")
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import * as arceasy from 'arceasy'
    import iss from '@/assets/modules/iss'
    // import text from '@/assets/modules/text'
    import palmSprings from '@/assets/modules/palm-springs-eolic-station'
    import pointCloud from '@/assets/modules/point-cloud'

    export default {
        props: [],
        data: () => ({
            options: {
                // cdn: 'http://localhost/arcgis_js_api/library/4.3/4.3/init.js',
                cdn: 'http://localhost/arcgis_js_api/library/4.4/init.js',
                element: 'map',
                scale: 2500000000,
                center: {
                    longitude: -52.17,
                    latitude: -13.78
                },
                basemap: 'dark-gray',
                stars: true,
                atmosphere: {
                    enable: false,
                    quality: 'low'
                },
                watcher: true,
                // light: {
                //     cameraTracking: false,
                //     date: 'now'
                // },
                search: {
                    enable: true,
                    position: 'top-left',
                    index: 2
                },
                cors: [
                    'http://localhost',
                    'http://45.33.83.153',
                    'http://45.33.83.153:3310'
                ],
                proxy: 'http://localhost'
            }
        }),
        created: function () {},
        mounted: function () {
            this.bigBang()
        },
        updated: function () {},
        destroyed: function () {},
        components: {},
        computed: {
            ...mapGetters([]),
            ...mapState({})
        },
        methods: {
            ...mapActions([]),
            bigBang () {
                const allLayers = require('../../../static/json/layers-full.json')

                arceasy.map.options(this.options)
                arceasy.map.start()
                .then(() => {
                    arceasy.layers.add(allLayers.layers)
                    iss()
                    palmSprings()
                    pointCloud()
                })

                // const hsBeta = allLayers.layers.map((elm, indx, arr) => {
                //     return {
                //         'id': indx + 1,
                //         'title': elm.title || 'Layer',
                //         'visible': elm.esri.visible,
                //         'minScale': elm.esri.minScale || '',
                //         'maxScale': elm.esri.maxScale || '',
                //         'type': elm.esri.type,
                //         'progressive': elm.esri.type === 0 ? true : false, // eslint-disable-line
                //         'url': elm.esri.url,
                //         'definitionExpression': elm.esri.definitionExpression,
                //         'timeRange': {
                //             'initial': {
                //                 'date': '',
                //                 'time': ''
                //             },
                //             'end': {
                //                 'date': '',
                //                 'time': ''
                //             },
                //             'min': {
                //                 'date': '',
                //                 'time': ''
                //             },
                //             'max': {
                //                 'date': '',
                //                 'time': ''
                //             }
                //         },
                //         'renderer': elm.esri.renderer || '',
                //         'popupTemplate': elm.esri.popupTemplate || ''
                //     }
                // })
                // console.log(JSON.stringify(hsBeta))
            }
        },
        filters: {},
        watch: {}
    }
</script>
