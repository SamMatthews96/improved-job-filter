<template>
  <template v-if="displayMode == 'start'">
    <p>Improved Job Filter is unconfigured for this page</p>
    <p>Please enter the title of the first and second search results:</p>

    <input name="firstSearchName" v-model="firstSearchName"></input>
    <input name="secondSearchName" v-model="secondSearchName"></input>
    <button @click="onSubmit">Submit</button>
  </template>
  <p v-if="showError">Sorry, I couldn't identify the container.
    Please double check your spelling.
  </p>


</template>

<script setup lang="ts">
import { ref } from 'vue';

const displayMode = ref('start')
const firstSearchName = ref('')
const secondSearchName = ref('')

const showError = ref(false)

const emit = defineEmits<{
  (e: "foundContainer", node: Node): void
}>()

function onSubmit() {
  let xpath = `//*[text()='${firstSearchName.value}']`;
  const match1 = document.evaluate(
    xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue;
  xpath = `//*[text()='${secondSearchName.value}']`;
  const match2 = document.evaluate(
    xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue;

  if (match1 && match2) {
    const ans = getCommonAncestor(match1, match2)
    if (ans) {
      emit('foundContainer', ans)
    } else {

    }
  }
}

function getCommonAncestor(node1: Node, node2: Node): Node | null {
  // Determine which API is available on the node
  const method: "contains" | "compareDocumentPosition" =
    "contains" in node1 ? "contains" : "compareDocumentPosition";

  const test = method === "contains" ? 1 : Node.DOCUMENT_POSITION_CONTAINED_BY;

  let current: Node | null = node1;

  while ((current = current.parentNode)) {
    // TypeScript refinement for dynamic method access
    const result = (current as any)[method](node2);
    if ((result & test) === test) {
      return current;
    }
  }

  return null;
}

</script>

<style scoped>
button {
  cursor: pointer;
  margin: auto;
  display: block;
}

input {
  display: block;
  margin: auto;
  font-size: 20px;
}
</style>
