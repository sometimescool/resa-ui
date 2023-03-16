<template>
    <form id="clientForm">
        <div class="containerField">
            <div class="fieldLabel">Nom</div>
            <input id="lastName" name="lastName" type="text" v-model="data.lastName" />
        </div>

        <div class=" containerField">
            <div class="fieldLabel">Prénom</div>
            <input id="firstName" name="firstName" type="text" v-model="data.firstName" />
        </div>

        <div class="containerField">
            <div class="fieldLabel">Adresse mail</div>
            <input id="email" name="email" type="text" v-model="data.email" />
        </div>
    </form>
</template>
<script setup>
import { toRef } from 'vue'
const props = defineProps( {
    record: Object
} )

const data = toRef( props, 'record' )

</script >

<style scoped>
.containerField {
    margin: 8px 8px
}

.fieldLabel {
    display: inline-block;
    min-width: 120px;
    text-align: right;
    margin-right: 4px
}
</style>