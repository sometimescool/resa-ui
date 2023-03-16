<template>
    <div class="right-toolbar">
        <button :disabled="!buttonsState.validate" class="button-icon button-validate" @click="clickButton('save')"
            title="Enregistrer">
            <font-awesome-icon icon="fa-solid fa-check" />
        </button>
        <button :disabled="!buttonsState.cancel" class="button-icon button-cancel" @click="clickButton('cancel')"
            title="Annuler">
            <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
        <button :disabled="!buttonsState.new" class="button-icon button-new" @click="clickButton('new')" title="Nouveau">
            <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
        <button :disabled="!buttonsState.delete" class="button-icon button-delete" @click="clickButton('delete')"
            title="Supprimer">
            <font-awesome-icon icon="fa-solid fa-trash-can" />
        </button>

    </div>
</template>

<script setup>

defineProps( {
    buttonsState: Object
} )

let emit = defineEmits( ['action'] )

function clickButton ( actionId ) {
    emit( "action", actionId )
}
</script >

<style scoped>
.right-toolbar {
    position: absolute;
    top: 80px;
    right: 20px;
}

button {
    display: block;
    margin: 4px 4px;
    padding-top: 4px;
    width: 50px;
    height: 50px;
    color: #374655;
    border: 1px solid #374655;
    border-radius: 4px 4px 4px 4px;
    background-color: white;
    font-size: 20px;
    padding-left: 8px;
    cursor: pointer;
}

button[disabled] {
    background-color: #f4f4f4;
    color: #c6c6c6;
    border-color: #c6c6c6;
}

.button-delete {
    margin-top: 16px;
    color: red
}

.button-validate {
    background-color: var(--main-color);
    color: white;
}

.button-new {
    margin-top: 16px;
}
</style>