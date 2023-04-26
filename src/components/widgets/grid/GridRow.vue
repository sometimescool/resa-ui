<template>
    <tr @click="() => select(record)" :class="{ isSelected: selected }">
        <td :key="col" v-for="col in cols" :title="record[col.name]">{{ record[col.name] }}</td>
    </tr>
</template>

<script setup>
import { toRef } from "vue"

const props = defineProps( {
    record: {
        type: Object,
        default: () => { }
    },
    cols: {
        type: Object,
        default: () => { }
    },
    selected: {
        type: Boolean,
        default: false
    }
} )

const selected = toRef( props, "selected" )

const emit = defineEmits( ["select"] )

function select ( record ) {
    emit( "select", record )
}
</script>

<style scoped>
.isSelected {
    background-color: var(--main-color-light);
}

tr:hover {
    background-color: var(--main-color-light);
}

tr {
    display: table-row;
    cursor: pointer
}

td {
    display: table-cell;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.isSelected>td {
    font-weight: 500
}
</style>