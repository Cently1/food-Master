<template>
    <div :id="id" :style="{width:width+'px',height:height+'px',margin:'34px auto'}" class="m-map"></div>
</template>

<script>
export default {
    props:{
        width:{
            type:Number,
            default:300
        },
        height:{
            type:Number,
            default:300
        },
        point:{
            type:Array,
            default(){
                return [114.30,30.60]
            }
        }
    }
}
</script>

<style lang="scss">

</style>