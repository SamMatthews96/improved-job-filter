<script setup lang="ts">

import { defineEmits } from "vue";

const model = defineModel<string>()
const emit = defineEmits<{
    (e: "delete"): void
}>()
</script>

<template>
    <input v-model="model"></input>
    <button @click="emit('delete')">Delete</button>
</template>

<style lang="scss" scoped>
input {
    padding: 5px;
}
</style>