import { createRouter, createWebHistory } from 'vue-router'
import { getNavigationPath } from '../components/main/UserNavigation.js'

const router = createRouter( {
  history: createWebHistory( import.meta.env.BASE_URL ),
  routes: getNavigationPath()
} )

router.beforeEach( async ( to, from ) => {
  console.log( 'beforeEach', to, from )
} )

router.beforeResolve( async ( to, from ) => {
  console.log( 'beforeResolve', to, from )
} )

export default router
