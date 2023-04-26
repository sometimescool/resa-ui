<template>
    <div class="footer">My footer</div>
</template>

<script setup>
import { toRef } from "vue"
const props = defineProps( {
    height: {
        type: String,
        default: "30px"
    }
} )

const height = toRef( props, "height" )
</script>
<style scoped>
.footer {
    height: v-bind(height);
    line-height: v-bind(height);
}
</style>
