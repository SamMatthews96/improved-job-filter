<template>
  <span class="field-name">
    <input v-if="isEdit" v-model="inputValue"></input>
    <span v-else>{{ props.fieldName }}</span>

    <button @click="onEditClicked">E</button>
    <button @click="emit('delete-field')">D</button>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue';

function onEditClicked(){
  isEdit.value = !isEdit.value
  if (isEdit.value){
    inputValue.value = props.fieldName
  } else {
    emit('rename-field', inputValue.value)
  }
}

const props = defineProps<{ fieldName: string }>()

const emit = defineEmits<{
  (e: 'delete-field'): void,
  (e: 'rename-field', newName: string): void
}>()

const isEdit = ref(false)
const inputValue = ref(props.fieldName)

</script>

<style lang="scss" scoped>
.field-name {
  padding: 3px 8px 3px 8px;
  margin: 2px;
  background-color: #2065a480;
  border-radius: 15px;
}

input {
  max-width: 100px
}
</style>
