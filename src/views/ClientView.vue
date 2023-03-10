<template>
  <main id="client-view">
    <ViewHeader :title="header.title"></ViewHeader>
    <nav>
      <dataGrid :data="grid.data" :columns="grid.columns" :meta="grid.meta" @recordSelected="selectRecord"></dataGrid>
    </nav>
    <div class="resizer"></div>
    <main>
      <clientCrud :record="recordSelected"></clientCrud>
    </main>
    <toolBar :buttonsState="buttons.states"></toolBar>
  </main>
</template >

<script setup>
import dataGrid from "../components/widgets/DataGrid.vue";
import clientCrud from "../components/ClientCrud.vue";
import { handelError } from "../lib/restApiResponse.js";
import ViewHeader from "../components/widgets/ViewHeader.vue";
import toolBar from "../components/widgets/ToolbarCrud.vue";
</script>

<script>
export default {
  name: "ClientVue",
  data () {
    return {
      header: {
        title: "Clients",
      },
      recordSelected: {},
      buttons: {
        states: {
          validate: false,
          cancel: false,
          new: true,
          delete: false
        }
      },
      grid: {
        data: [],
        meta: {},
        columns: [{ name: 'lastName', label: 'Nom' }, { name: 'firstName', label: 'Prénom' }],
      }
    }
  },
  /**
   * Une seule fois à la créaction du composant avant mount
   * Voir : https://vuejs.org/guide/essentials/lifecycle.html#registering-lifecycle-hooks
   */
  async created () {
    const response = await fetch( '/api/clients' );
    const jsonResponse = await handelError( response )
    this.grid.data = jsonResponse.data
    this.grid.meta = jsonResponse.meta
  },
  methods: {
    selectRecord ( record ) {
      this.recordSelected = record;
      this.buttons.states.delete = true
    }
  }
}
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

#client-view {
  overflow: hidden;
  display: grid;
  grid-template:
    "header header header header" 50px "nav resizer content content" calc(100vh - 80px) "nav resizer content content" calc(100vh - 80px) / 300px 6px auto auto;
  font-weight: normal;
}
</style>