import { ref } from 'vue';

const useGrid = function ( getList, columns ) {
    const grid = ref( {
        data: [],
        meta: {},
        columns: columns,
        selectedId: ''
    } )

    async function refreshList () {
        const jsonResponse = await getList()
        grid.value.data = jsonResponse.data
        grid.value.meta = jsonResponse.meta
    }
    refreshList()
    return [grid, refreshList]
}
export { useGrid }