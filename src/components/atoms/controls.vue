<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #controls
        position: absolute
        z-index: 9
        bottom: $pixel-proportion * 2
        right: $pixel-proportion * 2
        width: 100px
        height: 100px
        +flex(row, n, center, center)

        > .controller-group
            position: absolute

            &:nth-child(2)
                width: 100%
                +flex(row, n, space-between, center)

            &:nth-child(3)
                height: 100%
                +flex(column, n, space-between, center)

            > .controller
                +cursor_pointer

                &:hover
                    > i
                        opacity: 1

                > i
                    font-size: 250%
                    opacity: .5
                    color: $white
                    +transition(.2s)

            > .up
                position: relative
                top: $pixel-proportion * -1

            .is-disabled
                cursor: default

                > i
                    opacity: .2

                &:hover
                    > i
                        opacity: .2

        > .controller-visibility
            > .circle
                position: absolute
                top: $pixel-proportion * 3.8
                left: $pixel-proportion * 4.1
                z-index: 9
                background-color: $white
                opacity: .5
                border-radius: 50%
                min-height: 35px
                max-height: 35px
                height: 35px
                min-width: 35px
                max-width: 35px
                width: 35px
                +flex(row, n, center, center)
                +transition(.2s)
                +cursor_pointer

                &:hover
                    opacity: 1
</style>

<template lang="pug">
    #controls
        .controller-visibility
            .controller.circle(@click="visibilityToggle()")
                i.fa(:class="expand")

        .controller-group
            .controller.left
                i.fa.fa-chevron-left(@click="previous()")
            .controller.right
                i.fa.fa-chevron-right(@click="next()")

        .controller-group
            .controller.up.is-disabled
                i.fa.fa-chevron-up
            .controller.down.is-disabled
                i.fa.fa-chevron-down
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import * as logger from '@/assets/modules/logger'

    export default {
        props: [],
        data: () => ({}),
        created: function () {},
        mounted: function () {},
        updated: function () {},
        destroyed: function () {},
        components: {},
        computed: {
            ...mapGetters([]),
            ...mapState({
                visibility: state => state.app.visibility
            }),
            expand () {
                if (this.visibility) {
                    return 'fa-compress'
                } else {
                    return 'fa-expand'
                }
            }
        },
        methods: {
            ...mapActions([
                'increment',
                'decrement',
                'minimize'
            ]),
            next () {
                logger.log(`Next slide...`)
                this.increment()
            },
            previous () {
                logger.log(`Previous slide...`)
                this.decrement()
            },
            visibilityToggle () {
                if (this.visibility) {
                    logger.log(`Hiding slides...`)
                    this.minimize(false)
                } else {
                    logger.log(`Shoing slides...`)
                    this.minimize(true)
                }
            }
        },
        filters: {},
        watch: {}
    }
</script>
