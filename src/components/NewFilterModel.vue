<template>
    <div class="new-filter-modal">
        <span>
            <input v-model="newName"></input>
            <button @click="onCreateClicked">Create</button>
        </span>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const newName = ref('')
const emit = defineEmits<{
    (e: 'create', name: string): void
}>()

function onCreateClicked() {
    emit('create', newName.value)
}

</script>

<style scoped lang="scss">
.new-filter-modal {
    margin: 0;
    padding: 0;
    background: #88888888;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 10px;
    
    justify-content: center;
    align-items: center;


}
</style>