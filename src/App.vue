<template>
  <main id="main-vue" ref="mainVue">
    <mainHeader />
    <mainNavigator ref="navigator" />
    <wsf-vertical-sizer class="resizer" @endResize="endResize" />
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from "vue-router"
import { ref } from "vue"
import mainHeader from "./components/main/MainHeader.vue";
import mainNavigator from "./components/main/MainNavigator.vue";

const mainVue = ref( 'mainVue' )
const navigator = ref( 'navigator' )

function endResize ( dep ) {
  const newSize = navigator.value.$refs.navigator.scrollWidth + dep;
  mainVue.value.style.gridTemplateColumns = `${newSize}px 6px auto auto`
}

</script>

<style scoped>
#main-vue {
  overflow: hidden;
  display: grid;
  grid-template:
    "header header header header" 60px "nav resizer content content" calc(100vh - 60px) "nav resizer content content" calc(100vh - 60px) / 200px 6px auto auto;
  font-weight: normal;
}

.resizer {
  grid-area: resizer;
  background-color: var(--resizer)
}

.resizer:hover {
  cursor: e-resize
}

#main-vue {
  grid-area: content;
  overflow: auto
}
</style>
