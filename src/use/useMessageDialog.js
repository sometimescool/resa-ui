import { ref } from 'vue';

const useMessageDialog = function () {
    let resolveClosed;
    const message = ref( {
        isVisible: false,
        title: "",
        message: "",
        buttons: []
    } )
    async function show ( title, messages, buttons ) {
        setTitle( title )
        setContent( messages )
        setButtons( buttons )
        message.value.isVisible = true;
        const response = await new Promise( function ( resolve ) {
            resolveClosed = resolve
        } );
        return response
    }
    function setResponse ( action ) {
        message.value.isVisible = false;
        resolveClosed( action )
    }
    function setContent ( messages ) {
        let messageBody = ""
        Object.keys( messages ).forEach( key => {
            messageBody = `${messageBody}<li>${messages[key].message}</li>`
        } )
        message.value.message = messageBody
    }
    function setButtons ( arrayOfbuttons ) {
        message.value.buttons = arrayOfbuttons
    }
    function setTitle ( title ) {
        message.value.title = title
    }
    return [message, show, setResponse]
}
export { useMessageDialog }