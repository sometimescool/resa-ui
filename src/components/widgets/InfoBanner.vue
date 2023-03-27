<template>
    <div :class="{ 'show': showBanner, 'hide': hideBanner }" class="banner">
        <div>{{ text }}
            <button type="button" class="btn-close" @click="close"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
        </div>
    </div>
</template>

<script setup>
import { watch, toRef, ref } from "vue"

const props = defineProps( {
    show: {
        type: Boolean,
        default: false
    },
    text: {
        type: String,
        default: ""
    },
    autoHide: {
        type: Number,
        default: 1500
    }
} )
const show = toRef( props, 'show' );
const autoHide = toRef( props, 'autoHide' );

const showBanner = ref( show.value );
const hideBanner = ref( false )

watch(
    show, ( value ) => {
        toggelBanner( value )
    }
)
const emit = defineEmits( ['toogleBanner'] )

function toggelBanner ( value ) {
    showBanner.value = value
    hideBanner.value = !value
    if ( autoHide.value !== 0 ) {
        if ( value ) {
            setTimeout( () => {
                toggelBanner( false )
            }, autoHide.value )
        }
    }
    emit( 'toogleBanner', value )
}
function close () {
    toggelBanner( false )
}
</script>

<style scoped>
.show {
    height: 50px;
    animation-name: showBanner;
    animation-duration: 1s;
    animation-delay: 0s;
    animation-fill-mode: forwards;
    display: default;
}

.hide {
    animation-name: hideBanner;
    animation-duration: 1s;
    animation-delay: 0s;
    animation-fill-mode: forwards;
}

@keyframes showBanner {
    from {
        top: -50px;
    }

    to {
        top: 0px;
    }
}

@keyframes hideBanner {
    from {
        top: 0px;
    }

    to {
        top: -50px;
    }
}

.banner {
    position: absolute;
    top: -50px;
    left: 0px;

    width: 100%;
    text-align: center;
    font-size: 16px;
    height: 50px;
}

.banner>div {
    line-height: 50px;
    background-color: #fbefc0;
    font-weight: 500;
    margin: 0px 20px;
    border-radius: 0px 0px 4px 4px;
}

button {
    line-height: 30px;
    color: rgba(0, 0, 0, 0.6);
    position: absolute;
    right: 4px
}
</style>