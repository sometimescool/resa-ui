<template>
  <mainHeader />
  <mainNavigator />
  <div class="resizer"></div>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import mainHeader from "./components/main/MainHeader.vue";
import mainNavigator from "./components/main/MainNavigator.vue";
</script>

<style scoped>
.resizer {
  grid-area: resizer;
  max-height: calc(100vh - 40px);
  background-color: var(--resizer)
}

.resizer:hover {
  cursor: e-resize
}

main {
  grid-area: content;
  max-height: calc(100vh - 40px);
  overflow: auto
}
</style>
