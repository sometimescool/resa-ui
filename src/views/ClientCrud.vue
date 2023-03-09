<template>
  <main id="crud">
    <headerView :title="header.title"></headerView>
    <nav>
      <dataGrid :data="grid.data" :columns="grid.columns" :meta="grid.meta"></dataGrid>
    </nav>
    <div class="resizer"></div>
    <main>
      Le crud
    </main>
  </main>
</template >

<script setup>
import dataGrid from "../components/DataGrid.vue";
import { handelError } from "../lib/restApiResponse.js";
import headerView from "../components/HeaderView.vue";
</script>

<script>
export default {
  name: "ClientCrud",
  data () {
    return {
      header: {
        title: "Client",
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
  }
}
</script>

<style scoped>
header {
  grid-area: header;
}

.resizer {
  grid-area: resizer;
  max-height: calc(100vh - 40px);
  background-color: var(--resizer);
}

.resizer:hover {
  cursor: e-resize
}

nav {
  grid-area: nav;
  max-height: calc(100vh - 80px);
  overflow: auto;
  font-size: 12px;
}

main>main {
  grid-area: content;
  max-height: calc(100vh - 80px);
  overflow: auto
}

#crud {
  overflow: hidden;
  display: grid;
  grid-template:
    "header header header header" 40px "nav resizer content content" calc(100vh - 80px) "nav resizer content content" calc(100vh - 80px) / 300px 6px auto auto;
  font-weight: normal;
}
</style>