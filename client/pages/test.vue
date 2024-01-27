<template>
  <div>
    <VueNumber
      v-model="price"
      v-bind="number"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
</template>

<script setup>
import { component as VueNumber } from "@coders-tm/vue-number-format";

let number = ref({
  decimal: ".",
  separator: " ",
  suffix: " so'm",
  precision: 2,
  masked: false,
});
let price = ref();
</script>