import * as esriLoader from 'esri-loader'
import * as logger from './logger'
import { loadLayers } from './layers'

const constructors = {
        layer: {
            FeatureLayer: '',
            TileLayer: ''
        },
        map: '',
        container: '',
        view: '',
        utils: {
            watchUtils: '',
            Search: '',
            jsonUtils: '',
            Extent: ''
        },
        renderer: {
            UniqueValueRenderer: '',
            ClassBreaksRenderer: '',
            ExtrudeSymbol3DLayer: '',
            PolygonSymbol3D: '',
            SimpleRenderer: '',
            SimpleMarkerSymbol: '',
            PictureMarkerSymbol: '',
            SimpleLineSymbol: '',
            SimpleFillSymbol: ''
        }
    },
    global = {
        map: '',
        view: ''
    },
    start = container => {
        // has the ArcGIS API been added to the page?
        if (!esriLoader.isLoaded()) {
            // no, lazy load it the ArcGIS API before using its classes
            esriLoader.bootstrap((err) => {
                if (err) {
                    logger.error(err)
                }
                // once it's loaded, create the map
                logger.log('Waiting ESRI servers...')
                dojoLoader(container)
            }, {
                // use a specific version instead of latest 4.x
                // url: 'https://js.arcgis.com/4.3/'
                url: 'http://localhost/arcgis_js_api/library/4.3/4.3/init.js'
            })
        } else {
            // ArcGIS API is already loaded, just create the map
            logger.log('Waiting ESRI servers...')
            dojoLoader(container)
        }
    },
    dojoLoader = container => {
        esriLoader.dojoRequire([
            'esri/config',
            'esri/Map',
            'esri/geometry/Geometry',
            'esri/geometry/Extent',
            'esri/views/SceneView',
            'esri/layers/FeatureLayer',
            'esri/layers/TileLayer',
            'esri/core/watchUtils',
            'esri/core/Collection',
            'esri/renderers/UniqueValueRenderer',
            'esri/renderers/ClassBreaksRenderer',
            'esri/renderers/SimpleRenderer',
            'esri/symbols/ExtrudeSymbol3DLayer',
            'esri/symbols/PolygonSymbol3D',
            'esri/symbols/SimpleMarkerSymbol',
            'esri/symbols/PictureMarkerSymbol',
            'esri/symbols/SimpleLineSymbol',
            'esri/symbols/SimpleFillSymbol',
            'esri/widgets/Search',
            'esri/renderers/support/jsonUtils',
            'dojo/on',
            'dojo/domReady!'
        ], (
            esriConfig,
            Map,
            Geometry,
            Extent,
            SceneView,
            FeatureLayer,
            TileLayer,
            watchUtils,
            Collection,
            UniqueValueRenderer,
            ClassBreaksRenderer,
            SimpleRenderer,
            ExtrudeSymbol3DLayer,
            PolygonSymbol3D,
            SimpleMarkerSymbol,
            PictureMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            Search,
            jsonUtils,
            on
        ) => {
            esriConfig.request.corsEnabledServers.push(
                'http://localhost',
                'http://45.33.83.153'
            )
            esriConfig.request.proxyUrl = 'http://localhost'

            constructors.Map = Map
            constructors.SceneView = SceneView

            constructors.layer.FeatureLayer = FeatureLayer
            constructors.layer.TileLayer = TileLayer

            constructors.utils.watchUtils = watchUtils
            constructors.utils.Search = Search
            constructors.utils.jsonUtils = jsonUtils
            constructors.utils.Extent = Extent

            constructors.renderer.UniqueValueRenderer = UniqueValueRenderer
            constructors.renderer.ClassBreaksRenderer = ClassBreaksRenderer
            constructors.renderer.ExtrudeSymbol3DLayer = ExtrudeSymbol3DLayer
            constructors.renderer.PolygonSymbol3D = PolygonSymbol3D
            constructors.renderer.SimpleRenderer = SimpleRenderer
            constructors.renderer.SimpleMarkerSymbol = SimpleMarkerSymbol
            constructors.renderer.PictureMarkerSymbol = PictureMarkerSymbol
            constructors.renderer.SimpleLineSymbol = SimpleLineSymbol
            constructors.renderer.SimpleFillSymbol = SimpleFillSymbol

            if (constructors.Map && constructors.SceneView) {
                logger.log('All constructorss created!')

                createView(
                    createMap(constructors.Map),
                    constructors.SceneView,
                    container
                )
            } else {
                logger.error('Error during creating constructorss... Try again.')
            }
        })
    },
    createMap = Map => {
        logger.log('Creating map...')
        global.map = new Map({
            basemap: 'streets',
            ground: 'world-elevation',
            layers: []
        })

        return global.map
    },
    createView = (map, View, container) => {
        logger.log('Creating View...')
        global.view = new View({
            container: container,
            map: map,
            scale: 25000000,
            center: [-52.17, -13.78],
            viewingMode: 'global',
            starsEnabled: true,
            atmosphereEnabled: true
        })

        global.view.then(() => {
            logger.log('View ready!')

            controlUI(global.view, constructors.utils.Search)
            loadLayers()
            watcherRunning(global.map, global.view, constructors.utils.watchUtils)
        })
    },
    watcherRunning = (map, view, watchUtils) => {
        watchUtils.whenTrue(view, 'stationary', () => {
            if (view.extent) {
                logger.log(`View changed! Mapping all layers...`)

                map.allLayers.map((elm, indx, arr) => {
                    if (((view.scale < elm.minScale &&
                        view.scale > elm.maxScale) ||
                        (elm.minScale === 0 &&
                            elm.maxScale === 0)) &&
                        elm.raw !== undefined) {
                        if (elm.raw.esri.type === 0) {
                            logger.log(`Creating quadrant to ${elm.title}`)
                            const urlQuery = `!xmin=${view.extent.xmin}!xmax=${view.extent.xmax}!ymin=${view.extent.ymin}!ymax=${view.extent.ymax}`

                            logger.log(`Querying layer: ${elm.title}`)
                            logger.log(`Requesting to server: ${elm.raw.esri.url}/where=${urlQuery}`)

                            // global.map.allLayers.items[elm.id].definitionExpression = urlQuery
                            elm.definitionExpression = urlQuery
                        }

                        logger.log(`Drawing layer: ${elm.title}`)
                    }
                })
            }
        })
    },
    controlUI = (view, Search) => {
        logger.log('Changing UI elements...')
        view.environment.atmosphere.quality = 'low'

        const searchWidget = new Search({
            view: view
        })

        view.ui.add(searchWidget, {
            position: 'top-left',
            index: 2
        })

        view.ui.remove([
            'zoom', 'compass', 'navigation-toggle'
        ])
    }

export {
    constructors,
    global,
    start
}
