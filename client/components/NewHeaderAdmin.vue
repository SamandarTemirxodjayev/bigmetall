<template>
  <div
    class="bg-white w-full fixed z-[5] top-0 h-16 border-b border-gray-300 shadow-lg flex justify-between items-center pl-5"
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
      <div class="pr-5 cursor-pointer text-gray-700">
        <NuxtLink @click="printContent">
          <Icon name="mingcute:print-line" size="1.5rem" />
        </NuxtLink>
      </div>
      <div class="pr-5 text-gray-700 group">
        <div class="relative">
          <div
            class="absolute bg-red-600 text-white rounded-full w-5 h-5 flex justify-center items-center left-3 -top-1"
          >
            {{ notices.length }}
          </div>
          <Icon
            name="ion:notifications-outline"
            size="1.5rem"
            class="top-0 cursor-pointer"
          />
        </div>
        <div
          class="hidden group-hover:block absolute bg-white w-[200px] right-3 px-3 py-1 border border-gray-300 rounded-md shadow-xl"
        >
          <div v-if="notices.length == 0">
            <span class="text-xs">Hozircha Xabarlar Mavjud Emas</span>
          </div>
          <div v-else>
            <div
              class="text-xs last:border-b-0 border-b border-gray-300 gap-y-3 my-1 first:mt-0 last:mb-0"
              v-for="(notice, i) in notices"
              :key="i"
            >
              <p class="mt-1">
                Yuboruvchi: {{ notice.senderName.name }}
                {{ notice.senderName.surname }}
              </p>
              <p>Xabar: {{ notice.text }}</p>
              <p class="mb-1">Sana: {{ formatTime(notice.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
let calculator = ref(false);
let notices = ref([]);
let isNoticeShow = ref(false);

const handleCalculator = () => {
  calculator.value = !calculator.value;
};
const printContent = () => {
  window.print();
};
onMounted(async () => {
  try {
    const res = await $host.get("/notices");
    notices.value = res.data;
  } catch (error) {
    console.log(error);
  }
});
const handleShowNotice = () => {
  isNoticeShow.value = !isNoticeShow.value;
};
</script>