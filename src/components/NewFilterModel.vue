<template>
    <div class="new-filter-modal">
        <span>
            <input v-model="newName"></input>
            <button @click="onCreateClicked">Create</button>
            <button @click="onCancelClicked">Cancel</button>
        </span>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

const newName = ref('')
const emit = defineEmits<{
    (e: 'create', name: string): void,
    (e: 'cancel'): void
}>()

function onCreateClicked() {
    emit('create', newName.value)
}

function onCancelClicked(){
    emit('cancel')
}


</script>

<style scoped lang="scss">
.new-filter-modal {
    margin: 0;
    padding: 0;
    background: #88888888;
    position: absolute;
    
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    

    display: flex;
    border-radius: 8px;
    
    justify-content: center;
    align-items: center;


}
</style>