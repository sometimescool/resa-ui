import { ref } from 'vue';

const useMessageDialog = function () {
    const message = ref( {
        isVisible: false,
        title: "",
        message: "",
        buttons: []
    } )
    function showMessageConfirmCancel ( close, cancel ) {
        show( 'Abandon des modifications.', { mess: { message: "Confimrmer l'abandon des modifications?" } }, [
            {
                label: 'Non',
                action: close
            }, {
                label: 'Oui',
                action: cancel,
                default: true
            }
        ] )
    }
    function showMessageConfirmDelete ( close, confim ) {
        show( "Suppression de l'élément courant", { mess: { message: "Confirmer la suppression ?" } }, [
            {
                label: 'Non',
                action: close
            }, {
                label: 'Oui',
                action: confim,
                default: true
            }
        ] )
    }
    function showMessageDataChanged ( close, cancel, register ) {
        show( 'Des modifications sont en cours.', { mess: { message: "Que voulez-vous faire des modifications ?" } }, [
            {
                label: 'Ne rien faire',
                action: close
            }, {
                label: 'Les abandonner et continuer',
                action: cancel
            }, {
                label: 'Les enregister et continuer',
                action: register,
                default: true
            }
        ] )
    }
    function showError ( action, errors ) {
        show( "Erreur", errors, [
            {
                label: 'Fermer',
                action: action,
                default: true
            }
        ] )
    }
    function show ( title, messages, buttons ) {
        setTitle( title )
        setContent( messages )
        setButtons( buttons )
        message.value.isVisible = true
    }
    function hide () {
        message.value.isVisible = false
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
    return [message, hide, showMessageDataChanged, showError, showMessageConfirmCancel, showMessageConfirmDelete]
}
export { useMessageDialog }