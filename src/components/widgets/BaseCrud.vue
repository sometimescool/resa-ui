<template>
    <main id="crud-view" ref="crudView">
        <ViewHeader :title="title"></ViewHeader>
        <nav ref="leftList">
            <dataGrid :data="grid.data" :columns="columns" :meta="grid.meta" :selectedId='grid.selectedId' @select="select">
            </dataGrid>
        </nav>
        <sf-vertical-sizer class="resizer" @endResize="endResize"></sf-vertical-sizer>
        <main>
            <component :is="editForm" :record="model.data" @fieldValid="fieldValid" @change="fieldChange">
            </component>
        </main>
        <toolBar :buttonsState="buttons.states" @action="actionToolbar"></toolBar>
        <sf-message-dialog v-show="message.isVisible" @action="actionMessageDialog" :buttons="message.buttons">
            <template v-slot:header>{{ message.title }}</template>
            <template v-slot:body>
                <ul v-html="message.message"></ul>
            </template>
        </sf-message-dialog>
        <sf-banner :show="showBanner" :text="textBanner" @toogle-banner="(value) => { showBanner = value }"></sf-banner>
    </main>
</template >
  
<script setup>

import dataGrid from "./DataGrid.vue";
import ViewHeader from "./ViewHeader.vue";
import toolBar from "./ToolbarCrud.vue";

import object from "../../lib/object"
import { useGrid } from "../../use/useGrid.js"
import { useMessageDialog } from "../../use/useMessageDialog.js"

import { ref, toRef } from 'vue'
import { onBeforeUnmount } from 'vue'

const props = defineProps( {
    api: String,
    title: String,
    columns: Array,
    editForm: Object,
    Model: Function
} )
const leftList = ref( 'leftList' )
const crudView = ref( 'crudView' )
const columns = toRef( props, 'columns' );
const showBanner = ref( false )
const textBanner = ref( "" )
const buttons = ref( {
    states: {
        validate: false,
        cancel: false,
        new: true,
        delete: false
    }
}, )
const [message, hideMessage, showMessageDataChanged, showError, showMessageConfirmCancel, showMessageConfirmDelete] = useMessageDialog()

const model = new props.Model( {} )

const isValid = ref( false );
const [grid, refreshList] = useGrid( model.getList, columns.value );

function doShowBanner ( text ) {
    showBanner.value = true
    textBanner.value = text
}
/******************************************************************************
* event emitted by components
*******************************************************************************/
// function fieldBlur ( event ) {
//     console.log( `BaseCrud.fieldChange ${event.target.id} ${event.target.value}  isValide: ${event.target.checkValidity()}`, object.enumValidity( event.target.validity ) )
// }
function endResize ( value ) {
    crudView.value.style.gridTemplateColumns = ` ${value}px 6px auto auto`
}
function fieldChange ( event ) {
    console.log( `BaseCrud.fieldChange ${event.target.id} ${event.target.value}  isValide: ${event.target.checkValidity()}`, object.enumValidity( event.target.validity ) )
}

function fieldValid ( form, fieldValid ) {
    isValid.value = form.value.checkValidity();
    ensureButtonState()
    console.log( "BaseCrud.formValid", isValid.value )
}
/**
 *  Select record in left list (the grid)
 * @param {*} _id  mongodg uuid
 */
async function select ( _id ) {
    grid.value.selectedId = _id
    if ( model.hasChanged() ) {
        showMessageDataChanged( "close", "cancelAndSelect", "registerAndSelect" )
    } else {
        await selectRecord()
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
            if ( model.hasChanged() ) {
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
            await selectRecord()
            hideMessage()
            break
        }
        case "registerAndSelect": {
            const isOk = await save()
            if ( isOk ) {
                await selectRecord()
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
    model.initData( {} );
}
function cancel () {
    model.restoreData();
    ensureButtonState()
}
async function save () {
    let jsonResponse;
    let data = model.getData();
    let textBanner = ""
    if ( object.isEmtyObject( data ) ) return
    if ( data._id ) {
        jsonResponse = await model.update( data._id, data );
        textBanner = 'Modification terminée'
    } else {
        jsonResponse = await model.add( data )
        textBanner = 'Création terminée'
    }
    if ( !jsonResponse.error ) {
        model.initData( jsonResponse.data );
        ensureButtonState();
        doShowBanner( textBanner )
    } else {
        showError( "close", jsonResponse.error.errors )
    }
    await refreshList()
    return ( jsonResponse.error ? false : true )
}

async function removeRecord () {
    let jsonResponse;
    let data = model.getData();
    if ( object.isEmtyObject( data ) ) return
    if ( !data._id ) return
    jsonResponse = await model.remove( data._id );
    if ( !jsonResponse.error ) {
        model.initData( {} );
        ensureButtonState()
        doShowBanner( "Suppression terminée" )
    };
    await refreshList()
}

/******************************************************************** */
// track changes on record selected
// watch( model.data,
//     ( newRecord, oldRecord ) => {
//         ensureButtonState()
//     },
//     { deep: true } )

/******************************************************************** */
// Manage button states depending on selectedRecord changes
function ensureButtonState () {
    let dataChanged = model.hasChanged()
    buttons.value.states.delete = model.initialized()
    buttons.value.states.new = true;
    buttons.value.states.cancel = dataChanged;
    buttons.value.states.validate = dataChanged && isValid.value;
    console.log( "ensureButtonState", buttons.value.states )
}
async function selectRecord () {
    let entity = await model.get( grid.value.selectedId )
    model.initData( entity.data );
    ensureButtonState()
    console.log( model )
}

onBeforeUnmount( () => {
    console.log( "before unmount" )
} )
</script>
  
<style scoped>
nav {
    padding-top: 10px;
    grid-area: nav;
    overflow: auto;
    font-size: 12px;
}

#main-vue>main {
    grid-area: content;
    max-height: calc(100vh - 60px);
}

#crud-view {
    overflow: hidden;
    display: grid;
    grid-template:
        "header header header header" 50px "nav resizer content content" "nav resizer content content" / 300px 6px auto auto;
    font-weight: normal;
}

#crud-view>main {
    grid-area: content;
    overflow: auto;
}
</style>