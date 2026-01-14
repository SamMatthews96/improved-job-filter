<template>
    <div
        class="website-field-config"
        @mouseenter="emit('mouseenter')"
        @mouseleave="emit('mouseleave')"
    >

        <span>{{ fieldName }}</span>
        <button @click="emit('delete')">
            {{ fieldName == 'container' ? 'Reset Site Data' : 'Delete' }}
        </button>
    </div>
</template>

<script setup lang="ts">


const props = defineProps<{
    fieldName: string
}>()

const emit = defineEmits<{
    (e: 'delete'): void,
    (e: 'mouseenter'): void,
    (e: 'mouseleave'): void,
}>()

</script>

<style scoped lang="scss">
.website-field-config {
    border: 1px red solid;
    padding: 3px;
    margin: 2px;
    display: flex;
    justify-content: space-between;
    cursor: default;
}
</style>
