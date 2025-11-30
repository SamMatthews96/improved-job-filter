<template>
    <div>
        <div
            v-for="(item, index) in items"
            :key="index"
            style="margin-bottom: 8px;"
        >
            <input v-model="items[index]" />
            <button @click="remove(index)">Delete</button>
        </div>

        <button @click="add">Add Item</button>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

const items: Ref<Array<string>> = ref(["First", "Second"]);

const add = () => {
    items.value.push("");
};

const remove = (index: number) => {
    items.value.splice(index, 1);
    console.log(items.value)
};
</script>