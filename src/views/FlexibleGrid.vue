<template>
    <main class="widgetTest">
        <div class="container">
            <wsfGrid :records="clients" :cols="cols" :config="config" />
            <div style="width:100%;text-align:center;margin-top:30px">
                <button @click="() => reloadData()">Reload Data</button>
                <button v-if="config.toolBar.height !== 0" @click="() => tooggleToolbar(0)">Hide toolbar</button>
                <button v-else @click="() => tooggleToolbar(30)">show toolbar</button>
                <button v-if="config.header.height !== 0" @click="() => tooggleHeader(0)">Hide header</button>
                <button v-else @click="() => tooggleHeader(30)">show header</button>
                <button v-if="config.footer.height !== 0" @click="() => tooggleFooter(0)">Hide footer</button>
                <button v-else @click="() => tooggleFooter(30)">show footer</button>
            </div>
        </div>

    </main>
</template>

<script setup>
import { ref, onMounted } from "vue"

import ClientModel from "../models/ClientModel";
import wsfGrid from "../components/widgets/grid/GridMain.vue"

const cols = ref( [{
    label: "Prénom",
    name: "firstName",
    sortable: true
},
{
    label: "Nom",
    name: "lastName",
    sortable: true
},
{
    label: "Mail",
    name: "email",
    sortable: true
},
{
    label: "Tel. mobile",
    name: "mobile",
}
] )
const config = ref( {
    toolBar: {
        height: 30, // toolbar height,  0 : no toolbar
        filter: {
            label: "Filter",
            size: 25,
        }
    },
    header: {
        height: 30 // header height,  0 : no grid header
    },
    footer: {
        height: 30 // footer height,  0 : no grid footer
    }
} )
const clients = ref( [] );
const clientModel = new ClientModel( {} );

async function getData () {
    const reponse = await clientModel.getList()
    clients.value = reponse.data
}
async function reloadData () {
    return await getData()
}
function tooggleToolbar ( val ) {
    config.value.toolBar.height = val
}
function tooggleHeader ( val ) {
    config.value.header.height = val
}
function tooggleFooter ( val ) {
    config.value.footer.height = val
}
onMounted( () => {
    getData()
} )
</script>

<style scoped>
.widgetTest {
    overflow: hidden;
    grid-area: content;
}

.container {
    margin-left: 200px;
    margin-top: 50px;
    display: block;
    width: 50%;
    height: 250px;
    max-height: 250px;
}
</style>