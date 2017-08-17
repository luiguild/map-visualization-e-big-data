import * as arceasy from 'arceasy'

const renderers = [
    {
        field: 'RGB'
    },
    {
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
    },
    {
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
    },
    {
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
    }
]

const run = () => {
    const map = arceasy.obj.map
    const PointCloudLayer = arceasy.obj.constructors.layer.PointCloudLayer

    // Create Point Cloud Layer
    var pcLayer = new PointCloudLayer({
        url: 'https://tiles.arcgis.com/tiles/V6ZHFr6zdgNZuVG0/arcgis/rest/services/BARNEGAT_BAY_LiDAR_UTM/SceneServer',
        id: 'PointCloud',
        raw: ''
    })

    // Assign the renderer to the point cloud layers
    pcLayer.renderer = makeRenderer(1)
    map.add(pcLayer)
}

const makeRenderer = renderer => {
    const PointCloudUniqueValueRenderer = arceasy.obj.constructors.renderer.PointCloudUniqueValueRenderer
    const PointCloudRGBRenderer = arceasy.obj.constructors.renderer.PointCloudRGBRenderer
    const PointCloudStretchRenderer = arceasy.obj.constructors.renderer.PointCloudStretchRenderer
    const PointCloudClassBreaksRenderer = arceasy.obj.constructors.renderer.PointCloudClassBreaksRenderer

    let finalRenderer

    if (parseInt(renderer) === undefined ||
        parseInt(renderer) === '' ||
        !parseInt(renderer)) {
        finalRenderer = renderers[0]
    } else {
        finalRenderer = renderers[parseInt(renderer)]
    }

    const arrConstructors = [
        new PointCloudRGBRenderer(finalRenderer),
        new PointCloudUniqueValueRenderer(finalRenderer),
        new PointCloudStretchRenderer(finalRenderer),
        new PointCloudClassBreaksRenderer(finalRenderer)
    ]

    return arrConstructors[parseInt(renderer)]
}

const pointCloud = () => {
    if (arceasy.obj.view !== '' && arceasy.obj.view !== undefined) {
        run()
    }
}

export const changeRenderer = renderer => {
    const layer = arceasy.layers.find('PointCloud')
    layer.renderer = renderer !== undefined ? makeRenderer(renderer) : makeRenderer(0)
}

export default pointCloud
