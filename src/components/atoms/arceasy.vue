<style scoped="" lang="sass">
    @import ../../sass/imports/_extend

    #arceasy
        position: absolute
        left: $pixel-proportion * 2
        bottom: 0
        z-index: 9
        background-color: transparentize($white, .2)
        border-radius: $pixel-proportion $pixel-proportion 0 0
        padding: 2px
        padding-bottom: 0

        > img
            height: $pixel-proportion * 8

    .visible
        opacity: 1

    .hide
        opacity: 0
</style>

<template lang="pug">
    #arceasy(:class="visibility")
        img(src="static/img/arceasy.png")
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        data: () => ({
            visible: true
        }),
        computed: {
            ...mapGetters([
                'slides'
            ]),
            ...mapState({
                actual: state => state.app.actual
            }),
            visibility () {
                if (this.visible) {
                    return 'visible'
                } else {
                    return 'hide'
                }
            }
        },
        watch: {
            actual: function (change) {
                const slide = this.slides[change]

                if (slide.id === 'arceasy') {
                    this.visible = false
                } else {
                    this.visible = true
                }
            }
        }
    }
</script>
