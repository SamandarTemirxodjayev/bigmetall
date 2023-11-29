<template>
  <div
    class="bg-white w-full fixed z-[1000] top-0 h-16 border-b border-gray-300 shadow-lg flex justify-between items-center px-4"
  >
    <div
      class="cursor-pointer text-gray-500 font-semibold flex items-center hover:text-[#34a3f1]"
    >
      <NuxtLink to="/logout">
        <Icon name="solar:exit-outline" size="28px" class="mr-2" />
        <span>Chiqish</span>
      </NuxtLink>
    </div>
    <div class="text-3xl font-bold text-[#34a3f1] uppercase">Big metall</div>
    <div class="flex flex-row">
      <div class="pr-5 cursor-pointer">
        <NuxtLink to="#">
          <Icon name="logos:telegram" size="1.5rem" />
        </NuxtLink>
      </div>
      <div class="pr-5 cursor-pointer text-gray-700">
        <NuxtLink @click="printContent">
          <Icon name="mingcute:print-line" size="1.5rem" />
        </NuxtLink>
      </div>
      <div class="pr-5 cursor-pointer text-gray-700">
        <NuxtLink to="#">
          <Icon name="ion:notifications-outline" size="1.5rem" />
        </NuxtLink>
      </div>
      <div
        class="cursor-pointer text-gray-500 hover:text-black pr-5"
        @click="handleCalculator"
      >
        <Icon name="mdi:calculator" size="1.5rem" />
      </div>
      <div v-if="calculator" class="fixed right-[3%] top-16 bg-white z-10">
        <Calculator />
      </div>
    </div>
  </div>
</template>
<script setup>
let calculator = ref(false);
const handleCalculator = () => {
  calculator.value = !calculator.value;
};
const printContent = () => {
  window.print();
};
</script>