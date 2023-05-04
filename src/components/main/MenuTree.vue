<template>
    <div v-if="isFolder" class="folder">
        <div @click.self="() => toggleFolder()" class="folderText"> {{ userItem.name }}</div>
        <font-awesome-icon class="iconFolder" v-show="isOpen" @click="() => isOpen = false" icon="fa-solid fa-chevron-up" />
        <font-awesome-icon class="iconFolder" v-show="!isOpen" @click="() => isOpen = true"
            icon="fa-solid fa-chevron-down" />

        <div v-show="isOpen">
            <menu-tree v-for="item in children" :key="item.name" :userItem="item">
            </menu-tree>
        </div>
    </div>
    <RouterLink v-else class="link" :to="userItem.path">{{ userItem.name }}
    </RouterLink>
</template>
<script setup>
import { RouterLink } from 'vue-router';
import { computed, toRef, ref } from "vue"

const props = defineProps( {
    userItem: {
        type: Object
    }
} )
const userItem = toRef( props, "userItem" )
const isOpen = ref( false )

const isFolder = computed( () => {
    return userItem.value.children && userItem.value.children.length;
} )

const children = computed( () => {
    return userItem.value.children;
} )

function toggleFolder () {
    if ( isFolder.value ) {
        isOpen.value = !isOpen.value
    }
}

</script>
<style scoped>
.folder .link {
    padding-left: 20px
}

.folderText,
.iconFolder {
    cursor: pointer;
}

/* .folderText:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
    transition: 0.4s;
} */
.folderText:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
    transition: 0.4s
}

.link {
    padding: 4px 0px;
    display: block;
}

a {
    opacity: 1
}

a:hover {
    text-decoration: underline
}

.router-link-exact-active {
    color: rgba(150, 220, 46, 1)
}

.folder .folder {
    margin-left: 20px
}

.iconFolder {
    font-size: 10px;
    right: 0px;
    position: absolute;
    right: 4px;
    top: 10px
}
</style>