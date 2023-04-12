<template>
    <div class="banner" :class="trans" ref="banner">
        {{ text }}
        <button type="button" class="btn-close" @click="close">
            <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
    </div>
</template>
  
<script setup>
import { toRef, ref, onMounted, watch } from "vue";

const props = defineProps( {
    removed: {
        type: Boolean,
        default: false,
    },
    text: {
        type: String,
        default: "",
    },
    autoHide: {
        type: Number,
        default: 1500,
    },
    position: {
        type: String,
        default: "0px",
    },
    start: {
        type: String,
        default: "-50px",
    },
    height: {
        type: Number,
    },
    autoHidecount: {
        type: Number,
        default: 0,
    },
    id: {
        type: String,
        default: "",
    },
} );
const autoHide = toRef( props, "autoHide" );
const autoHidecount = toRef( props, "autoHidecount" );
const removed = toRef( props, "removed" );
const height = toRef( props, "height" );
const start = toRef( props, "start" );
const id = toRef( props, "id" );

const trans = ref( "transit1" );
const sHeight = ref( `${height.value}px` ); // uses by css

const emit = defineEmits( ["removeBanner"] );

/* when start changed, changes the transition to exec it again */
watch( start, () => {
    trans.value = trans.value === "transit1" ? "transit2" : "transit1";
} );

function toggelBanner () {
    if ( removed.value ) return; // banner is removed (hidden) but not destroy
    if ( autoHide.value !== 0 ) {
        setTimeout(
            () => close(),
            autoHide.value + ( autoHide.value * ( autoHidecount.value ) / 2 )
        );
    }
}
function close () {
    emit( "removeBanner", id.value );
}

onMounted( () => toggelBanner() );
</script>
  
<style scoped>
.transit1 {
    animation-name: showBanner1;
    animation-duration: 1s;
    animation-delay: 0s;
    animation-fill-mode: forwards;
    display: default;
}

.transit2 {
    animation-name: showBanner2;
    animation-duration: 1s;
    animation-delay: 0s;
    animation-fill-mode: forwards;
    display: default;
}

@keyframes showBanner1 {
    from {
        top: v-bind(start);
    }

    to {
        top: v-bind(position);
    }
}

@keyframes showBanner2 {
    from {
        top: v-bind(start);
    }

    to {
        top: v-bind(position);
    }
}

.banner {
    position: absolute;
    top: -v-bind(sHeight);
    left: 20px;
    line-height: v-bind(sHeight);
    width: calc(100% - 40px);
    text-align: center;
    font-size: 16px;
    height: v-bind(sHeight);
    background-color: #fbefc0;
    font-weight: 500;
    border-radius: 0px 0px 4px 4px;
}

button {
    line-height: 30px;
    color: rgba(0, 0, 0, 0.5);
    position: absolute;
    right: 4px;
    top: 4px;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
</style>