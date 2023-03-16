<template>
    <main id="crud-view">
        <ViewHeader :title="title"></ViewHeader>
        <nav>
            <dataGrid :data="grid.data" :columns="columns" :meta="grid.meta" :selectedId='grid.selectedId' @select="select">
            </dataGrid>
        </nav>
        <div class="resizer"></div>
        <main>
            <component :is="editForm" :record="selectedRecord"></component>
        </main>
        <toolBar :buttonsState="buttons.states" @action="actionToolbar"></toolBar>
        <messageDialog v-show="message.isVisible" @action="actionMessageDialog" :buttons="message.buttons">
            <template v-slot:header>{{ message.title }}</template>
            <template v-slot:body>
                <ul v-html="message.message"></ul>
            </template>
        </messageDialog>
    </main>
</template >
  
<script setup>

import dataGrid from "./DataGrid.vue";
import ViewHeader from "./ViewHeader.vue";
import toolBar from "./ToolbarCrud.vue";
import messageDialog from "./MessageDialog.vue";



import { isEmtyObject, isDataChanged, objectClone } from "../../lib/object"
import { useGrid } from "../../use/useGrid.js"
import { useHttpCrud } from "../../use/useHttpCrud.js"
import { useMessageDialog } from "../../use/useMessageDialog.js"

import { ref, watch, toRef } from 'vue'
import { onBeforeUnmount } from 'vue'

const props = defineProps( {
    api: String,
    title: String,
    columns: Array,
    editForm: Object
} )

// use to defined changes in record and restore initial value form
let initialRecord = {}

const api = toRef( props, 'api' );
const columns = toRef( props, 'columns' );

const [getList, get, add, remove, update] = useHttpCrud( api.value )

const buttons = ref( {
    states: {
        validate: false,
        cancel: false,
        new: true,
        delete: false
    }
}, )
const [message, hideMessage, showMessageDataChanged, showError, showMessageConfirmCancel, showMessageConfirmDelete] = useMessageDialog()


const selectedRecord = ref( {} )

const [grid, refreshList] = useGrid( getList, columns.value );


/******************************************************************************
* event emitted by components
*******************************************************************************/
/**
 *  Select record in left list (the grid)
 * @param {*} _id  mongodg uuid
 */
async function select ( _id ) {
    grid.value.selectedId = _id
    if ( dataHasChanged() ) {
        showMessageDataChanged( "close", "cancelAndSelect", "registerAndSelect" )
    } else {
        await selecRecord()
    }
}
/**
 * Action on toolbar 
 * @param {*} action  
 * save : save change or save new record
 * cancel : restore initiale value
 * new : create an empty record (but don't save it)
 * removeRecord : delete current record
 */
async function actionToolbar ( action ) {
    switch ( action ) {
        case "save": {
            await save()
            break
        }
        case "cancel": {
            showMessageConfirmCancel( "close", "cancel" )
            break
        }
        case "new": {
            if ( dataHasChanged() ) {
                showMessageDataChanged( "close", "cancel", "registerAndNewRecord" )
            } else {
                await newRecord()
            }
            break
        }
        case "delete": {
            showMessageConfirmDelete( "close", "confirmDelete" )
            break
        }
    }
}

async function actionMessageDialog ( action ) {
    switch ( action ) {
        case "close": {
            // On ferme sans rien faire
            hideMessage()
            break
        }
        case "registerAndNewRecord": {
            // On Enregistre les modif et on ferme
            const isOk = await save()
            if ( isOk ) {
                await newRecord()
                hideMessage()
            }
            break
        }
        case "cancel": {
            // On Abandonne les modif et on ferme
            cancel()
            hideMessage()
            break
        }
        case "cancelAndSelect": {
            // On Abandonne les modif, on selectionne et on ferme 
            cancel()
            await selecRecord()
            hideMessage()
            break
        }
        case "registerAndSelect": {
            const isOk = await save()
            if ( isOk ) {
                await selecRecord()
                hideMessage()
            }
            break
        }
        case "confirmDelete": {
            await removeRecord()
            hideMessage()
            break
        }
    }
}

/******************************************************************************
* CRUD
*******************************************************************************/
function newRecord () {
    initialRecord = {};
    selectedRecord.value = {}
}
function cancel () {
    selectedRecord.value = objectClone( initialRecord );
}
async function save () {
    let jsonResponse;
    if ( isEmtyObject( selectedRecord.value ) ) return
    if ( selectedRecord.value._id ) {
        jsonResponse = await update( selectedRecord.value._id, selectedRecord.value )
    } else {
        jsonResponse = await add( selectedRecord.value )
    }
    if ( !jsonResponse.error ) {
        initialRecord = jsonResponse.data;
        selectedRecord.value = objectClone( initialRecord );
    } else {
        showError( "close", jsonResponse.error.errors )
    }
    await refreshList()
    return ( jsonResponse.error ? false : true )
}

async function removeRecord () {
    let jsonResponse;
    if ( isEmtyObject( selectedRecord.value ) ) return
    if ( !selectedRecord.value._id ) return
    jsonResponse = await remove( selectedRecord.value._id );
    if ( !jsonResponse.error ) {
        initialRecord = {};
        selectedRecord.value = {};
    };
    await refreshList()
}

/******************************************************************** */
// track changes on record selected
watch( selectedRecord,
    () => {
        ensureButtonState()
    },
    { deep: true } )

/******************************************************************** */
// Manage button states depending on selectedRecord changes
function ensureButtonState () {
    let dataChanged = dataHasChanged()
    buttons.value.states.delete = ( !isEmtyObject( initialRecord ) && initialRecord._id !== null );
    buttons.value.states.new = true;
    buttons.value.states.cancel = dataChanged;
    buttons.value.states.validate = dataChanged;
}
function dataHasChanged () {
    return isDataChanged( initialRecord, selectedRecord.value )
}

async function selecRecord () {
    let entity = await get( grid.value.selectedId )
    selectedRecord.value = entity.data;
    initialRecord = objectClone( entity.data );
}



onBeforeUnmount( () => {
    console.log( "before unmount" )
} )
</script>
  
<style scoped>
.resizer {
    grid-area: resizer;
    max-height: calc(100vh - 40px);
    background-color: var(--resizer);
}

.resizer:hover {
    cursor: e-resize
}

nav {
    padding-top: 10px;
    grid-area: nav;
    /**120 les deux header */
    max-height: calc(100vh - 120px);
    overflow: auto;
    font-size: 12px;
}

main>main {
    padding-top: 10px;
    grid-area: content;
    max-height: calc(100vh - 120px);
    overflow: auto
}

#crud-view {
    overflow: hidden;
    display: grid;
    grid-template:
        "header header header header" 50px "nav resizer content content" calc(100vh - 80px) "nav resizer content content" calc(100vh - 80px) / 300px 6px auto auto;
    font-weight: normal;
}
</style>