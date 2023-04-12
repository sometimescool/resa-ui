<template>
    <div :id="id" class="dropdown">
        <button @click="doOpenList" :class="{ isActive: isOpen }" :style="buttonstyle">
            <slot />
        </button>
        <ItemContainer class="dropdown-list" :itemList="itemList" v-if="isOpen" @closeDropdown="doCloseDropdown" />
    </div>
</template>
  
<script setup>

import { ref, toRef, onBeforeMount, onBeforeUnmount } from 'vue'
import ItemContainer from './DropdownContainer.vue';

const props = defineProps( {
    itemList: {
        type: Array,
        default: () => [],
    },
    id: {
        type: String,
        required: true,
    },
    buttonstyle: {
        type: String,
        default: ""
    }
} )

const isOpen = ref( false )
const id = toRef( props, "id" )
const buttonstyle = toRef( props, "buttonstyle" )

function doOpenList () {
    isOpen.value = !isOpen.value
}
onBeforeMount( () => {
    //Add listener to close drop container if necessary
    window.addEventListener( 'click', doClick );
} )

onBeforeUnmount( () => {
    // clean listener
    window.removeEventListener( 'click', doClick );
} )
function hide () {
    isOpen.value = false;
}
function doCloseDropdown () {
    hide()
}
// click anywhere
function doClick ( event ) {
    if ( !document.getElementById( id.value ).contains( event.target ) ) {
        // click anywhere but not this component
        hide()
    }
}
</script>
  
<style scoped>
button {
    position: relative;
    cursor: pointer;
    transition: 0.3s;
    border: 0px;
    white-space: nowrap;
    top: 50%;
    left: 0;
    transform: translate(0%, -50%);
}

button:focus {
    outline: 0px;
}

button:hover {}

button.isActive {}

.dropdown {
    position: relative;
}

.dropdown-list {
    background: var(--vt-c-white);
    margin-top: 12px;
    left: 50%;
    transform: translateX(-50%);

    position: absolute;
    white-space: nowrap;
    border: 1px solid var(--black-light);
    border-radius: 4px;
    z-index: 10;
    right: auto
}
</style>
  