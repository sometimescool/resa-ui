<template>
    <div style="position: absolute; top: 0px; left: 0px; width: 100%">
        <wsf-banner v-for="banner in banners" :key="banner.id" :id="banner.id" :removed="banner.removed" :text="banner.text"
            :start="banner.start" :autoHide="banner.autoHide" :position="banner.position" :height="bannerHeight"
            :autoHidecount="banner.autoHidecount" @remove-banner="() => removeBanner(banner.id)" />
    </div>
</template>
  
<script setup>
import { toRef, ref, watch } from "vue";
import wsfString from "../../../lib/string.js";

const props = defineProps( { bannerToAdd: { type: Object, default: () => { } } } );
const bannerToAdd = toRef( props, "bannerToAdd" );
const banners = ref( [] ); // Banners list
const bannerHeight = 52;

/* when bannerToAdd change : add new banner*/
watch(
    bannerToAdd,
    ( data ) => {
        addBanner( wsfString.getUuid(), data.text, data.autoHide );
    },
    { depp: true }
);

/**
 * emit by infoBanner
 * id : banner id to remove
 */
function removeBanner ( id ) {
    let removedCount = removedBannersCount();
    banners.value.forEach( ( banner, index ) => {
        if ( banner.id === id ) {
            /**
             * Modify the start and position
             * to move the banner beyond the top position (and hide it)
             * and destroy it after 1000ms (animation-duration)
             */
            banner.removed = true;
            banner.start = banner.position;
            banner.position = `-${bannerHeight}px`;
            removedCount++;
            setTimeout( () => destroyBanner( banner.id ), 1000 );
            return;
        }
        /**
         * Modify the start and position to move up others
         */
        if ( removedCount > 0 && !banner.removed ) {
            banner.start = banner.position;
            banner.position = `${( index - removedCount ) * ( bannerHeight + 1 )}px`;
        }
    } );
}
/**
 * destroy the hiden banner
 */
function destroyBanner ( bannerId ) {
    banners.value = banners.value.filter( ( banner ) => {
        return banner.id !== bannerId;
    } );
}
/**
 * count of removed banners
 */
function removedBannersCount () {
    return banners.value.filter( ( banner ) => {
        return banner.removed;
    } ).length;
}
/**
 * count of autoHide banners, used to increase the visible time of the banner
 */
function autoHideBannersCount () {
    return banners.value.filter( ( banner ) => {
        return banner.autoHide !== 0;
    } ).length;
}
/**
 * Add new banner
 */
function addBanner ( id, text, autoHide = 2000 ) {
    banners.value.forEach( ( banner, index ) => {
        banner.start = banner.position;
        banner.position = `${( index + 1 ) * ( bannerHeight + 1 )}px`;
    } );
    banners.value.unshift( {
        id: id,
        removed: false,
        autoHide: autoHide,
        text: text,
        position: "0px",
        start: `-${bannerHeight}px`,
        autoHidecount: autoHideBannersCount(),
    } );
}
</script>