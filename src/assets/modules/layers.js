import * as logger from './logger'
import { constructors, global } from './map'
import { getAllLayers as getLayers } from '../axios/layers'

const allLayers = [],
    loadLayers = () => {
        logger.log(`Fetching layers...`)

        getLayers()
        .then(response => response.data)
        .then(data => data.layers)
        .then(data => {
            allLayers.push(data)

            data.forEach((cur, indx, arr) => {
                let LayerConstructor

                if (cur.esri.type === 0) {
                    logger.log(`Creating new Feature Layer...`)
                    LayerConstructor = constructors.layer.FeatureLayer
                } else if (cur.esri.type === 1) {
                    logger.log(`Creating new Tile Layer...`)
                    LayerConstructor = constructors.layer.TileLayer
                }

                logger.log(`Adding id by index on layer`)
                cur.id = indx

                logger.log(`Adding layer on map: ${cur.title}`)
                logger.log(`Loading layer from: ${cur.esri.url}`)
                addNewLayer(LayerConstructor, constructors.utils.watchUtils, constructors.utils.jsonUtils, cur)
            })
        })
    },
    addNewLayer = (LayerConstructor, watchUtils, jsonUtils, _layer) => {
        const layer = new LayerConstructor({
            id: _layer.id,
            url: _layer.esri.url,
            definitionExpression: _layer.esri.definitionExpression,
            raw: _layer
        })

        // if (layer.raw.esri.renderer) {
            // logger.log(`Applying renderer...`)

            // layer.renderer = jsonUtils.fromJSON(layer.raw.esri.renderer)
        // }

        if (layer.raw.esri.popupTemplate) {
            layer.popupTemplate = applyingPopups(layer.raw)
        }

        layer.then(() => {
            logger.log(`Layer ${layer.title} ready!`)
            logger.log(`View waiting changes...`)

            if (layer.raw.esri.type === 1) {
                layer.minScale = layer.raw.esri.minScale !== null
                    ? layer.raw.esri.minScale
                    : 0
                layer.maxScale = layer.raw.esri.maxScale !== null
                    ? layer.raw.esri.maxScale
                    : 0

                logger.log(`minScale: ${layer.minScale} and maxScale: ${layer.maxScale} defined manually`)
            }

            watchUtils.whenTrue(global.view, 'stationary', () => {
                if (global.view.extent) {
                    logger.log(`View changed! Verifying scales to ${layer.title}`)

                    if ((global.view.scale < layer.minScale && global.view.scale > layer.maxScale) || (layer.minScale === 0 && layer.maxScale === 0)) {
                        if (layer.raw.esri.type === 0) {
                            const urlQuery = `!xmin=${global.view.extent.xmin}!xmax=${global.view.extent.xmax}!ymin=${global.view.extent.ymin}!ymax=${global.view.extent.ymax}`
                            // const urlQuery = '!xmin=' + global.view.get('extent.xmin') + '!xmax=' + global.view.get('extent.xmax') + '!ymin=' + global.view.get('extent.ymin') + '!ymax=' + global.view.get('extent.ymax')

                            logger.log(`Querying layer: ${layer.title}`)
                            logger.log(`Requesting to server: ${layer.raw.esri.url}/where=${urlQuery}`)

                            // global.map.allLayers.items[layer.id].definitionExpression = urlQuery
                            layer.definitionExpression = urlQuery
                        }

                        logger.log(`Drawing layer: ${layer.title}`)
                    }
                }
            })
        })

        global.map.add(layer)
    },
    applyingPopups = layer => {
        logger.log(`Making popups...`)

        const popupModel = {
            title: layer.esri.popupTemplate.title,
            content: [
                {
                    type: 'fields',
                    fieldInfos: []
                }
            ]
        }

        layer.esri.popupTemplate.fieldInfos.forEach((cur, indx, arr) => {
            popupModel.content[0].fieldInfos.push(cur)
        })

        return popupModel
    }

export {
    loadLayers,
    addNewLayer
}
