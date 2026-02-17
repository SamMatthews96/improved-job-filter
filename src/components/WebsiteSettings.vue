<script setup lang="ts">
import WebsiteAddFilterField from '@/components/WebsiteAddFilterField.vue';
import WebsiteFieldSettings from '@/components/WebsiteFieldSettings.vue';
import {
  currentWebsiteSettings,
  filterProfileArray,
} from '@/utils/state'
import { ref } from 'vue';

const isOpen = ref(false)

</script>

<template>
  <div class="settings-container">
    <div class="header">
      <h3>Website Settings</h3>
      <button @click="isOpen = !isOpen">
        {{ isOpen ? '-' : '+' }}
      </button>
    </div>

    <template v-if="isOpen">
      <WebsiteFieldSettings />
      <WebsiteAddFilterField />
      <div class="label-container">
        <label for="profile">Selected Profile: </label>
        <span>
          <select name="profile" v-model="currentWebsiteSettings!.selectedFilterId">
            <option v-for="filterProfile in filterProfileArray" :value="filterProfile.name">{{ filterProfile.name }}
            </option>
          </select>
        </span>
      </div>
    </template>

  </div>

</template>


<style scoped lang="scss">
.label-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;

  label {
    text-align: right;
  }

  select {
    min-width: 100px;
  }
}

.settings-container {
  padding: 2px;
  background-color: #eee;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;

  h3 {
    margin: 0;
  }
}
</style>
