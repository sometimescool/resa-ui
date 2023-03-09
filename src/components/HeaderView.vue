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
    margin: 4px 8px;
    font-size: 20px;
    font-weight: bold;
}
</style>