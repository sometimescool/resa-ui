const useForm = function ( form, data, emit ) {

    function fieldValid ( valid ) {
        emit( "fieldValid", form, valid )
    }

    return [fieldValid]
}

export { useForm }