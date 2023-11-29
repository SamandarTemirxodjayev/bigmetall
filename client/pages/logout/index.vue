<template>
  <div>
    <Loader />
  </div>
</template>

<script setup>
onMounted(async () => {
  localStorage.clear();
  window.location.href = "/login";
});
</script>