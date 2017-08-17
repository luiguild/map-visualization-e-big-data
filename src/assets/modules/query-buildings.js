import * as arceasy from 'arceasy'

const run = () => {
    const map = arceasy.obj.map
    // const view = arceasy.obj.view
    const SceneLayer = arceasy.obj.constructors.layer.SceneLayer
    const ColorSlider = arceasy.obj.constructors.utils.ColorSlider
    const colorRendererCreator = arceasy.obj.constructors.renderer.colorRendererCreator
    const lang = arceasy.obj.constructors.utils.lang

    // Create SceneLayer instance with popupTemplate
    var layer = new SceneLayer({
        url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/NYC/SceneServer/layers/0',
        outFields: ['CNSTRCT_YR', 'NAME', 'HEIGHTROOF', 'NUM_FLOORS'],
        popupTemplate: {
            title: '{NAME}',
            content: [
                {
                    type: 'fields',
                    fieldInfos: [
                        {
                            fieldName: 'CNSTRCT_YR',
                            label: 'Construction year'
                        },
                        {
                            fieldName: 'HEIGHTROOF',
                            label: 'Height (ft)'
                        },
                        {
                            fieldName: 'NUM_FLOORS',
                            label: 'Floors'
                        }
                    ]
                }
            ],
            fieldInfos: [
                {
                    fieldName: 'HEIGHTROOF',
                    format: {
                        digitSeparator: true,
                        places: 2
                    }
                },
                {
                    fieldName: 'NUM_FLOORS',
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }
            ]
        }
    })

    // configure parameters for the color renderer generator
    // the layer must be specified along with a field name
    // or arcade expression. The basemap and other properties determine
    // the appropriate default color scheme.

    var colorParams = {
        layer: layer,
        basemap: map.basemap,
        field: 'CNSTRCT_YR',
        theme: 'above-and-below',
        minValue: 1800
    }

    // Set up initial color slider properties.
    // numHandles determines whether 2 or 3 handles
    // will be visible in the slider. The primary handle
    // (middle one of the three) controls all handles
    // when moved if `syncedHandles` is true.

    var sliderParams = {
        numHandles: 3,
        syncedHandles: true,
        container: 'slider'
    }

    // Generate a continuous color renderer based on the
    // statistics of the data in the provided layer
    // and field.
    //
    // This resolves to an object containing several helpful
    // properties, including color scheme, statistics,
    // the renderer and visual variable

    colorRendererCreator.createContinuousRenderer(colorParams)
    .then(function (response) {
        // set the renderer to the layer and add it to the map

        layer.renderer = response.renderer
        map.add(layer)

        // add the statistics and color visual variable objects
        // to the color slider parameters

        sliderParams.statistics = response.statistics
        sliderParams.visualVariable = response.visualVariable

        // input the slider parameters in the slider's constructor
        // and add it to the view's UI

        var colorSlider = new ColorSlider(sliderParams)
        // view.ui.add('containerDiv', 'bottom-left')

        // when the user slides the handle(s), update the renderer
        // with the updated color visual variable object

        colorSlider.on('handle-value-change', function () {
            var renderer = layer.renderer.clone()
            renderer.visualVariables = [lang.clone(colorSlider.visualVariable)]
            layer.renderer = renderer
        })
    })
    .otherwise(function (err) {
        console.log('there was an error: ', err)
    })
}

export const queryBuildings = () => {
    if (arceasy.obj.view !== '' && arceasy.obj.view !== undefined) {
        run()
    }
}
