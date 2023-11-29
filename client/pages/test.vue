<template>
  <input ref="autoNumericInput" class="bg-black text-white" />
</template>

<script setup>
import AutoNumeric from "autonumeric";

const autoNumericInput = ref(null);

onMounted(() => {
  const options = {
    decimalPlaces: 0,
  };
  new AutoNumeric(autoNumericInput.value, options);
});
</script>
