import BaseModel from "./BaseModel"

export default class ClienModel extends BaseModel {
    fields = {
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
        },
        fullAdress: {
            type: String,
            computed: function ( record = {} ) {
                const val = `<div>${record.firstName || ""} ${record.lastName || ""}</div><div>${record.streetNumber || ""} ${record.street || ""}</div><div> ${record.zipCode || ""} ${record.city || ""}</div>`
                return val
            },
            persist: false
        }
    }
    API = '/api/clients/'

    constructor( data = {} ) {
        super( data );
        this.init()
    }
    // receive ( reqType, response ) {
    //     super.receive( reqType, response )
    //     // do something after receive response but before display
    // }
    // beforeSend ( reqType, payload ) {
    //     super.beforeSend( reqType, payload )
    //     // do something before send payload (add and update only)
    // }
}