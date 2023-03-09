<template>
  <header>
    le header
  </header>
  <nav>
    <RouterLink to="/">Home</RouterLink><br>
    <RouterLink to="/about">About</RouterLink><br>
    <RouterLink to="/client">Client</RouterLink>
  </nav>
  <div class="resizer"></div>
  <RouterView />
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>



<style scoped>
header {
  grid-area: header;
  background-color: var(--black-light);
  color: var(--vt-c-white);
  font-size: 18px;
  padding: 4px 8px;
  font-weight: bold;
}

.resizer {
  grid-area: resizer;
  max-height: calc(100vh - 40px);
  background-color: var(--resizer)
}

.resizer:hover {
  cursor: e-resize
}

nav {
  grid-area: nav;
  max-height: calc(100vh - 40px);
  overflow: auto;
  background-color: var(--black-light);
  color: var(--vt-c-white);
  font-size: 16px;
  padding: 4px 8px;
  font-weight: bold;
}

main {
  grid-area: content;
  max-height: calc(100vh - 40px);
  overflow: auto
}

nav a.router-link-exact-active {
  opacity: 1
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {}

nav a:first-of-type {
  border: 0;
}
</style>
