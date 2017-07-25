<style scoped lang="sass">
    @import ../../sass/imports/_extend

    #internal
        position: relative
        height: 80%
        width: 75%
        +flex(column, n, center, center)

        > h1
            font-size: 120px
            font-weight: 900
            line-height: 90px

        > h2
            font-size: 40px
            line-height: 30px
            margin-top: 1px

        > h1,
        > h2
            text-shadow: 0 0 30px $black
            color: $white
            // +upper-case
</style>

<template lang="pug">
    #internal
        h1.title.is-1.has-text-centered
            | Map
            br
            | visualization
            br
            | e Big Data
        h2.subtitle.is-2.has-text-centered
            | Transformando informação em valor,
            br
            | latitude e longitude.
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: [],
        data: () => ({}),
        activate: function () {
            console.log('activate')
        },
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
            ...mapActions([])
        },
        filters: {},
        watch: {}
    }
</script>
