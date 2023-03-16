const useHttpCrud = function ( api ) {

    async function getList () {
        const response = await fetch( api );
        const jsonResponse = await handelError( response )
        return jsonResponse
    }
    async function get ( _id ) {
        const response = await fetch( `${api}${_id}` );
        const jsonResponse = await handelError( response )
        return jsonResponse
    }
    async function add ( data ) {
        const response = await fetch( `${api}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        } )
        const jsonResponse = await handelError( response )
        return jsonResponse
    }
    async function remove ( _id ) {
        const response = await fetch( `${api}${_id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        } )
        const jsonResponse = await handelError( response )
        return jsonResponse
    }
    async function update ( _id, data ) {
        const response = await fetch( `${api}${_id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        } )
        const jsonResponse = await handelError( response )
        return jsonResponse
    }
    async function handelError ( response ) {
        if ( response.ok ) {
            return response.json()
        } else {
            let error = await response.json()
            return error
        }
    }
    return [getList, get, add, remove, update]
}

export { useHttpCrud }
