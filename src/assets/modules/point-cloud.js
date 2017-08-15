import * as arceasy from 'arceasy'

const PointCloudLayer = arceasy.obj.constructors.layer.PointCloudLayer
const PointCloudUniqueValueRenderer = arceasy.obj.constructors.renderer.PointCloudUniqueValueRenderer
const PointCloudRGBRenderer = arceasy.obj.constructors.renderer.PointCloudRGBRenderer
const PointCloudStretchRenderer = arceasy.obj.constructors.renderer.PointCloudStretchRenderer
const PointCloudClassBreaksRenderer = arceasy.obj.constructors.renderer.PointCloudClassBreaksRenderer

const renderers = [
    new PointCloudRGBRenderer({
        field: 'RGB'
    }),
    new PointCloudUniqueValueRenderer({
        field: 'CLASS_CODE', // field containing data for standard LAS classification
        colorUniqueValueInfos: [
            {
                values: ['1'],
                label: 'Unassigned',
                color: [180, 180, 180]
            },
            {
                values: ['2'],
                label: 'Ground',
                color: [222, 184, 135]
            },
            {
                values: ['3'],
                label: 'Low vegetation',
                color: [200, 232, 171]
            },
            {
                values: ['4'],
                label: 'Medium vegetation',
                color: [76, 112, 43]
            },
            {
                values: ['5'],
                label: 'High vegetation',
                color: [76, 112, 43]
            },
            {
                values: ['6'],
                label: 'Building',
                color: [158, 40, 17]
            },
            {
                values: ['7'],
                label: 'Low Point',
                color: [255, 255, 255]
            },
            {
                values: ['8'],
                label: 'Reserved',
                color: [139, 69, 19]
            },
            {
                values: ['9'],
                label: 'Water',
                color: [13, 68, 80]
            },
            {
                values: ['10'],
                label: 'Rail',
                color: [255, 233, 68]
            },
            {
                values: ['11'],
                label: 'Road surface',
                color: [255, 233, 68]
            },
            {
                values: ['12'],
                label: 'Reserved',
                color: [255, 255, 255]
            }]
    }),
    new PointCloudStretchRenderer({
        field: 'ELEVATION', // field containing elevation values
        stops: [{
            value: -0.78,
            color: [61, 51, 158]
        }, {
            value: 1,
            color: [73, 196, 196]
        }, {
            value: 2,
            color: [104, 196, 73]
        }, {
            value: 3,
            color: [235, 232, 84]
        }, {
            value: 4,
            color: [235, 162, 84]
        }, {
            value: 12,
            color: [235, 84, 84]
        }, {
            value: 20,
            color: [100, 100, 100]
        }]
    }),
    new PointCloudClassBreaksRenderer({
        field: 'INTENSITY', // field containing intensity values
        colorClassBreakInfos: [
            {
                minValue: 0,
                maxValue: 30000,
                color: [255, 255, 255]
            }, {
                minValue: 30000,
                maxValue: 50000,
                color: [100, 100, 100]
            }, {
                minValue: 50000,
                maxValue: 65700,
                color: [50, 50, 50]
            }]
    })
]

