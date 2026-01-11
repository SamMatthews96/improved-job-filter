<template>
    <div class="test-page">
        <h3>Test Page</h3>
        <button @click="length++">Add</button>
        <button @click="length--">Remove</button>

        <div id="mytest">
            <p>

            </p>
            <div>

            </div>
            <ul>

            </ul>
            <div>

            </div>
        </div>

        <div id="test-job-container">
            <div
                class="test-job"
            >
                <div
                    class="test-title"
                    title="Job Title"
                    :myAttr="`test att `"
                >C#/.NET, C++</div>
                <div class="test-company">Noir</div>
            </div>
            <div
                v-for="item in length"
                class="test-job"
            >
                <div
                    class="test-title"
                    title="Job Title"
                    :myAttr="`test att `"
                >Job Title {{ item }}</div>
                <div class="test-company">Company Title {{ item }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const length = ref(8)
</script>

<style lang="scss" scoped>
.test-page {
    text-align: center;
}

#test-job-container {
    border: 1px solid blue;
    max-width: 800px;
    margin: 20px;
}

.test-job {
    height: 100px;
    border: 1px solid white;
    margin: 5px;
}
</style>
