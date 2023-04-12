import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/main.css'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Banner from "./components/widgets/banner/BannersContainer.vue"
import MessageDialog from "./components/widgets/MessageDialog.vue";
import VercicalSizer from "./components/widgets/VerticalSizer.vue";
import WsfLogo from "./assets/WsfLogo.vue";

/* import specific icons */
import { faPlus, faTrashCan, faCheck, faRotateLeft, faXmark, faBars, faEllipsisVertical, faEllipsis } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add( faPlus );
library.add( faTrashCan );
library.add( faCheck );
library.add( faRotateLeft );
library.add( faXmark );
library.add( faBars );
library.add( faEllipsisVertical );
library.add( faEllipsis );

const app = createApp( App )

app.component( 'font-awesome-icon', FontAwesomeIcon )
app.component( 'wsf-banner', Banner )
app.component( 'sf-message-dialog', MessageDialog )
app.component( 'sf-vertical-sizer', VercicalSizer )
app.component( "wsf-logo", WsfLogo );
app.use( store )
app.use( router )

app.mount( '#app' )
