<template>
    <div class="resizer" @mousedown="mousedown"></div>
</template>
<script setup>
import { ref } from 'vue'

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

    // On garde la position d'origine par rapport à window
    clientX.value = event.clientX // Pour le calcul du déplacement à la volée
    initialClientX.value = event.clientX // Pour le calcul du déplacement final

    // On ajoute un layer de la bar de resize
    const parent = event.srcElement.offsetParent
    layer.value = getLayer( event.srcElement )
    parent.appendChild( layer.value )
}
function getLayer ( srcElement ) {
    // Creation du layer à partir des tailles et position de l'élement d'origine
    let layer
    layer = document.createElement( 'div' )
    layer.style['height'] = `${srcElement.offsetHeight}px`;
    layer.style["top"] = `${srcElement.offsetTop}px`;
    layer.style["left"] = `${srcElement.offsetLeft}px`;
    layer.style['width'] = `${srcElement.offsetWidth}px`;
    layer.style["position"] = "absolute";

    // Parce que je ne sais pas récupérer les valeur du l'élement d'origine
    layer.style["background-color"] = "var(--resizer)";
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
    emit( "endResize", parseInt( layer.value.style["left"], 10 ) )

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
    grid-area: resizer;
    max-height: calc(100vh - 40px);
    background-color: var(--resizer);
}

.resizer:hover {
    cursor: e-resize
}
</style>