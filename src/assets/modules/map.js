import * as esriLoader from 'esri-loader'
import * as logger from './logger'

const constructor = {
        layer: {
            featureLayer: '',
            tileLayer: ''
        },
        map: '',
        view: '',
        util: {
            watch: '',
            search: '',
            jsonUtils: '',
            extent: ''
        },
        renderer: {
            uniqueValueRenderer: '',
            classBreaksRenderer: '',
            extrudeSymbol3DLayer: '',
            polygonSymbol3D: '',
            simpleRenderer: '',
            simpleMarkerSymbol: '',
            pictureMarkerSymbol: '',
            simpleLineSymbol: '',
            simpleFillSymbol: ''
        }
    },
    startMap = () => {
        // has the ArcGIS API been added to the page?
        if (!esriLoader.isLoaded()) {
            // no, lazy load it the ArcGIS API before using its classes
            esriLoader.bootstrap(err => {
                if (err) {
                    logger.error(err)
                }
                // once it's loaded, create the map
                logger.log('Waiting ESRI servers...')
                dojoLoader()
            }, {
                // use a specific version instead of latest 4.x
                url: 'http://localhost/arcgis_js_api/library/4.3/4.3/init.js'
            })
        } else {
            // ArcGIS API is already loaded, just create the map
            logger.log('Waiting ESRI servers...')
            dojoLoader()
        }
    },
    dojoLoader = () => {
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
            esriConfig.request.corsEnabledServers.push('http://45.33.83.153')
            esriConfig.request.proxyUrl = 'http://45.33.83.153'

            constructor.layer.featureLayer = FeatureLayer
            constructor.layer.tileLayer = TileLayer

            constructor.util.watch = watchUtils
            constructor.util.search = Search
            constructor.util.jsonUtils = jsonUtils
            constructor.util.extent = Extent

            constructor.renderer.uniqueValueRenderer = UniqueValueRenderer
            constructor.renderer.classBreaksRenderer = ClassBreaksRenderer
            constructor.renderer.extrudeSymbol3DLayer = ExtrudeSymbol3DLayer
            constructor.renderer.polygonSymbol3D = PolygonSymbol3D
            constructor.renderer.simpleRenderer = SimpleRenderer
            constructor.renderer.simpleMarkerSymbol = SimpleMarkerSymbol
            constructor.renderer.pictureMarkerSymbol = PictureMarkerSymbol
            constructor.renderer.simpleLineSymbol = SimpleLineSymbol
            constructor.renderer.simpleFillSymbol = SimpleFillSymbol

            logger.log('All constructor loaded...')

            createRenderers()
            // createMap(Map)
            // createView(SceneView)
        })
    },
    createRenderers = () => {
        // let UniqueValueRenderer = constructor.uniqueValueRenderer,
        //     SimpleRenderer = constructor.simpleRenderer,
        //     ClassBreaksRenderer = constructor.classBreaksRenderer,
        //     PolygonSymbol3D = constructor.polygonSymbol3D,
        //     ExtrudeSymbol3DLayer = constructor.extrudeSymbol3DLayer,
        //     SimpleLineSymbol = constructor.simpleLineSymbol,
        //     SimpleFillSymbol = constructor.simpleFillSymbol,
        //     templateRenderers = {
        //         UniqueValueRenderer: new UniqueValueRenderer({
        //             field: '',
        //             uniqueValueInfos: []
        //         }),
        //         SimpleRenderer: new SimpleRenderer({
        //             field: '',
        //             symbol: ''
        //         }),
        //         ClassBreaksRenderer: new ClassBreaksRenderer({
        //             field: '',
        //             classBreakInfos: []
        //         })
        //     },
        //     templateSymbols = [
        //         {
        //             name: 'PolygonSymbol3D',
        //             obj: {
        //                 defaultSymbol: new PolygonSymbol3D({
        //                     symbolLayers: [
        //                         new ExtrudeSymbol3DLayer({})
        //                     ]
        //                 }),
        //                 visualVariables: [
        //                     {
        //                         type: 'size',
        //                         field: 'size',
        //                         valueUnit: 'meters'
        //                     }
        //                 ]
        //             }
        //         },
        //         {
        //             name: 'SimpleFillSymbol',
        //             obj: {
        //                 symbol: new SimpleFillSymbol({
        //                     color: 'rgb(0, 255, 0)',
        //                     outline: new SimpleLineSymbol({
        //                         width: 3,
        //                         color: 'black'
        //                     })
        //                 })
        //             }
        //         }
        //     ]
        // addTemplateRenderers(templateRenderers)
        // addTemplateSymbols(templateSymbols)
    // },
    // createMap = Map => {
    //     let basemapStorage
    //     try {
    //         log.ger('Trying get basemap from localStorage...')
    //         basemapStorage = localStorage.get('basemap')
    //         if (basemapStorage) {
    //             log.ger('Basemap found: ' + basemapStorage)
    //         } else {
    //             log.ger('No basemap found in localStorage')
    //             log.ger('Getting basemap default from Vuex')
    //             basemapStorage = computedBasemap
    //         }
    //     } catch (e) {
    //         log.ger('No basemap found in localStorage')
    //         log.ger('Getting basemap default from Vuex')
    //         basemapStorage = computedBasemap
    //     }
    //
    //     log.ger('Creating map...')
    //     global.map = new Map({
    //         basemap: basemapStorage,
    //         ground: 'world-elevation',
    //         layers: []
    //     })
    // },
    // createView = () => {
    //     let SceneView = constructor.sceneView,
    //         Search = constructor.search,
    //         searchWidget = new Search({})
    //
    //     log.ger('Creating View...')
    //     global.view = new SceneView({
    //         container: 'map',
    //         map: global.map,
    //         scale: 25000000,
    //         center: [-52.17, -13.78],
    //         viewingMode: 'global'
    //     })
    //     global.view.starsEnabled = false
    //     global.view.atmosphereEnabled = false
    //     global.view.environment.atmosphere.quality = 'low'
    //
    //     searchWidget.view = global.view
    //
    //     global.view.then(() => {
    //         log.ger('View ready!')
    //         log.ger('Listing layers...')
    //
    //         loadLayers()
    //     })
    //
    //     global.view.ui.remove(['zoom', 'compass', 'navigation-toggle'])
    //
    //     global.view.ui.add(searchWidget, {
    //         position: 'top-left',
    //         index: 2
    //     })
    // },
    // loadLayers = () => {
    //     fetchLayers().then(() => {
    //         computedLayersOnProject.find((elm, indx, arr) => {
    //             if (elm.projectId.toString() === computedRoute.toString()) {
    //                 addNewLayer(elm.index)
    //                 log.ger('Adding layer on map: ' + elm.title + ' | Visible: ' + elm.esri.visible)
    //                 log.ger('Loading layer from: "' + elm.esri.url + '"')
    //             }
    //         })
    //     })
    // },
    // addNewLayer = index => {
    //     let FeatureLayer = constructor.featureLayer,
    //         TileLayer = constructor.tileLayer,
    //         watchUtils = constructor.watch,
    //         layersOnProject = computedLayersOnProject[index],
    //         // UniqueValueRenderer = constructor.uniqueValueRenderer,
    //         // ExtrudeSymbol3DLayer = constructor.extrudeSymbol3DLayer,
    //         // PolygonSymbol3D = constructor.polygonSymbol3D,
    //         LayerConstructor
    //
    //     if (layersOnProject.esri.type === 0) {
    //         log.ger('Creating new Feature Layer...')
    //         LayerConstructor = FeatureLayer
    //     } else if (layersOnProject.esri.type === 1) {
    //         log.ger('Creating new Tile Layer...')
    //         LayerConstructor = TileLayer
    //     }
    //
    //     addLayersOnProject({
    //         index: index,
    //         layer: new LayerConstructor({
    //             url: layersOnProject.esri.url,
    //             definitionExpression: layersOnProject.esri.definitionExpression,
    //             index: index,
    //             outOfRange: true,
    //             raw: layersOnProject
    //         })
    //     })
    //
    //     if (layersOnProject.esri.renderer) {
    //         log.ger('Running renderer...')
    //         // if (layersOnProject.esri.renderer.id === 0) {
    //         //     renderers[layersOnProject.esri.renderer.id].defaultSymbol.symbolLayers.items[0].material.color = layersOnProject.esri.renderer.visual.color ? layersOnProject.esri.renderer.visual.color : ''
    //         // } else if (layersOnProject.esri.renderer.id === 1) {
    //         //     renderers[layersOnProject.esri.renderer.id].symbol.color = layersOnProject.esri.renderer.visual.color ? layersOnProject.esri.renderer.visual.color : ''
    //         //     renderers[layersOnProject.esri.renderer.id].symbol.outline.color = layersOnProject.esri.renderer.visual.outline.color ? layersOnProject.esri.renderer.visual.outline.color : ''
    //         //     renderers[layersOnProject.esri.renderer.id].symbol.outline.width = layersOnProject.esri.renderer.visual.outline.width ? layersOnProject.esri.renderer.visual.outline.width : ''
    //         // }
    //         if (layersOnProject.esri.rendererType === '3D') {
    //             layersOnProject.layer.renderer = constructor.jsonUtils.fromJSON(layersOnProject.esri.renderer)
    //             // logger.log('stringify', JSON.stringify(layersOnProject.layer.renderer))
    //         }
    //         // layersOnProject.renderer = new UniqueValueRenderer({
    //         //     defaultSymbol: new PolygonSymbol3D({
    //         //         symbolLayers: [
    //         //             new ExtrudeSymbol3DLayer({
    //         //                 material: {
    //         //                     color: '#000000'
    //         //                 }
    //         //             })
    //         //         ]
    //         //     }),
    //         //     visualVariables: [
    //         //         {
    //         //             type: 'size',
    //         //             field: 'size',
    //         //             valueUnit: 'meters'
    //         //         }
    //         //     ]
    //         // })
    //     }
    //
    //     if (layersOnProject.esri.popupTemplate) {
    //         log.ger('Making popups...')
    //         let popupModel = {
    //             title: layersOnProject.esri.popupTemplate.title,
    //             content: [
    //                 {
    //                     type: 'fields',
    //                     fieldInfos: []
    //                 }
    //             ]
    //         }
    //
    //         for (let i = 0; i < layersOnProject.esri.popupTemplate.fieldInfos.length; i++) {
    //             popupModel.content[0].fieldInfos.push(layersOnProject.esri.popupTemplate.fieldInfos[i])
    //         }
    //
    //         addPopupOnLayer({
    //             index: index,
    //             popupTemplate: popupModel
    //         })
    //     }
    //
    //     layersOnProject.layer.then(() => {
    //         log.ger('Layer ' + layersOnProject.layer.title + ' ready!')
    //         log.ger('View waiting changes...')
    //
    //         getFieldsOnLayer({
    //             index: index,
    //             fields: layersOnProject.layer.get('fields')
    //         })
    //
    //         if (layersOnProject.layer.raw.esri.type === 1) {
    //             layersOnProject.layer.minScale = layersOnProject.layer.raw.esri.minScale !== null ? layersOnProject.layer.raw.esri.minScale : 0
    //             layersOnProject.layer.maxScale = layersOnProject.layer.raw.esri.maxScale !== null ? layersOnProject.layer.raw.esri.maxScale : 0
    //             log.ger('minScale:' + layersOnProject.layer.minScale + ' and maxScale:' + layersOnProject.layer.maxScale + ' defined manually')
    //         }
    //
    //         watchUtils.whenTrue(global.view, 'stationary', () => {
    //             // logger.log(global.view.get('scale'))
    //
    //             if ((global.view.get('scale') < layersOnProject.layer.get('minScale') && global.view.get('scale') > layersOnProject.layer.get('maxScale')) || (layersOnProject.layer.get('minScale') === 0 && layersOnProject.layer.get('maxScale') === 0)) {
    //                 layerOutOfRange({
    //                     index: index,
    //                     status: false
    //                 })
    //             } else {
    //                 log.ger('View changed but ' + layersOnProject.layer.title + ' is out of range')
    //                 layerOutOfRange({
    //                     index: index,
    //                     status: true
    //                 })
    //             }
    //
    //             if (global.view.extent && layersOnProject.layer.visible && layersOnProject.layer.outOfRange === false) {
    //                 log.ger('View changed! Verifying scales to ' + layersOnProject.layer.title)
    //
    //                 if ((global.view.get('scale') < layersOnProject.layer.get('minScale') && global.view.get('scale') > layersOnProject.layer.get('maxScale')) || (layersOnProject.layer.get('minScale') === 0 && layersOnProject.layer.get('maxScale') === 0)) {
    //                     if (layersOnProject.layer.raw.esri.type === 0) {
    //                         let urlQuery = '!xmin=' + global.view.get('extent.xmin') + '!xmax=' + global.view.get('extent.xmax') + '!ymin=' + global.view.get('extent.ymin') + '!ymax=' + global.view.get('extent.ymax')
    //
    //                         log.ger('Querying layer: ' + layersOnProject.layer.title)
    //                         log.ger('Requesting to server: ' + layersOnProject.layer.raw.esri.url + '/where=' + urlQuery)
    //
    //                         setDefinitionExpression({
    //                             index: index,
    //                             definitionExpression: urlQuery
    //                         })
    //                     }
    //
    //                     log.ger('Drawing layer: ' + layersOnProject.layer.title)
    //                 }
    //             }
    //         })
    //     })
    //
    //     layerOutOfRange({
    //         index: index,
    //         status: true
    //     })
    //
    //     changeVisibleLayer({
    //         index: index,
    //         visible: layersOnProject.esri.visible
    //     })
    //
    //     global.map.add(layersOnProject.layer)
    }

export {
    startMap
}
