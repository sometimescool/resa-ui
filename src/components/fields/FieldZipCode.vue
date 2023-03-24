<template>
    <input :id="id" :size="size" :name="id" type="text" :value="modelValue" :required="required" pattern="[0-9]{5,5}$" />
</template>

<script setup>

defineProps( {
    modelValue: [Number, String],
    id: String,
    required: String,
    size: String,
} )

</script>
