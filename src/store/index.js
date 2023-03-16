import { createStore } from 'vuex'

const store = createStore( {
    state () {
        return {
            title: 'Hello World'
        }
    }
} )

export default store
