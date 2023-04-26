<template>
    <div class="resizer" :data-index="index" @mousedown="mousedown"></div>
</template>
<script setup>
import { ref, toRef } from 'vue'
const props = defineProps( {
    layerStyle: String,
    index: Number
} )
const layerStyle = toRef( props, "layerStyle" )
const index = toRef( props, "index" )
const layer = ref();
const clientX = ref();
const initialClientX = ref()
const emit = defineEmits( ['endResize'] )

function mousedown ( event ) {
    // on évite la selection des élemennts qu'on survole
    window.document.body.style['user-select'] = 'none'

    // On met en place les listeners
    window.addEventListener( 'mousemove', mousemove )
    window.addEventListener( 'mouseup', mouseup )

    const rec = event.srcElement.getBoundingClientRect()

    // On garde la position d'origine par rapport à window

    clientX.value = event.clientX // Pour le calcul du déplacement à la volée
    initialClientX.value = event.clientX // Pour le calcul du déplacement final

    // On ajoute un layer de la bar de resize
    //const parent = event.srcElement.offsetParent
    layer.value = getLayer( event.srcElement, rec )
    window.document.body.appendChild( layer.value )
}
function getLayer ( srcElement, rec ) {
    // Creation du layer à partir des tailles et position de l'élement d'origine
    let layer
    layer = document.createElement( 'div' )
    layer.dataset.index = srcElement.dataset.index
    layer.style['z-index'] = 1000;
    layer.style['height'] = `${srcElement.offsetHeight}px`;

    layer.style["top"] = `${rec.top}px`;
    layer.style["left"] = `${rec.left}px`;

    layer.style['width'] = `${srcElement.offsetWidth}px`;
    layer.style["position"] = "absolute";
    // Parce que je ne sais pas récupérer les valeur du l'élement d'origine
    if ( layerStyle.value ) {
        layer.style["background"] = layerStyle.value;
    } else {
        layer.style["background"] = "var(--resizer)"
    }

    layer.style['cursor'] = "e-resize";

    // On retourne le layer pour être inséré dans le DOM
    return layer
}
function mouseup ( event ) {
    // on remet en place la selection
    window.document.body.style['user-select'] = 'auto'

    // on nettoye
    window.removeEventListener( 'mousemove', mousemove )
    window.removeEventListener( 'mouseup', mouseup )
    layer.value.remove()

    // on envoie au parent la position final (qui sera la taille du composant à gauche du resizer), à lui de se débrouiller avec ça !

    const dep = event.clientX - initialClientX.value;
    emit( "endResize", dep, event.srcElement )

}
function mousemove ( event ) {
    // On calcule le déplacement
    const dep = event.clientX - clientX.value;

    // On met à jour le nouvelle position du layer
    layer.value.style["left"] = `${parseInt( layer.value.style["left"], 10 ) + dep}px`

    // On memorise le nouvelle position pour le prochain calcul
    clientX.value = event.clientX
}
</script>

<style scoped>
.resizer {
    height: 100%;
    background-color: var(--resizer);
    position: absolute;
    top: 0px;
    right: 0px;
    height: 100%;
    width: 6px;
}

.resizer:hover {
    cursor: e-resize
}
</style>