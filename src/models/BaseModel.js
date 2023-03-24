import object from "../lib/object"
import string from "../lib/string"
import { watch, ref } from "vue"
import { useHttpCrud } from "../use/useHttpCrud.js"

export default class BaseModel {
    #initialData = {

    }
    fields = {
    }
    data = {
    }
    #computed = []
    #notPersist = []
    constructor( data = {} ) {
        this.data = ref( this.data );
        this.initData( data );
        watch( this.data, ( newRecord, oldRecord ) => {
            const me = this
            this.#computed.forEach( fieldname => {
                me.data.value[fieldname] = me.fields[fieldname].computed( newRecord )
            } )
        }, { deep: true } )
    }
    init () {
        this.#initComputed()
        this.#initNotPersist()
        this.#initApi()
    }
    initData ( data = {} ) {
        this.#setData( this.data.value, data );
        this.#initialData = object.clone( this.data.value )
        console.log( 'ClientModel.initialData', this.#initialData )
    }
    initialized () {
        return ( !object.isEmtyObject( this.#initialData ) && this.#initialData._id !== null && this.#initialData._id !== "" )
    }
    getData () {
        return this.data.value
    }
    restoreData () {
        this.data.value = object.clone( this.#initialData )
    }
    getInitialData () {
        return this.#initialData
    }
    hasChanged () {
        return object.isDataChanged( this.#initialData, this.data.value )
    }
    #setData ( data, record = {} ) {
        Object.keys( this.fields ).forEach( ( fieldName ) => {
            data[fieldName] = record[fieldName] || "";
            if ( this.fields[fieldName].computed ) data[fieldName] = this.fields[fieldName].computed( record )
        } )
    }
    #initComputed () {
        this.#computed = Object.keys( this.fields ).filter( ( fieldName ) => { return this.fields[fieldName].computed } )
    }
    #initNotPersist () {
        this.#notPersist = Object.keys( this.fields ).filter( ( fieldName ) => {
            return this.fields[fieldName].persist === false
        } )
    }
    #initApi () {
        [this.getList, this.get, this.add, this.remove, this.update] = useHttpCrud( this.API, ( requestType, payload ) => this.beforeSend( requestType, payload ), ( requestType, data ) => this.receive( requestType, data ) )
    }
    #cleanPayload ( payload, cleanId = false ) {
        if ( cleanId ) delete payload._id
        for ( let property in payload ) {
            if ( this.#notPersist.includes( property ) ) {
                delete payload[property]
            }
        }
    }
    receive ( requestType, data ) {
        const fctName = `receive${string.capitalizeFirst( requestType )}`
        this[fctName]( data )
    }
    receiveList ( data ) {
        const me = this
        data.data.forEach( ( record ) => {
            me.#setData( record, record )
        } )
    }
    receiveGet ( data ) {

    }
    receiveAdd ( data ) {

    }
    receiveRemove ( data ) {

    }
    receiveUpdate ( data ) {

    }
    beforeSend ( requestType, payload ) {
        const fctName = `beforeSend${string.capitalizeFirst( requestType )}`
        this[fctName]( payload )
    }
    beforeSendAdd ( payload ) {
        this.#cleanPayload( payload, true )
    }
    beforeSendUpdate ( payload ) {
        this.#cleanPayload( payload )
    }
    getList () { }
    get () { }
    add () { }
    remove () { }
    update () { }
}