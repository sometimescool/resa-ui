<template>
    <div class="item" @click="doClickItem">
        <slot />
    </div>
</template>
  
<script setup>
import { toRef } from "vue"
let emit = defineEmits( ['closeDropdown'] )
const props = defineProps( {
    item: {
        type: Object,
        required: true,
    }
} )
const item = toRef( props, "item" )

/**
 * 
 * @param {*} event 
 * 
 */
function doClickItem ( event ) {
    // Exec action is callBAck exist
    if ( item.value.action ) item.value.action.apply()
    else console.warn( `Action not defined on dropdownItem ${item.value.text}` )
    // send to parent to close container
    emit( "closeDropdown", event )
}
</script>
  
<style scoped>
.item {
    display: block;
    width: 100%;
    padding: 2px 10px;
    transition: 0.3s;
    position: relative;
    color: var(--black-light);
    cursor: pointer;
    font-size: 16px
}

.item:hover {
    background: var(--text-hover);
}
</style>
  