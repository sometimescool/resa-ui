<template>
    <div class="fieldContainer">
        <div class="field-inner">
            <div class="fieldLabel">{{ label }}</div>
            <component :is="type" :id="id" :ref="id" :modelValue="modelValue" :required="required" :size="size"
                @blur="fieldBlur" @change="fieldChange" @beforeinput="cleanError" @input="inputChange"
                @invalid="invalidField" @properties="properties">
            </component>
        </div>
        <div class="fieldError">{{ state.error }}</div>
    </div>
</template>
<script>
export default {
    inheritAttrs: false
}
</script>
<script setup>
import { toRef, reactive, watch } from 'vue'
import object from "../../lib/object"


const props = defineProps( {
    type: Object,
    modelValue: [String, Number],
    label: String,
    id: String,
    required: String,
    size: {
        type: String,
        default: "20"
    },
    properties: {
        type: Object,
        default: {}
    }
} )
const state = reactive( { error: "" } ) //ref( "" );
const modelValue = toRef( props, 'modelValue' )
const emit = defineEmits( ['fieldValid', 'update:modelValue'] )

/******************************************************************** */
// track changes on value
watch( modelValue,
    ( newValue, oldValue ) => {
        cleanError( newValue, oldValue )
    } )
/**************************************************************** */

function cleanError ( newValue, oldValue ) {
    console.log( '-------------------------> cleanError', newValue, oldValue )
    state.error = ""
}

function fieldBlur ( event ) {
    const valid = event.target.checkValidity()
    let errorTxt = ""
    if ( !valid ) {
        errorTxt = fieldError( event.target.validity )
        state.error = errorTxt
    } else {
        state.error = ""
    }
    emit( 'fieldValid', valid )
    console.log( "FieldBase.fieldBlur", event.target.id, `isValide:${valid}`, object.enumValidity( event.target.validity ), errorTxt )
}

function fieldChange ( event ) {
    console.log( "FieldBase.fieldChange", `isValide:${event.target.checkValidity()}`, object.enumValidity( event.target.validity ) )
}

function inputChange ( event ) {
    emit( 'update:modelValue', event.target.value );
}

function fieldError ( validity ) {
    if ( validity.patternMismatch ) return "Format incorrect"
    if ( validity.valueMissing ) return "Valeur obligatoire"
}

function invalidField ( event ) {
    // console.log( "invalidField", event.target.id )
}

</script>

<style scoped>
.field-inner {
    display: flex;
}

.fieldContainer {
    margin-bottom: 8px;
    flex: 1;
}

.fieldLabel {
    display: inline-block;
    width: 120px;
    text-align: right;
    margin-right: 4px;
    white-space: nowrap;
    overflow: hidden;
}

.fieldError {
    padding-left: 124px;
    font-size: 14px;
    line-height: 14px;
    height: 12px;
    color: red;
}
</style>