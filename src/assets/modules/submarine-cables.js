import * as arceasy from 'arceasy'

const run = () => {
    const view = arceasy.obj.view
    const map = arceasy.obj.map
    const GraphicsLayer = arceasy.obj.constructors.layer.GraphicsLayer
    const Query = arceasy.obj.constructors.utils.Query
    const QueryTask = arceasy.obj.constructors.utils.QueryTask
    const Graphic = arceasy.obj.constructors.utils.Graphic
    const geometryEngine = arceasy.obj.constructors.utils.geometryEngine
    const LineSymbol3D = arceasy.obj.constructors.renderer.LineSymbol3D
    const PathSymbol3DLayer = arceasy.obj.constructors.renderer.PathSymbol3DLayer
    const PointSymbol3D = arceasy.obj.constructors.renderer.PointSymbol3D
    const ObjectSymbol3DLayer = arceasy.obj.constructors.renderer.ObjectSymbol3DLayer

    const CABLES = 'http://services.arcgis.com/6DIQcwlPy8knb6sg/arcgis/rest/services/SubmarineCables/FeatureServer/2'
    const CITIES = 'http://services.arcgis.com/6DIQcwlPy8knb6sg/arcgis/rest/services/SubmarineCables/FeatureServer/1'
    const LINKS = 'http://services.arcgis.com/6DIQcwlPy8knb6sg/arcgis/rest/services/SubmarineCables/FeatureServer/3'
    const OFFSET = 30000
    const PIPE_SIZE = 25000
    const CITY_SIZE = 50000
    const DENSIFICATION = 1000000
    const GEOMETRYPRECISION = 3
    let _links = null // eslint-disable-line

    const cablesLayer = new GraphicsLayer({
        id: 'cables',
        raw: {
            id: 'cables'
        },
        url: CABLES,
        definitionExpression: '1=1',
        elevationInfo: {
            mode: 'relativeToGround',
            offset: OFFSET
        }
    })

    const citiesLayer = new GraphicsLayer({
        id: 'cities',
        raw: {
            id: 'cities'
        },
        url: CITIES,
        definitionExpression: '1=1',
        elevationInfo: {
            mode: 'relativeToGround',
            offset: OFFSET
        }
    });

    // center: [40, 22]

    // view.then(function () {
    (() => {
        var query = new Query({
            returnGeometry: true,
            geometryPrecision: GEOMETRYPRECISION,
            outFields: ['Name', 'cable_id', 'color', 'length', 'owners', 'url', 'year'],
            orderByFields: ['Name'],
            where: '1=1'
        })
        var queryTask = new QueryTask({
            url: CABLES
        })
        queryTask.execute(query).then(function (r) {
            view.map.getLayer('cables').add(
                r.features.map(function (e) {
                    return new Graphic({
                        visible: true,
                        attributes: e.attributes,
                        geometry: geometryEngine.geodesicDensify(e.geometry, DENSIFICATION, 'meters'),
                        symbol: new LineSymbol3D({
                            symbolLayers: [
                                new PathSymbol3DLayer({
                                    size: PIPE_SIZE,
                                    material: {
                                        color: e.attributes.color
                                    }
                                })
                            ]
                        })
                    })
                })
            )
        })
    })();

    (() => {
        var query = new Query({
            where: '1=1',
            returnGeometry: true,
            geometryPrecision: GEOMETRYPRECISION,
            outFields: ['Name', 'city_id'],
            orderByFields: ['Name']
        })
        var queryTask = new QueryTask({
            url: CITIES
        })
        queryTask.execute(query).then(function (r) {
            view.map.getLayer('cities').add(
                r.features.map(function (e) {
                    return new Graphic({
                        visible: true,
                        attributes: e.attributes,
                        geometry: e.geometry,
                        symbol: new PointSymbol3D({
                            symbolLayers: [
                                new ObjectSymbol3DLayer({
                                    height: CITY_SIZE,
                                    width: CITY_SIZE,
                                    resource: {
                                        primitive: 'sphere'
                                    },
                                    material: {
                                        color: 'white'
                                    }
                                })
                            ]
                        })
                    })
                })
            )
        })
    })();

    (() => {
        var query = new Query({
            returnGeometry: false,
            outFields: ['city_id', 'cable_id'],
            where: '1=1'
        })
        var queryTask = new QueryTask({
            url: LINKS
        })
        queryTask.execute(query).then(function (r) {
            _links = r.features.map(function (e) { // eslint-disable-line
                return {
                    city: e.attributes.city_id,
                    cable: e.attributes.cable_id
                }
            })
        })
    })()

    // Render all cables
    const cableLayerRender = arceasy.layers.find('cables')
    cableLayerRender.graphics.forEach(function (item) {
        // Make graphic visible
        item.visible = true
    })

    // Render all cities
    const citiesLayerRender = arceasy.layers.find('cities')
    citiesLayerRender.graphics.forEach(function (item) {
        // Make graphic visible
        item.visible = true
    })
    // })
    map.add(cablesLayer)
    map.add(citiesLayer)
}

export const submarineCables = () => {
    if (arceasy.obj.view !== '' && arceasy.obj.view !== undefined) {
        run()
    }
}
