<template>
    <div class="wrapper">
        <div class="toolbar">
            <form id="search" @submit.prevent>
                Filtre <input name="query" size="10" v-model="searchQuery">
            </form>
            <div class="grid-paging">
                Page {{ meta.page }}/{{ totalPage }}
            </div>
        </div>
        <div id="grid-template">
            <div class="table-header-wrapper">
                <table class="table-header">
                    <thead>
                        <th :key="item.name" @click="sortBy(item.name)" :class="{ active: sortKey == item.name }"
                            v-for="item in columns">
                            {{ item.label }}
                            <span class="arrow" :class="sortOrders[item.name] > 0 ? 'asc' : 'dsc'"></span>
                        </th>
                    </thead>
                </table>
            </div>
            <div class="table-body-wrapper">
                <table class="table-body">
                    <tbody>
                        <tr :key="entry" v-for="entry in filteredData" @click="select(entry._id)">
                            <td :key="key" v-for="key in columns"> {{ entry[key.name] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Data-Grid',
    props: {
        data: Array,
        columns: Array,
        meta: Object,
        currentSelectionId: String
    },
    data () {
        return {
            searchQuery: '',
            sortKey: '',
            sortOrders: {}
        }
    },
    /**
     * Les propriétés "computed" sont mises en cache en fonction de leurs dépendances réactives.
     * réévaluée uniquement lorsqu'une dépendance réactive change
     */
    computed: {
        filteredData: function () {
            let sortKey = this.sortKey;
            let dislayCols = this.columns.map( ( col ) => col.name );
            let filterKey = this.searchQuery && this.searchQuery.toLowerCase();
            let order = this.sortOrders[sortKey] || 1;
            let data = this.data;

            if ( filterKey ) {
                data = data.filter( function ( row ) {
                    return Object.keys( row ).some( function ( key ) {
                        if ( !dislayCols.includes( key ) ) return false
                        return String( row[key] ).toLowerCase().indexOf( filterKey ) > -1;
                    } )
                } )
            }
            if ( sortKey ) {
                data = data.slice().sort( function ( a, b ) {
                    a = a[sortKey];
                    b = b[sortKey];
                    return ( a === b ? 0 : a > b ? 1 : -1 ) * order;
                } )
            }
            return data;
        },
        totalPage: function () {
            return Math.floor( this.meta.totalCount / this.meta.limit )
        }
    },
    filters: {
        capitalize: function ( str ) {
            return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
        }
    },
    methods: {
        sortBy: function ( key ) {
            this.sortKey = key;
            if ( this.sortOrders[key] === undefined ) {
                this.sortOrders[key] = 1
            }
            this.sortOrders[key] = this.sortOrders[key] * -1
        },
        select: function ( _id ) {
            this.$emit( "select", _id )
        }
    },
    created () {
        let sortOrders = {};
        this.columns.forEach( function ( key ) {
            sortOrders[key] = 1;
        } )
        this.sortOrders = sortOrders;
    }
}
</script>

<style scoped>
.toolbar {
    display: flex;
    margin: 8px 10px;
    font-size: 14px
}

form {
    margin-right: 8px
}

input {
    font-size: 14px
}

table {
    border-spacing: 0;
    width: 100%;
    font-size: 14px;
}

th {
    background-color: var(--main-color);
    color: rgba(255, 255, 255, 0.66);
    cursor: pointer;
    user-select: none;
}

td {
    border-bottom: 1px #008f68 solid;
}

th,
td {
    padding: 8px 4px;
}

th.active {
    color: #fff;
}

th.active .arrow {
    opacity: 1;
}

tr {
    cursor: pointer
}

tr:hover {
    background-color: rgba(0, 143, 104, 0.5);
    color: white;
}

.arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
}

.arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid white;
}

.arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid white;
}

#grid-template {
    display: flex;
    flex-direction: column;
    width: 100%;
}
</style>