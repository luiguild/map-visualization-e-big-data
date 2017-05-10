// import Vue from 'vue'

export default {
    next (state) {
        if (state.actual < state.slides) {
            state.actual++
        }
    },
    previous (state) {
        if (state.actual > 1) {
            --state.actual
        }
    },
    visibility (state, status) {
        state.visibility = status
    }
}
