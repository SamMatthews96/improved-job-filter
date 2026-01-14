<template>
    <div>
        Missing Fields
        <div v-for="field in props.missingFilterFields">
            <span>
                {{ field }}
            </span>
            <button @click="emit('add-field', field)">Add</button>
        </div>
    </div>

</template>

<script setup lang="ts">
const props = defineProps<{ missingFilterFields: string[] }>()

const emit = defineEmits<{
    (e: 'add-field', fieldName: string): void
}>()

</script>

<style scoped lang="scss">
div {
    color: yellow;
}
</style>