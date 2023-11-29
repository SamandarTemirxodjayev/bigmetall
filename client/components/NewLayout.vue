<template>
  <div>
    <NewHeaderAdmin />
    <NewSidebarAdmin />
    <div class="mt-16 ml-24">
      <div class="bg-gray-100 px-8 py-4 min-h-[91vh]">
        <slot />
      </div>
    </div>
  </div>
</template>