const run = () => {
    const map = arceasy.obj.map

    // Create Point Cloud Layer
    var pcLayer = new PointCloudLayer({
        url: 'https://tiles.arcgis.com/tiles/V6ZHFr6zdgNZuVG0/arcgis/rest/services/BARNEGAT_BAY_LiDAR_UTM/SceneServer',
        id: 'PointCloud',
        raw: {}
    })

    /*********************
    * GoTo extent
    *********************/
    // arceasy.view.newPosition({
    //     camera: {
    //         position: {
    //             x: -8249335,
    //             y: 4832005,
    //             z: 50.7,
    //             spatialReference: {
    //                 wkid: 3857
    //             }
    //         },
    //         heading: 210,
    //         tilt: 78
    //     }
    // })

    /******************************************************************
    *
    * Display point cloud layer using different renderers
    *
    ******************************************************************/

    // Display point cloud based on original scan colors/using the RGB values
    //
    // var pointCloudRGBRenderer = new PointCloudRGBRenderer({
    //     field: 'RGB'
    // })
    //
    // // Display point cloud based on unique values in an attribute
    // // Instead of using a constructor you can also create the renderer from a JSON file
    //
    // var pointCloudUniqueValueRenderer = new PointCloudUniqueValueRenderer({
    //     field: 'CLASS_CODE', // field containing data for standard LAS classification
    //     colorUniqueValueInfos: [
    //         {
    //             values: ['1'],
    //             label: 'Unassigned',
    //             color: [180, 180, 180]
    //         },
    //         {
    //             values: ['2'],
    //             label: 'Ground',
    //             color: [222, 184, 135]
    //         },
    //         {
    //             values: ['3'],
    //             label: 'Low vegetation',
    //             color: [200, 232, 171]
    //         },
    //         {
    //             values: ['4'],
    //             label: 'Medium vegetation',
    //             color: [76, 112, 43]
    //         },
    //         {
    //             values: ['5'],
    //             label: 'High vegetation',
    //             color: [76, 112, 43]
    //         },
    //         {
    //             values: ['6'],
    //             label: 'Building',
    //             color: [158, 40, 17]
    //         },
    //         {
    //             values: ['7'],
    //             label: 'Low Point',
    //             color: [255, 255, 255]
    //         },
    //         {
    //             values: ['8'],
    //             label: 'Reserved',
    //             color: [139, 69, 19]
    //         },
    //         {
    //             values: ['9'],
    //             label: 'Water',
    //             color: [13, 68, 80]
    //         },
    //         {
    //             values: ['10'],
    //             label: 'Rail',
    //             color: [255, 233, 68]
    //         },
    //         {
    //             values: ['11'],
    //             label: 'Road surface',
    //             color: [255, 233, 68]
    //         },
    //         {
    //             values: ['12'],
    //             label: 'Reserved',
    //             color: [255, 255, 255]
    //         }]
    // })
    //
    // // Use the PointCloudStretch renderer to map the values of an attribute
    // // to a continuous color scale
    //
    // var pointCloudStretchRenderer = new PointCloudStretchRenderer({
    //     field: 'ELEVATION', // field containing elevation values
    //     stops: [{
    //         value: -0.78,
    //         color: [61, 51, 158]
    //     }, {
    //         value: 1,
    //         color: [73, 196, 196]
    //     }, {
    //         value: 2,
    //         color: [104, 196, 73]
    //     }, {
    //         value: 3,
    //         color: [235, 232, 84]
    //     }, {
    //         value: 4,
    //         color: [235, 162, 84]
    //     }, {
    //         value: 12,
    //         color: [235, 84, 84]
    //     }, {
    //         value: 20,
    //         color: [100, 100, 100]
    //     }]
    // })
    //
    // // Classify numerical attribute values and then apply colors based on
    // // resulting classes using the PointCloudClassBreaksRenderer
    //
    // var pointCloudClassBreaksRenderer = new PointCloudClassBreaksRenderer({
    //     field: 'INTENSITY', // field containing intensity values
    //     colorClassBreakInfos: [
    //         {
    //             minValue: 0,
    //             maxValue: 30000,
    //             color: [255, 255, 255]
    //         }, {
    //             minValue: 30000,
    //             maxValue: 50000,
    //             color: [100, 100, 100]
    //         }, {
    //             minValue: 50000,
    //             maxValue: 65700,
    //             color: [50, 50, 50]
    //         }]
    // })

    // Assign the renderer to the point cloud layers
    pcLayer.renderer = renderers[0]
    map.add(pcLayer)

    // Handle change events on radio buttons to switch to the correct renderer

    // var rendererType = { // eslint-disable-line
    //     rgbRenderer: pointCloudRGBRenderer,
    //     uniqueValueRenderer: pointCloudUniqueValueRenderer,
    //     stretchRenderer: pointCloudStretchRenderer,
    //     classBreaksRenderer: pointCloudClassBreaksRenderer
    // }

    // pcLayer.renderer = rendererType.stretchRenderer

    // var radios = query('input')
    // for (var i = 0; i < radios.length; i++) {
    //     on(radios[i], 'change', function () {
    //         pcLayer.renderer = rendererType[this.value]
    //     })
    // }
}

const pointCloud = renderer => {
    if (arceasy.obj.view !== '' && arceasy.obj.view !== undefined) {
        run()
    }
}

export const changeRenderer = renderer => {
    const layer = arceasy.layers.find('PointCloud')
    layer.renderer = renderer !== undefined ? renderers[renderer] : renderers[0]
}

export default pointCloud
