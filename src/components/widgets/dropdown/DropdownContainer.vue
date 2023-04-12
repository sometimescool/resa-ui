<template>
    <div class="dropdown-list" ref="dropdownlist">
        <Item v-for="(item, index) in itemList" :key="index" :item="item" @closeDropdown="closeDropdown">
            {{ item.text }}
        </Item>
    </div>
</template>
  
  
<script setup>
import { ref, onMounted } from "vue"
import Item from './DropdownItem.vue';

let emit = defineEmits( ['closeDropdown'] )

defineProps( {
    itemList: {
        type: Array,
        default: () => []
    }
} )
const dropdownlist = ref( null )

/*resend to parent because custom event do not bubble*/
function closeDropdown ( event ) {
    emit( "closeDropdown", event )
}

onMounted( () => {
    //Body width
    const bodyWidth = dropdownlist.value.ownerDocument.body.clientWidth
    // Container items size
    const componentWidth = dropdownlist.value.offsetWidth
    // Container items position
    const componentPosition = dropdownlist.value.getBoundingClientRect().left
    if ( componentPosition + componentWidth >= bodyWidth ) {
        // component is outside (right) of body
        dropdownlist.value.style.left = `${( bodyWidth - ( componentPosition + componentWidth ) )}px`
    } else if ( componentPosition < 0 ) {
        // component is outside (left) of body
        dropdownlist.value.style.transform = 'none' // because component is centered by transform css
        dropdownlist.value.style.left = "0px"
    }

} )
</script>
  
<style scoped>
.dropdown-list {
    overflow: hidden;
}
</style>
  