<template>
    <input :id="id" :size="size" :name="id" type="text" :value="modelValue" :required="required" />
</template>

<script setup>

defineProps( {
    modelValue: String,
    id: String,
    required: String,
    size: String,

} )

</script>
