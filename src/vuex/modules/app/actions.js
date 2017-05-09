// import Vue from 'vue'

export default {
    increment ({ commit }) {
        commit('next')
    },
    decrement ({ commit }) {
        commit('previous')
    }
}
