<template>
  <div v-if="!loading">
    <NewLayout>
      <div>
        <span class="text-2xl font-semibold">Bosh Sahifa</span>
      </div>
      <div class="mt-4">
        <div class="flex">
          <div>
            <div class="my-3">
              <span>Sotuvlar</span>
            </div>
            <div class="flex flex-row">
              <div class="square border border-gray-300 shadow-2xl">
                <div class="flex flex-col text-[#34A3F1] items-center">
                  <Icon name="zondicons:calendar" size="38px" />
                  <span class="text-[14px] text-gray-500 mt-1">Bugun</span>
                  <div class="text-3xl mt-6">0</div>
                </div>
              </div>
              <div class="square border border-gray-300 shadow-2xl">
                <div class="flex flex-col text-[#34A3F1] items-center">
                  <Icon name="zondicons:calendar" size="38px" />
                  <span class="text-[14px] text-gray-500 mt-1">Hafta</span>
                  <div class="text-3xl mt-6">0</div>
                </div>
              </div>
              <div class="square border border-gray-300 shadow-2xl">
                <div class="flex flex-col text-[#34A3F1] items-center">
                  <Icon name="zondicons:calendar" size="38px" />
                  <span class="text-[14px] text-gray-500 mt-1">Oy</span>
                  <div class="text-3xl mt-6">0</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="my-3">
              <span>O‘zaro hisob kitoblar</span>
            </div>
            <div class="flex flex-row">
              <div class="square2 border border-gray-300 shadow-2xl">
                <div class="flex flex-col text-[#34A3F1] items-center">
                  <Icon name="game-icons:pay-money" size="38px" />
                  <span class="text-[14px] text-gray-500 mt-1"
                    >Berilgan qarz</span
                  >
                  <div class="text-3xl mt-6">0</div>
                </div>
              </div>
              <div class="square2 border border-gray-300 shadow-2xl">
                <div class="flex flex-col text-[#34A3F1] items-center">
                  <Icon
                    name="game-icons:pay-money"
                    size="38px"
                    class="rotate-180"
                  />
                  <span class="text-[14px] text-gray-500 mt-1"
                    >Olingan qarz</span
                  >
                  <div class="text-3xl mt-6">0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
let loading = ref(true);
let calculator = ref(false);
let isFullScreen = ref(false);
onMounted(async () => {
  try {
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
</script>
<style scoped>
.square {
  width: 230px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
.square2 {
  width: 280px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
</style>