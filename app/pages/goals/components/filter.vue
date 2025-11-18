<script setup lang="ts">
const items = [
  {
    label: "Mais Recentes",
    slot: "recent",
  },
  {
    label: "Prazo Final",
    slot: "deadline",
  },
  {
    label: "Mais Proximas de concluir",
    slot: "closest",
  },
];
</script>

<template>
  <UTabs :items="items" class="mb-4"> </UTabs>
</template>
