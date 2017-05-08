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

            createLayer(data)
        })
    },
    createLayer = layers => {
        layers.map((elm, indx, arr) => {
            let LayerConstructor

            if (elm.esri.type === 0) {
                logger.log(`Creating new Feature Layer...`)
                LayerConstructor = constructors.layer.FeatureLayer
            } else if (elm.esri.type === 1) {
                logger.log(`Creating new Tile Layer...`)
                LayerConstructor = constructors.layer.TileLayer
            }

            logger.log(`Adding id by index on layer`)
            elm.id = indx

            addNewLayer(LayerConstructor, constructors.utils.watchUtils, constructors.utils.jsonUtils, elm)
        })
    },
    addNewLayer = (LayerConstructor, watchUtils, jsonUtils, _layer) => {
        logger.log(`Adding layer on map: ${_layer.title} | Visibility: ${_layer.esri.visible}`)
        logger.log(`Loading layer from: ${_layer.esri.url}`)

        const layer = new LayerConstructor({
            id: _layer.id,
            url: _layer.esri.url,
            definitionExpression: _layer.esri.definitionExpression,
            raw: _layer,
            visible: _layer.esri.visible
        })

        // if (layer.raw.esri.renderer) {
            // logger.log(`Applying renderer...`)

            // layer.renderer = jsonUtils.fromJSON(layer.raw.esri.renderer)
        // }

        // if (layer.raw.esri.popupTemplate) {
        //     layer.popupTemplate = applyingPopups(layer.raw)
        // }

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
        })

        global.map.add(layer)
    }
    // applyingPopups = layer => {
    //     logger.log(`Making popups...`)
    //
    //     const popupModel = {
    //         title: layer.esri.popupTemplate.title,
    //         content: [
    //             {
    //                 type: 'fields',
    //                 fieldInfos: []
    //             }
    //         ]
    //     }
    //
    //     layer.esri.popupTemplate.fieldInfos.forEach((cur, indx, arr) => {
    //         popupModel.content[0].fieldInfos.push(cur)
    //     })
    //
    //     return popupModel
    // }

export {
    loadLayers,
    addNewLayer
}
