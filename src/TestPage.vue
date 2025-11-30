<template>
    <div id="test-page">
        Test Page
        <div id="test-job-container">

            <div v-for="item in 8" class="test-job">Job</div>
        </div>
    </div>



</template>

<style lang="scss" scoped>
#test-page {
    text-align: center;
}

#test-job-container {
    border: 1px solid blue;
    max-width: 800px;
}

.test-job {
    height: 100px;
    border: 1px solid white;
    margin: 5px;
}
</style>