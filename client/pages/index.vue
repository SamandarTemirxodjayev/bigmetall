<template>
  <div v-if="!loading"></div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
let user = ref();
let loading = ref(true);
onMounted(async () => {
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }
  const res = await $host.get("/user");
  window.location.href = `/${res.data.user.user_level}`;
});
</script>