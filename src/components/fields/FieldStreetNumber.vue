<template>
    <input :id="id" :size="size" :name="id" type="text" :value="modelValue" :required="required" pattern="[0-9]+[a-z]{0,4}$"
        data-format="1, 1 Bis, 1b" />
</template>

<script setup>

defineProps( {
    modelValue: [Number, String],
    id: String,
    required: String,
    size: String,
} )

</script>
