<template>
    <form id="clientForm" ref="form">
        <section class="horizontal">
            <field :type="text" id="lastName" v-model="record.lastName" label="Nom" required="true"
                @fieldValid="fieldValid" />
            <field :type="text" id="firstName" v-model="record.firstName" label="Prénom" required="true"
                @fieldValid="fieldValid" />
        </section>
        <field :type="mail" id="email" v-model="record.email" label="Mail" required="true" @fieldValid="fieldValid" />
        <section class="title">
            <div>Télephone</div>
            <section class="horizontal">
                <field :type="phone" id="mobile" v-model="record.mobile" label="Mobile" required="true"
                    @fieldValid="fieldValid" />
                <field :type="phone" id="phone" v-model="record.phone" label="Fixe" @fieldValid="fieldValid" />
            </section>
        </section>
        <section class="title">
            <div>Adresse</div>
            <section class="horizontal">
                <field :type="streetNum" id="streetNumber" v-model="record.streetNumber" size="5" label="No rue"
                    required="true" @fieldValid="fieldValid" />
                <field :type="text" id="street" v-model="record.street" label="Rue" required="true"
                    @fieldValid="fieldValid" />
            </section>
            <section class="horizontal">
                <field :type="zipCode" id="zipCode" v-model="record.zipCode" size="5" label="Code postal" required="true"
                    @fieldValid="fieldValid" />
                <field :type="text" id="city" v-model="record.city" label="Ville" required="true"
                    @fieldValid="fieldValid" />
            </section>
            <field :type="text" id="country" v-model="record.country" label="Pays" @fieldValid="fieldValid" />

            <section class="title">
                <div>Exemple de champ calculé</div>
                <div class="content" v-html="record.fullAdress"></div>
            </section>

        </section>
    </form>
</template>

<script setup>
import { toRef, ref } from 'vue'
import field from '../fields/FieldBase.vue'
import mail from '../fields/FieldMail.vue'
import text from '../fields/FieldText.vue'
import phone from '../fields/FieldPhoneNumber.vue'
import streetNum from '../fields/FieldStreetNumber.vue'
import zipCode from '../fields/FieldZipCode.vue'
import { useForm } from "../../use/useForm.js"

const props = defineProps( {
    record: Object
} )
const form = ref()


const record = toRef( props, 'record' );

const emit = defineEmits( ['fieldValid'] )

const [fieldValid] = useForm( form, record, emit )

</script >

<style scoped>
section.horizontal {
    display: flex;
    width: calc(100% - 100px)
}

section.vertical {
    display: block;
    width: calc(100% - 40px)
}

section.title>div:first-child {
    font-size: 16px;
    color: var(--main-color);
    padding-left: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
}

form {
    margin-top: 20px
}

div.content {
    margin-left: 124px
}
</style>