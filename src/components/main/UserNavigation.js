import HomeView from '../../views/HomeView.vue';

const userNavigation = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        name: "Menu App",
        children: [
            {
                path: '/clients',
                name: 'Clients',
                component: () => import( '../../views/ClientView.vue' )
            }, {
                path: '/flexiblegrid',
                name: 'Grille flexible',
                component: () => import( '../../views/FlexibleGrid.vue' )
            },
            {
                name: "Test dossier",
                children: [
                    {
                        path: '/test1',
                        name: 'Test 1',
                        component: () => import( '../../views/TestVue1.vue' )
                    }, {
                        path: '/test2',
                        name: 'Test 2',
                        component: () => import( '../../views/TestVue2.vue' )
                    }
                ]
            }
        ]
    },
    {
        name: "Menu Config",
        children: [
            {
                path: '/test3',
                name: 'Config 1',
                component: () => import( '../../views/TestVue3.vue' )
            }, {
                path: '/test4',
                name: 'Config 2',
                component: () => import( '../../views/TestVue4.vue' )
            }
        ]
    }
]
const getNavigationPath = function () {
    let navigationPath = []
    let traverse = function ( arrayOfNodes ) {
        arrayOfNodes.forEach( node => {
            if ( node.path ) {
                navigationPath.push( node )
            } else {
                if ( node.children ) {
                    traverse( node.children )
                }
            }
        } );
    }
    traverse( userNavigation )
    return navigationPath
}
const getTree = function () {
    return userNavigation
}

export { getNavigationPath, getTree }