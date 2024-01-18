<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
* {
  font-family: "Poppins", sans-serif;
}
@media print {
  body * {
    visibility: hidden;
    margin: 0;
    padding: 0;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .print-text {
    visibility: visible;
  }
}
@page {
  size: 100% 230px;
  margin: 0 25px 0 0;
  overflow: hidden;
}

header,
footer {
  display: none;
}

@media print {
  header,
  footer {
    display: none;
  }
}
</style>
<script setup>
useHead({
  title: "Big Metall CRM",
});
</script>