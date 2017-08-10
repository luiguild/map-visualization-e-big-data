// import Vue from 'vue'

export default {
    increment ({ commit }) {
        commit('next')
    },
    decrement ({ commit }) {
        commit('previous')
    },
    minimize ({ commit }, status) {
        commit('visibility', status)
    },
    actualSlide ({ commit }, slide) {
        commit('setSlide', slide)
    },
    startPresentention ({ commit }) {
        commit('start')
    }
}
