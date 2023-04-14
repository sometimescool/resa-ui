
const capitalizeFirst = function ( string ) {
    return `${string.charAt( 0 ).toUpperCase()}${string.slice( 1 )}`
}

const getUuid = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace( /[xy]/g, function ( c ) {
        var r = ( Math.random() * 16 ) | 0,
            v = c === "x" ? r : ( r & 0x3 ) | 0x8;
        return v.toString( 16 );
    } );
};

export default { capitalizeFirst, getUuid }