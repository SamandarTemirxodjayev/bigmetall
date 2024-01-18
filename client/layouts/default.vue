<template>
  <div>
    <NewHeaderAdmin />
    <NewSidebarAdmin />
    <div class="mt-16 ml-24">
      <div class="bg-gray-100 px-4 py-4 min-h-[91vh]">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media print {
  * {
    margin: 0;
    padding: 0;
  }
}
</style>