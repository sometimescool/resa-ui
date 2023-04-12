<template>
    <input :id="id" :name="id" type="text" :size="size" :value="modelValue" :required="required"
        pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$" data-format="+33123456789" />
</template>

<script setup>

defineProps( {
    modelValue: String,
    id: String,
    required: String,
    size: String,
} )

</script>