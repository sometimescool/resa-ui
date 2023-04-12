<template>
    <input :id="id" :name="id" type="text" :size="size" :value="modelValue" :required="required"
        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$" data-format="john@smith.uk" />
</template>

<script setup>

defineProps( {
    modelValue: String,
    id: String,
    required: String,
    size: String,
} )

</script>