<template>
    <main id="crud-view" ref="crudView">
        <ViewHeader :title="title"></ViewHeader>
        <nav ref="leftList">
            <dataGrid :data="grid.data" :columns="columns" :meta="grid.meta" :selectedId='grid.selectedId'
                @select="select" />
        </nav>
        <wsf-vertical-sizer class="resizer" @endResize="endResize" />
        <main>
            <component :is="editForm" :record="model.data" @fieldValid="fieldValid" @change="fieldChange">
            </component>
        </main>
        <toolBar :buttonsState="buttons.states" @action="actionToolbar"></toolBar>

        <wsf-message-dialog v-show="message.isVisible" @action="(action) => setDialogResponse(action)"
            :buttons="message.buttons">
            <template v-slot:header>{{ message.title }}</template>
            <template v-slot:body>
                <ul v-html="message.message"></ul>
            </template>
        </wsf-message-dialog>
        <wsf-banners-container :bannerToAdd="bannerToAdd" />
    </main>
</template >
  
<script setup>

import dataGrid from "./widgets/DataGrid.vue";
import ViewHeader from "./widgets/ViewHeader.vue";
import toolBar from "./widgets/ToolbarCrud.vue";

import object from "../lib/object"
import { useGrid } from "../use/useGrid.js"
import { useMessageDialog } from "../use/useMessageDialog.js"

import { ref, toRef } from 'vue'
import { onBeforeUnmount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

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
const bannerToAdd = ref( {} );
const buttons = ref( {
    states: {
        validate: false,
        cancel: false,
        new: true,
        delete: false
    }
}, )
const [message, showDialog, setDialogResponse] = useMessageDialog()

const model = new props.Model( {} )

const isValid = ref( false );
const [grid, refreshList] = useGrid( model.getList, columns.value );

function doShowBanner ( text ) {
    bannerToAdd.value = {
        text: text,
        autoHide: 3000
    }
}
/******************************************************************************
* event emitted by components
*******************************************************************************/
// function fieldBlur ( event ) {
//     console.log( `BaseCrud.fieldChange ${event.target.id} ${event.target.value}  isValide: ${event.target.checkValidity()}`, object.enumValidity( event.target.validity ) )
// }
function endResize ( dep ) {
    const newSize = leftList.value.scrollWidth + dep;
    crudView.value.style.gridTemplateColumns = ` ${newSize}px 6px auto auto`
}
function fieldChange ( event ) {
    console.log( `BaseCrud.fieldChange ${event.target.id} ${event.target.value}  isValide: ${event.target.checkValidity()}`, object.enumValidity( event.target.validity ) )
}

function fieldValid ( form /*, fieldValid*/ ) {
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
        const response = await showDialogDataChange()
        switch ( response ) {
            case 0: return; // do nothing 
            case 1: break; // continue : loose updates and select
            case 2: {
                const isSaveOk = await save()
                if ( !isSaveOk ) return   // stay on the page
                // save and continue selection
            }
        }
    }
    await selectRecord()
}
async function showDialogDataChange () {
    const response = await showDialog( 'Des modifications sont en cours.',
        { mess: { message: "Que voulez-vous faire des modifications ?" } },
        [
            { label: 'Ne rien faire', action: 0 },
            { label: 'Les abandonner et continuer', action: 1 },
            { label: 'Les enregister et continuer', action: 2, default: true }
        ] )
    return response
}
async function showMessageConfirmCancel () {
    const response = await showDialog( 'Vous voulez abandonner vos modifications.',
        { mess: { message: "Confirmer l'abandon des modifications" } },
        [
            { label: 'Non', action: 0 },
            { label: 'Oui', action: 1 },
        ] )
    return response
}

async function showMessageConfirmDelete () {
    const response = await showDialog( "Suppression de l'élément courant.",
        { mess: { message: "Confirmer la suppression ?" } },
        [
            { label: 'Non', action: 0 },
            { label: 'Oui', action: 1 },
        ] )
    return response
}
async function showDialogError ( messages ) {
    const response = await showDialog( "Erreur",
        messages,
        [{ label: 'Fermer', action: 1, default: true }]
    )
    return response

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
            let response = await showMessageConfirmCancel()
            switch ( response ) {
                case 0: break // no : keep updates
                case 1: cancelUpdate() // yes : loose updates
            }
            break
        }
        case "new": {
            if ( model.hasChanged() ) {
                const response = await showDialogDataChange()
                switch ( response ) {
                    case 0: return; // do nothing 
                    case 1: break; // continue : loose updates and new record
                    case 2: {
                        const isSaveOk = await save()
                        if ( !isSaveOk ) return   // stay on the page
                        // save and continue new record
                    }
                }
            }
            await newRecord()
            break
        }
        case "delete": {
            const response = await showMessageConfirmDelete()
            switch ( response ) {
                case 0: break // no : keep updates
                case 1: await removeRecord() // yes : delete record
            }
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
function cancelUpdate () {
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
        await showDialogError( jsonResponse.error.errors )
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
onBeforeRouteLeave( async ( /*to, from*/ ) => {
    if ( model.hasChanged() ) {
        const response = await showDialogDataChange()
        switch ( response ) {
            case 0: return false;
            case 1: return true;
            case 2: return await save()
        }
    }
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

.resizer {
    grid-area: resizer;
    background-color: var(--resizer)
}
</style>