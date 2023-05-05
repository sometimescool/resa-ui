<template>
    <nav ref="navigator">
        <menu-tree v-for="item in getTree()" :key="item.name" :userItem="item"></menu-tree>
    </nav>
</template>

<script setup>
import { getTree } from './UserNavigation.js'
import menuTree from './MenuTree.vue'

</script>

<style scoped>
nav {
    grid-area: nav;
    max-height: calc(100vh - 60px);
    overflow: auto;
    background-color: var(--black-light);
    color: var(--vt-c-white);
    font-size: 16px;
    padding: 4px 8px;
    font-weight: bold;
}

a {
    display: block
}


nav a.router-link-exact-active {
    opacity: 1
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}
</style>