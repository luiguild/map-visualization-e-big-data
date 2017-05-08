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

            &:first-of-type
                width: 100%
                +flex(row, n, space-between, center)

            &:last-of-type
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
</style>

<template lang="pug">
    #controls
        .controller-group
            .controller.left
                i.fa.fa-chevron-left
            .controller.right
                i.fa.fa-chevron-right

        .controller-group
            .controller.up.is-disabled
                i.fa.fa-chevron-up
            .controller.down.is-disabled
                i.fa.fa-chevron-down
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'

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
            ...mapState({})
        },
        methods: {
            ...mapMutations([])
        },
        filters: {},
        watch: {}
    }
</script>
