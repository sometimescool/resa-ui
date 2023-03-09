const handelError = async function ( response ) {
    if ( response.ok ) {
        return response.json()
    } else {
        let error = await response.json()
        alert( `${response.status} ${response.statusText}` );
        return error
    }
}

export { handelError }
