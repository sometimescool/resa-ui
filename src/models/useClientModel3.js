import { ref } from 'vue'
const useClientModel = function () {
    // const model = ref( {} )
    const fields = {
        _id: {
            type: "String"
        },
        firstName: {
            type: "String"
        },
        lastName: {
            type: "String"
        },
        email: {
            type: "String"
        },
        created_date: {
            type: "String"
        },
        city: {
            type: "String"
        },
        mobile: {
            type: "String"
        },
        street: {
            type: "String"
        },
        streetNumber: {
            type: "String"
        },
        zipCode: {
            type: "String"
        },
        country: {
            type: "String"
        },
        phone: {
            type: "String"
        }
    }
    let model = {}
    function setData ( record ) {
        if ( !record ) return
        Object.keys( fields ).forEach( ( fieldName ) => {
            model.value[fieldName] = record[fieldName] || ""
        } )
        console.log( 'useClientModel.setData', model )
    }

    return [model, setData]
}

export default useClientModel