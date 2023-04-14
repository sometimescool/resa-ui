<template>
    <baseCrud :api="API" :title="title" :columns="columns" :editForm="editForm" :Model="clientModelClass"></baseCrud>
</template >
  
<script setup>

import baseCrud from "../components/BaseCrud.vue";
import editForm from "../components/form/ClientForm.vue";
import ClientModel from "../models/ClientModel.js"

const clientModelClass = ClientModel

const API = '/api/clients/';
const title = 'Clients';
const columns = [
    { name: 'lastName', label: 'Nom' },
    { name: 'firstName', label: 'Prénom' }];
</script >
