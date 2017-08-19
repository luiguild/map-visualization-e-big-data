import * as arceasy from 'arceasy'

const run = () => {
    const map = arceasy.obj.map
    // const view = arceasy.obj.view
    const SceneLayer = arceasy.obj.constructors.layer.SceneLayer
    const UniqueValueRenderer = arceasy.obj.constructors.renderer.UniqueValueRenderer
    const MeshSymbol3D = arceasy.obj.constructors.renderer.MeshSymbol3D
    const FillSymbol3DLayer = arceasy.obj.constructors.renderer.FillSymbol3DLayer
    const SimpleRenderer = arceasy.obj.constructors.renderer.SimpleRenderer

    // Load a webscene and add it to the view
    // var webscene = new WebScene({
    //     portalItem: {
    //         id: '03a9607d96244883af64c7f8c7e5de1b'
    //     }
    // })
    //
    // var view = new SceneView({
    //     container: 'viewDiv',
    //     map: webscene
    // })

    // Create SceneLayer with textured buildings
    var layer = new SceneLayer({
        url: 'http://services2.arcgis.com/cFEFS0EWrhfDeVw9/ArcGIS/rest/services/STM____F_Helsinki__Textured_buildings_with_attributes/SceneServer/layers/0',
        outFields: ['usage'],
        title: 'Buildings in Helsinki'
    })

    function getUniqueValueRenderer (color, colorMixMode) {
        return new UniqueValueRenderer({
            field: 'usage',
            defaultSymbol: new MeshSymbol3D({
                symbolLayers: [
                    new FillSymbol3DLayer({
                        material: {
                            color: [230, 230, 230, 0.7],
                            // We are not interested in these buildings, but we keep them for context
                            // We want to remove the texture so we set the colorMixMode to replace
                            colorMixMode: 'replace'
                        }
                    })
                ]
            }),
            uniqueValueInfos: [{
                value: 'general or commercial',
                label: 'commercial buildings',
                symbol: new MeshSymbol3D({
                    symbolLayers: [
                        new FillSymbol3DLayer({
                            material: {
                                color: color,
                                colorMixMode: colorMixMode
                            }
                        })
                    ]
                })
            }],
            legendOptions: {
                title: 'Usage'
            }
        })
    }

    // This function sets a new renderer on the layer depending on selected option
    function setRenderer (type) {
        if (type === 'original') {
            layer.renderer = null
        } else if (type === 'select') {
            // In this case we want to keep the texture unmodified for the buildings we are interested in
            // color and colorMixMode should be set to null, otherwise they default to 'white' and 'multiply'
            layer.renderer = getUniqueValueRenderer(null, null)
        } else if (type === 'emphasize') {
            // We apply a color to make buildings stand out, but we also want to keep the texture, so we use tint
            layer.renderer = getUniqueValueRenderer('#F5D5A9', 'tint')
        } else {
            // Applying a white color with tint option will desaturate the texture
            // Use replace if the texture should be removed
            var colorMixMode = (type === 'desaturate') ? 'tint' : 'replace'

            // Create a SimpleRenderer and apply it to the layer
            var locationRenderer = new SimpleRenderer({
                symbol: new MeshSymbol3D({
                    symbolLayers: [
                        new FillSymbol3DLayer({
                            material: {
                                color: 'white',
                                colorMixMode: colorMixMode
                            }
                        })
                    ]
                })
            })
            layer.renderer = locationRenderer
        }
    }

    map.add(layer)
    setRenderer()

    // Add event listener on the buttons to change the renderer and the colorMixMode
    document.getElementById('colorMixMode').addEventListener('change',
    function (evt) {
        setRenderer(evt.target.id)
    })

    // view.ui.add('colorMixMode', 'bottom-left')
}

export const queryBuildings2 = () => {
    if (arceasy.obj.view !== '' && arceasy.obj.view !== undefined) {
        run()
    }
}
