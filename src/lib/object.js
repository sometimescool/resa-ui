const objectDiff = function ( obj1, obj2 ) {
    const me = this;
    const differences = {};
    // base case: if both trees are null, there are no differences
    if ( !obj1 && !obj2 ) {
        return differences;
    }
    // base case: if only one tree is null, the other tree is the difference
    if ( !obj1 ) {
        differences["obj2"] = obj2;
        return differences;
    }
    if ( !obj2 ) {
        differences["obj1"] = obj1;
        return differences;
    }
    // Get the properties of both trees including non-enumerable
    const tree1Properties = Object.getOwnPropertyNames( obj1 );
    const tree2Properties = Object.getOwnPropertyNames( obj2 );

    // Compare the values of each property
    for ( let i = 0; i < tree1Properties.length; i++ ) {
        const propName = tree1Properties[i];
        // if the property value is an object, recursively find the differences in the sub-trees
        if ( typeof obj1[propName] === 'object' && typeof obj2[propName] === 'object' ) {
            const subTreeDiff = me.a( obj1[propName], obj2[propName] );
            if ( Object.keys( subTreeDiff ).length > 0 ) {
                differences[propName] = subTreeDiff;
            }
        } else if ( obj1[propName] !== obj2[propName] ) {
            // if the property value is not an object, compare the values directly
            differences[propName] = {
                obj1: obj1[propName],
                obj2: obj2[propName]
            }
        }
    }
    // Iterate over the properties of the second tree
    for ( let i = 0; i < tree2Properties.length; i++ ) {
        const propName = tree2Properties[i];
        // Check if the property also exists in the first tree
        if ( !tree1Properties.includes( propName ) ) {
            differences[propName] = {
                tree2: obj2[propName]
            }
        }
    }
    return differences;
}

const isEmtyObject = function ( object ) {
    if ( object === null ) return true
    return Object.keys( object ).length === 0;
}
const isDataChanged = function ( data1, data2 ) {
    return !isEmtyObject( objectDiff( data1, data2 ) )
}
const objectClone = function ( obj ) {
    return Object.assign( {}, obj );
}

export { objectDiff, isEmtyObject, isDataChanged, objectClone }