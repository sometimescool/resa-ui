import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/main.css'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPlus, faTrashCan, faCheck, faRotateLeft, faXmark } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add( faPlus );
library.add( faTrashCan );
library.add( faCheck );
library.add( faRotateLeft );
library.add( faXmark );

const app = createApp( App )

app.component( 'font-awesome-icon', FontAwesomeIcon )
app.use( store )
app.use( router )

app.mount( '#app' )
