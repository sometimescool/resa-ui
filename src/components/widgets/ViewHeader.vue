<template>
    <header>
        {{ title }}
    </header>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>
<style scoped>
header {
    grid-area: header;
    background-color: var(--main-color);
    padding: 4px 8px;
    font-size: 20px;
    font-weight: bold;
    color: white
}
</style>