<style lang="sass">
    @import ../../sass/imports/_extend

    #webradar
        position: absolute
        left: $pixel-proportion * 2
        z-index: 9
        background-color: transparentize($white, .2)
        border-radius: 0 0 $pixel-proportion / 2 $pixel-proportion / 2
        padding: $pixel-proportion
        padding-bottom: 0

        > img
            width: 120px
</style>

<template lang="pug">
    #webradar
        img(src="static/img/webradar.png")
</template>

<script>
    export default {}
</script>
