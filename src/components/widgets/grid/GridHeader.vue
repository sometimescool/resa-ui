<template>
    <tr ref="row">
        <td v-for="(col, index) in cols" :key="col.index" :width="col.width" :class="{ sortable: col.sortable }"
            @click="() => clickSort(col.name)"><span>{{
                col.label }}</span>
            <span v-if="col.sortable" class="arrow"
                :class="(sortOrders[col.name] === 0) ? '' : (sortOrders[col.name] === 1 ? 'down' : 'up')">
                <font-awesome-icon v-if="sortOrders[col.name] >= 0" icon="fa-solid fa-sort-down" />
                <font-awesome-icon v-else icon="fa-solid fa-sort-up" />
            </span>
            <wsf-vertical-sizer :index="index" v-if="(index + 1) !== cols.length" :layerStyle="layerStyle" class="resizer"
                @endResize="endResize" />
        </td>
    </tr>
</template>
<script setup>
import { ref, toRef } from "vue"
const props = defineProps( {
    cols: {
        type: Array,
        default: () => []
    },
    height: {
        type: String,
        default: "30px"
    },
    sortOrders: {
        type: Object
    }
} )
const emit = defineEmits( ["endResizeCol", "sort"] )
const height = toRef( props, "height" )
const sortOrders = toRef( props, "sortOrders" )
const row = ref( "row" )
const layerStyle = ref( "linear-gradient(to left,transparent 5px, white 5px 6px, transparent 5px )" )

function endResize ( dep, srcElement ) {
    if ( srcElement.dataset.index === undefined ) return
    const index = parseInt( srcElement.dataset.index, 10 )
    const col = row.value.cells[index]
    col.style.width = `${col.clientWidth + dep}px`
    emit( "endResizeCol", dep, index )
}

function clickSort ( name ) {
    if ( sortOrders.value[name] === undefined ) return
    emit( "sort", name )
}
</script>

<style scoped>
tr {
    height: v-bind(height)
}

td {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}

td:not(:last-child) {
    /* border-right: 1px solid var(--vt-c-white); */
}

.resizer {
    width: 11px;
    background: v-bind("layerStyle")
}

.resizer:hover {
    cursor: e-resize;

}

.sortable {
    cursor: pointer
}

.arrow {
    font-size: 12px;
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-60%);
    opacity: 0.5
}

.arrow.down {
    opacity: 1
}

.arrow.up {
    top: 50%;
    transform: translateY(-30%);
    opacity: 1
}
</style>