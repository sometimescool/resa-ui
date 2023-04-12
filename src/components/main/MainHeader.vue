<template>
    <header style="display:flex">
        <div>
            <wsf-logo class="logo" height="30px" />
        </div>
        <div style="width:90%">

        </div>
        <div style="display:flex">
            <dropdownMenu :buttonstyle="iconButtonStyle" id="menu1" :itemList="itemList1">
                <font-awesome-icon icon="fa-solid fa-bars" />
            </dropdownMenu>
            <dropdownMenu :buttonstyle="textButtonStyle" id="menu3" :itemList="itemList2">
                Text button
            </dropdownMenu>
            <dropdownMenu :buttonstyle="iconButtonStyle" id="menu2" :itemList="itemList3">
                <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
            </dropdownMenu>
        </div>
    </header>
</template>
<script setup>
import { ref } from "vue"
import dropdownMenu from '../widgets/dropdown/DropdownMenu.vue'

// defined items 
const itemList1 = ref( [
    {
        text: 'Action number 1',
        action: doClickItem1,
    },
    {
        text: 'Action 2',
        action: doClickItem2,
    },
    {
        text: 'Action 3',
        action: doClickItem3,
    },
] )
const itemList2 = ref( [
    {
        text: 'Test 1',
        action: doClickItem4,
    },
    {
        text: 'Test 2',
        action: doClickItem5,
    }
] )
const itemList3 = ref( [
    {
        text: 'Item 1',
        action: doClickItem6,
    },
    {
        text: 'Item 2',
        action: doClickItem7,
    },
    {
        text: 'Item 3',
        action: doClickItem8,
    },
    {
        text: 'Item 4',
        action: doClickItem9,
    }
] )
// design buttons
const iconButtonStyle = ref( "background:var(--black-light);color: var(--vt-c-white);flex:1;font-size:20px;padding:0px 12px" )
const textButtonStyle = ref( "background:var(--black-light);color: var(--vt-c-white);flex:1;font-size:16px;padding:0px 12px;padding-top:6px" )

function doClickItem1 () {
    console.log( 'doClickItem1' )
}
function doClickItem2 () {
    console.log( 'doClickItem2' )
}
function doClickItem3 () {
    console.log( 'doClickItem3' )
}
function doClickItem4 () {
    console.log( 'doClickItem4' )
}
function doClickItem5 () {
    console.log( 'doClickItem5' )
}
function doClickItem6 () {
    console.log( 'doClickItem6' )
}
function doClickItem7 () {
    console.log( 'doClickItem7' )
}
function doClickItem8 () {
    console.log( 'doClickItem8' )
}
function doClickItem9 () {
    console.log( 'doClickItem9' )
}
</script>
<style scoped>
header {
    grid-area: header;
    background-color: var(--black-light);
    color: var(--vt-c-white);
    font-size: 18px;
    padding: 4px 8px;
    font-weight: bold;
}

.logo {
    position: relative;
    top: 50%;
    left: 0;
    transform: translate(0%, -50%);
}
</style>