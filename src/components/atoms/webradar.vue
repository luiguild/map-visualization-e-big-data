<style lang="sass">
    @import ../../sass/imports/_extend

    #webradar
        position: absolute
        left: $pixel-proportion * 2
        z-index: 9
        background-color: transparentize($white, .2)
        border-radius: 0 0 $pixel-proportion $pixel-proportion
        padding: $pixel-proportion
        padding-bottom: $pixel-proportion / 4

        > img
            width: $pixel-proportion * 15
</style>

<template lang="pug">
    #webradar
        img(src="static/img/webradar.png")
</template>

<script>
    export default {}
</script>
