<template>
    <baseCrud :api="API" :title="title" :columns="columns" :editForm="editForm"></baseCrud>
</template >
  
<script setup>

import baseCrud from "../components/widgets/BaseCrud.vue";
import editForm from "../components/form/Client.vue";

const API = '/api/clients/';
const title = 'Clients';
const columns = [{ name: 'lastName', label: 'Nom' }, { name: 'firstName', label: 'Prénom' }];
</script >
