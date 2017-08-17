import Vue from 'vue'
import * as arceasy from 'arceasy'

const changeMap = (slide, state) => {
    arceasy.layers.hideAll()

    state.visibility = slide.presentation !== undefined
        ? slide.minimize : true

    // if (slide.light !== undefined) {
    //     // if (slide.light.cameraTracking !== undefined) {
    //     //     arceasy.view.light({
    //     //         cameraTracking: slide.light.cameraTracking
    //     //     })
    //     // }
    //
    //     if (slide.light.date !== undefined) {
    //         arceasy.view.light({
    //             date: slide.light.date
    //         })
    //     }
    // }

    if (slide.coordinates !== undefined ||
        slide.scale !== undefined ||
        slide.camera !== undefined) {
        arceasy.view.newPosition({
            coordinates: slide.coordinates,
            scale: slide.scale,
            camera: slide.camera
        })
    }

    if (slide.basemap !== undefined) {
        arceasy.view.changeBasemap(
            slide.basemap
        )
    }

    if (slide.symbol !== undefined) {
        arceasy.utils.addGraphicLayer(
            slide.symbol,
            slide.point
        )
    }

    if (slide.layer !== undefined) {
        slide.layer.forEach((cur, indx, arr) => {
            arceasy.layers.setVisibility(
                cur,
                true
            )
        })
    }

    if (slide.opacity !== undefined &&
        slide.layer !== undefined) {
        slide.layer.forEach((cur, indx, arr) => {
            arceasy.layers.setOpacity(
                cur,
                slide.opacity
            )
        })
    }

    if (slide.id === 'possibilidades' ||
        slide.id === 'webradar-3') {
        arceasy.utils.hideGraphicLayers()
    }
}

export default {
    start (state) {
        state.actual = 47
    },
    next (state) {
        if (state.actual < state.slides.length - 1) {
            state.actual++
        }
    },
    previous (state) {
        if (state.actual > 0) {
            --state.actual
        }
    },
    visibility (state, status) {
        state.visibility = status
    },
    setSlide (state, slide) {
        Vue.set(state, 'slide', slide)

        if (Object.keys(arceasy.obj.view).length !== 0) {
            changeMap(slide, state)
        }
    }
}
