/******************************************************************************
* MAP VISUALIZATION E BIG DATA - LUIGUI DELYER | NPI @ WEBRADAR               *
* GITHUB = https://github.com/luiguild/map-visualization-e-big-data           *
* VUE COMPONENTS WRITING USING ATOMIC DESIGN CONCEPT                          *
* SPECIFIC PARTS OF THE JS CODE ARE INSIDE THE COMPONENTS                     *
******************************************************************************/

import Vue from 'vue'
import store from './vuex'
import app from '@/components/templates/app'

Vue.config.debug = true

new Vue({
    store,
    render: h => h(app)
}).$mount('#app')
