<template>
    <div>
        <button @click="emit('delete')">Delete Profile</button>

    </div>
</template>

<script setup lang="ts">

const emit = defineEmits<{
    (e: 'delete'): void
}>()
const props = defineProps<{ selectedProfileId: string }>()


</script>