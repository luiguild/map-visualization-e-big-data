import * as arceasy from 'arceasy'

const run = () => {
    const view = arceasy.obj.view
    const externalRenderers = arceasy.obj.constructors.externalRenderers
    const SpatialReference = arceasy.obj.constructors.utils.SpatialReference
    const esriRequest = arceasy.obj.constructors.utils.esriRequest

    var issExternalRenderer = {
        renderer: null,     // three.js renderer
        camera: null,       // three.js camera
        scene: null,        // three.js scene

        ambient: null,      // three.js ambient light source
        sun: null,          // three.js sun light source

        cameraPositionInitialized: true, // we focus the view on the ISS once we receive our first data point
        positionHistory: [],              // all ISS positions received so far

        markerMaterial: null,    // material for the markers left by the ISS
        markerGeometry: null,    // geometry for the markers left by the ISS
        textGeo: null,
        cubeMat: new THREE.MeshLambertMaterial({color: 0xff3300}),

        /**
        * Setup function, called once by the ArcGIS JS API.
        */
        setup: function (context) {
            // initialize the three.js renderer
            this.renderer = new THREE.WebGLRenderer({
                context: context.gl,
                premultipliedAlpha: false
            })
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.renderer.setViewport(0, 0, view.width, view.height)

            // prevent three.js from clearing the buffers provided by the ArcGIS JS API.
            this.renderer.autoClearDepth = false
            this.renderer.autoClearStencil = false
            this.renderer.autoClearColor = false

            // The ArcGIS JS API renders to custom offscreen buffers, and not to the default framebuffers.
            // We have to inject this bit of code into the three.js runtime in order for it to bind those
            // buffers instead of the default ones.
            var originalSetRenderTarget = this.renderer.setRenderTarget.bind(this.renderer)
            this.renderer.setRenderTarget = function (target) {
                originalSetRenderTarget(target)
                if (target === null) {
                    context.bindRenderTarget()
                }
            }

            // setup the three.js scene
            this.scene = new THREE.Scene()

            // setup the camera
            this.camera = new THREE.PerspectiveCamera()

            // setup scene lighting
            this.ambient = new THREE.AmbientLight(0xffffff, 0.5)
            this.scene.add(this.ambient)
            this.sun = new THREE.DirectionalLight(0xffffff, 0.5)
            this.scene.add(this.sun)

            // var text = 'aems'
            var height = 200000
            var size = 3000000
            var curveSegments = 10
            var bevelThickness = 1
            var bevelSize = 0.5
            var bevelSegments = 5
            var bevelEnabled = true
            var font = undefined // eslint-disable-line

            var loader = new THREE.FontLoader()

            // load font
            loader.load('../../static/js/neutra-text_bold.json', function (res) {
                font = res

                this.textGeo = new THREE.TextGeometry('FUCK YOU', {
                    font: font,
                    size: size,
                    height: height,
                    curveSegments: curveSegments,
                    weight: 'normal',
                    bevelThickness: bevelThickness,
                    bevelSize: bevelSize,
                    bevelSegments: bevelSegments,
                    bevelEnabled: bevelEnabled
                })
                // textGeo.computeBoundingBox()
                // textGeo.computeVertexNormals()
                this.text = new THREE.Mesh(this.textGeo, this.cubeMat)
                this.text.position.set(-3680771.7550677415, -4627666.118733402, -3313573.1124258405)
                // this.text.position.set(0, 0, 0)
                // this.text.castShadow = true

                // this.scene.add(this.text)
            }.bind(this), undefined, function (error) {
                console.error('Error loading font. ', error)
            })

            this.queryISSPosition()

            // cleanup after ourselfs
            context.resetWebGLState()
        },

        render: function (context) {
            // update camera parameters
            var cam = context.camera

            this.camera.position.set(cam.eye[0], cam.eye[1], cam.eye[2])
            this.camera.up.set(cam.up[0], cam.up[1], cam.up[2])
            // this.camera.position.set(0, 0, 0)
            // this.camera.up.set(0, 0, 0)
            this.camera.lookAt(new THREE.Vector3(cam.center[0], cam.center[1], cam.center[2]))
            // this.camera.lookAt(new THREE.Vector3(0, 0, 0))

            // Projection matrix can be copied directly
            this.camera.projectionMatrix.fromArray(cam.projectionMatrix)

            // if (this.textGeo) {
                // var posEst = this.computeISSPosition()
                // var renderPos = [0, 0, 0]
                // externalRenderers.toRenderCoordinates(view, posEst, 0, SpatialReference.WGS84, renderPos, 0, 1)
                // this.textGeo.position.set(renderPos[0], renderPos[1], renderPos[2])

                // for the region, we position a torus slightly under ground
                // the torus also needs to be rotated to lie flat on the ground
                // posEst = [posEst[0], posEst[1], -450 * 1000]

                // var transform = new THREE.Matrix4()
                // transform.fromArray(externalRenderers.renderCoordinateTransformAt(view, posEst, SpatialReference.WGS84, new Array(16)))
                // transform.decompose(this.textGeo.position, this.textGeo.quaternion, this.textGeo.scale)
            // }

            var l = context.sunLight
            this.sun.position.set(
                l.direction[0],
                l.direction[1],
                l.direction[2]
            )
            this.sun.intensity = l.diffuse.intensity
            this.sun.color = new THREE.Color(l.diffuse.color[0], l.diffuse.color[1], l.diffuse.color[2])

            this.ambient.intensity = l.ambient.intensity
            this.ambient.color = new THREE.Color(l.ambient.color[0], l.ambient.color[1], l.ambient.color[2])

            // draw the scene
            this.renderer.resetGLState()
            this.renderer.render(this.scene, this.camera)

            // as we want to smoothly animate the ISS movement, immediately request a re-render
            externalRenderers.requestRender(view)

            // cleanup
            context.resetWebGLState()
        },

        lastPosition: null,
        lastTime: null,

        computeISSPosition: function () {
            if (this.positionHistory.length === 0) { return [0, 0, 0] }

            if (this.positionHistory.length === 1) {
                var entry1 = this.positionHistory[this.positionHistory.length - 1]
                return entry1.pos
            }

            var now = Date.now() / 1000
            var entry1 = this.positionHistory[this.positionHistory.length - 1] // eslint-disable-line

            // initialize the remembered ISS position
            if (!this.lastPosition) {
                this.lastPosition = entry1.pos
                this.lastTime = entry1.time
            }

            // compute a new estimated position
            var dt1 = now - entry1.time
            var est1 = [
                entry1.pos[0] + dt1 * entry1.vel[0],
                entry1.pos[1] + dt1 * entry1.vel[1]
            ]

            // compute the delta of current and newly estimated position
            var dPos = [
                est1[0] - this.lastPosition[0],
                est1[1] - this.lastPosition[1]
            ]

            // compute required velocity to reach newly estimated position
            // but cap the actual velocity to 1.2 times the currently estimated ISS velocity
            var dt = now - this.lastTime
            if (dt === 0) { dt = 1.0 / 1000 }

            var catchupVel = Math.sqrt(dPos[0] * dPos[0] + dPos[1] * dPos[1]) / dt
            var maxVel = 1.2 * Math.sqrt(entry1.vel[0] * entry1.vel[0] + entry1.vel[1] * entry1.vel[1])
            var factor = catchupVel <= maxVel ? 1.0 : maxVel / catchupVel

            // move the current position towards the estimated position
            var newPos = [
                this.lastPosition[0] + dPos[0] * factor,
                this.lastPosition[1] + dPos[1] * factor,
                entry1.pos[2]
            ]

            this.lastPosition = newPos
            this.lastTime = now

            return newPos
        },

        queryISSPosition: function () {
            esriRequest('//open-notify-api.herokuapp.com/iss-now.json', {
                callbackParamName: 'callback',
                responseType: 'json'
            })
            .then(function (response) {
                var result = response.data

                var vel = [0, 0]
                if (this.positionHistory.length > 0) {
                    var last = this.positionHistory[this.positionHistory.length - 1]
                    var deltaT = result.timestamp - last.time
                    var vLon = (result.iss_position.longitude - last.pos[0]) / deltaT
                    var vLat = (result.iss_position.latitude - last.pos[1]) / deltaT
                    vel = [vLon, vLat]
                }

                this.positionHistory.push({
                    pos: [result.iss_position.longitude, result.iss_position.latitude, 400 * 1000],
                    time: result.timestamp,
                    vel: vel
                })

                // create a new marker object from the second most recent position update
                if (this.positionHistory.length >= 2) {
                    var entry = this.positionHistory[this.positionHistory.length - 2]

                    var renderPos = [0, 0, 0]
                    externalRenderers.toRenderCoordinates(view, entry.pos, 0, SpatialReference.WGS84, renderPos, 0, 1)

                    // var markerObject = new THREE.Mesh(this.textGeo, this.cubeMat)
                    this.text.position.set(renderPos[0], renderPos[1], renderPos[2])
                    // this.scene.add(markerObject)
                }
            }.bind(this))
            .always(function () {
                // request a new position update in 5 seconds
                setTimeout(this.queryISSPosition.bind(this), 8000)
            }.bind(this))
        }
    }
    // register the external renderer
    externalRenderers.add(view, issExternalRenderer)
}

const text = () => {
    if (arceasy.obj.view !== '' && arceasy.obj.view !== undefined) {
        run()
    }
}

export default text
