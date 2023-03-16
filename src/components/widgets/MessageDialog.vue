<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <header class="modal-header" id="modalTitle">
                    <slot name="header">
                        This is the default tile! et tqqsdd qdqsd qsdqsdq qdqs
                    </slot>
                    <!-- <button type="button" class="btn-close" @click="close" aria-label="Close modal">
                        x
                    </button> -->
                </header>

                <section class="modal-body" id="modalDescription">
                    <slot name="body">
                        This is the default body!
                    </slot>
                </section>

                <footer class="modal-footer">
                    <button :key="button.action" :class="btnClass(button)" @click="clickButton(button.action)"
                        v-for="button in buttons">{{
                            button.label
                        }}</button>
                </footer>
            </div>
        </div>
    </transition>
</template>


<script setup>
defineProps( {
    buttons: Array
} )

function btnClass ( button ) {
    if ( button.default ) return 'btn-default'
    return 'btn'
}

let emit = defineEmits( ['action'] )
function clickButton ( actionId ) {
    emit( "action", actionId )
}
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    min-width: 600px;
    min-height: 250px
}

.modal-header,
.modal-footer {
    padding: 4px 20px;
    display: flex;
}

.modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: white;
    background-color: var(--main-color);
    justify-content: space-between;
    font-size: 20px;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    position: absolute;
    bottom: 0px;
    width: 100%;
    text-align: center;
}

.modal-body {
    position: relative;
    padding: 20px 10px;
}

.btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: white;
    background: transparent;
}

.btn-default,
.btn {
    border: 1px solid var(--main-color);
    border-radius: 2px;
    font-size: 16px;
    cursor: pointer;
    padding: 8px 0px;
    margin: 0px 2px;
    flex: auto;
    display: block;
}

.btn-default {
    color: white;
    background: var(--main-color);

}

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity .5s ease;
}
</style>