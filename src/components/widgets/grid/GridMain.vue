<template>
    <div class="gridContainer">
        <wsfToolbar v-if="getProp('toolBar', 'height') !== 0" :config="config.toolBar" class="toolbar"
            @filter="(value) => doFilter(value)"></wsfToolbar>
        <div class="containerHeader">
            <table v-if="getProp('header', 'height') !== 0">
                <wsfHeader :cols=cols :height="getHeight('header')" :sortOrders="sortOrders" @sort="sortCol"
                    @endResizeCol="endResizeCol">
                </wsfHeader>
            </table>
        </div>
        <div class="containerTable" ref="containerTable">
            <table>
                <colgroup>
                    <col v-for="col in cols" :key="col.index" :width="col.width" />
                </colgroup>
                <wsfRow v-for="record in gridRecords" :key="record._id" :id="record._id" :record="record" :cols="cols"
                    :selected="record._id === currentRecordId" @select="(record) => selectedRecord(record)">
                </wsfRow>

            </table>
        </div>
        <div class="containerFooter">
            <wsfFooter v-if="getProp('footer', 'height') !== 0" :height="getHeight('footer')"></wsfFooter>
        </div>
    </div>
</template>

<script setup>
import { ref, toRef, onMounted, computed } from "vue"

import wsfToolbar from "./GridToolBar.vue"
import wsfHeader from "./GridHeader.vue"
import wsfRow from "./GridRow.vue"
import wsfFooter from "./GridFooter.vue"


const props = defineProps( {
    records: {
        type: Array,
        default: () => []
    },
    cols: {
        type: Array,
        default: () => []
    },
    config: {
        type: Object,
    }
} )

const config = toRef( props, "config" )
const cols = toRef( props, "cols" )
const records = toRef( props, "records" )

const containerTable = ref( "containerTable" )
let sortKey = ref( null )
let filterKey = ref( null )
const sortOrders = ref( {} )


const gridRecords = computed( () => sortFilteredRecord() )

const currentRecordId = ref( null )




/**
 * set default sortOrder (no sort)
 */
function initSortOrder () {
    cols.value.forEach( ( col ) => {
        if ( col.sortable ) {
            sortOrders.value[col.name] = 0
        }
    } )
}
/**
 * Used by computed gridRecords.
 * Sort and filter not case sensitive
 */
function sortFilteredRecord () {
    const order = sortOrders.value[sortKey.value]
    const searchKey = filterKey.value && filterKey.value.toLowerCase();

    let data = records.value.slice()

    if ( searchKey ) {
        let dislayCols = cols.value.map( ( col ) => col.name ); // just filter on visible data
        console.log( dislayCols )
        data = data.filter( function ( row ) {
            return Object.keys( row ).some( function ( key ) {
                if ( !dislayCols.includes( key ) ) return false
                return String( row[key] ).toLowerCase().indexOf( searchKey ) > -1;
            } )
        } )
    }

    data = data.slice().sort( ( a, b ) => {
        a = a[sortKey.value] ? a[sortKey.value].toLowerCase() : a[sortKey.value];
        b = b[sortKey.value] ? b[sortKey.value].toLowerCase() : b[sortKey.value];
        return ( a === b ? 0 : a > b ? 1 : -1 ) * order;
    } )
    return data
}

/*get Height with unit*/
function getHeight ( what ) {
    return `${getProp( what, 'height' )}px`
}
/*get config prop*/
function getProp ( what, prop ) {
    if ( config.value[what] === undefined ) {
        console.warn( `prop config.${what} not found` )
        return null;
    }
    if ( config.value[what][prop] === undefined ) {
        console.warn( `prop config.${what}.${prop} not found` )
        return null;
    }
    return config.value[what][prop]
}
/* calculate height container rows*/
function hTableRows () {
    const ht = ( getProp( "toolBar", "height" ) || 0 ) + ( getProp( "footer", "height" ) || 0 ) + ( getProp( "header", "height" ) || 0 );
    return `calc(100% - ${ht}px)`
}

/**************************************
 * emited by subcomponents
 * 
 **************************************/
/**
 * 
 * @param {*} dep 
 * @param {*} index 
 *  Emit by subcomponents resizer
 */

function endResizeCol ( dep, index ) {
    containerTable
    const cols = Array.from( containerTable.value.getElementsByTagName( "col" ) ); //.find( col => col.dataset.index === index )
    cols.forEach( ( col, indexCol ) => {
        if ( indexCol !== index ) return
        col.style.width = `${col.offsetWidth + dep}px`
    } )
}

/**
 * 
 * @param {*} colName 
 *  Emit by subcomponents "header sort"
 */
function sortCol ( colName ) {
    let sort;
    if ( sortOrders.value[colName] <= 0 ) {
        sort = 1
    } else {
        sort = -1
    }
    initSortOrder()
    sortOrders.value[colName] = sort;
    sortKey.value = colName
}

function selectedRecord ( selectedRecord ) {
    currentRecordId.value = selectedRecord._id
}
function doFilter ( value ) {
    filterKey.value = value
}

onMounted( () => {
    initSortOrder()

} )
</script>

<style scoped>
.toolbar {
    height: v-bind(getHeight("toolBar"));
}

.containerFooter {
    background-color: var(--main-color);
    color: var(--vt-c-white);
    border: 1px solid var(--black-light);
    border-top: 0px;
    box-sizing: border-box;
}

.footer {
    height: v-bind(getHeight("footer"));

}

.gridContainer {
    min-height: 100%;
    height: 100%;
}

.containerHeader {
    height: v-bind(getHeight("header"));
    width: 100%;
    background-color: var(--main-color);
    color: var(--vt-c-white);
    border: 1px solid var(--black-light);
    border-bottom: 0px;
}

.containerHeader>table {
    width: calc(100% - 20px);
    border-collapse: collapse;
    border-spacing: 0px;
}

.containerTable {
    margin-right: 20px;
    max-height: v-bind(hTableRows());
    min-height: v-bind(hTableRows());
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
    border: 1px solid var(--black-light);
    border-top: 0px;
    border-bottom: 0px;
}

.containerTable>table {
    border-spacing: 0px 2px
}

table {
    width: 100%;
    table-layout: fixed;
}
</style>