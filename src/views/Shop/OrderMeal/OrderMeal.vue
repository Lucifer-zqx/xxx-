<template>
    <div>
        Order...
    </div>
</template>

<script>
export default {
    name:'Order',
    mounted(){ 
        this.$store.dispatch('getOrderMeal')
    
    }
}
</script>

<style>

</style>