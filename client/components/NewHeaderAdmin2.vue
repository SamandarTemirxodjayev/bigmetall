<template>
  <div
    class="bg-white w-full fixed z-[9] top-0 h-16 border-b border-gray-300 shadow-lg flex justify-between items-center px-[5%] sm:px-[1%]"
  >
    <div
      class="cursor-pointer text-gray-500 font-semibold flex items-center hover:text-[#34a3f1]"
    >
      <NuxtLink to="/logout">
        <Icon name="solar:exit-outline" size="28px" class="" />
        <span>Chiqish</span>
      </NuxtLink>
    </div>
    <NuxtLink to="/2">
      <div class="text-3xl font-bold text-[#34a3f1] uppercase">Big metall</div>
    </NuxtLink>
  </div>
</template>