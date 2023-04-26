<template>
    <div class="toolbar">
        <form v-if="config.filter" id="search" @submit.prevent>{{ config.filter.label }} <input name="query"
                :size="config.filter.size" @input="inputChange">
        </form>
    </div>
</template>

<script setup>
const emit = defineEmits( ['search'] )
defineProps( {
    config: {
        type: Object,
    }
} )
function inputChange ( event ) {
    emit( 'filter', event.target.value )
}
</script>

<style scoped>
input {
    border: 1px solid rgba(0, 0, 0, 0.5);
}

input:focus {
    outline: 1px solid rgba(0, 0, 0, 0.5);
}
</style>