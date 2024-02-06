<template>
  <div v-if="!loading" class="body dark:bg-gray-800 bg-gray-50">
    <NewHeaderAdmin2 />
    <div class="pt-[5%] sm:pt-[5%]" />
    <div>
      <span class="text-2xl font-semibold mx-[4%]">Qidiruv</span>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl mx-[4%]">
      <div class="flex sm:flex-row flex-col sm:justify-around gap-[1%]">
        <USelect
          v-model="mahsulotTuri"
          @change="mahsulotTuriChange"
          class="w-full my-1 sm:my-0"
          size="xl"
          :options="
            MahsulotName.map((item) => ({
              name: item,
            }))
          "
          value-attribute="name"
          :disabled="loadingSearch"
          placeholder="Mahsulot Turi"
        />
        <UInput
          v-model="olchamlari"
          class="w-full my-1 sm:my-0"
          size="xl"
          placeholder="O'lchamlari"
          :disabled="loadingSearch"
        />
        <UInput
          v-model="category"
          class="w-full my-1 sm:my-0"
          size="xl"
          placeholder="Kategoriyasi"
          :disabled="loadingSearch"
        />
        <UInput
          v-model="qalinligi"
          class="w-full my-1 sm:my-0"
          size="xl"
          placeholder="Qalinligi"
          :disabled="loadingSearch"
        />
        <div v-if="mahsulotTuri == 'Dvuxtavr'" class="w-full my-1 sm:my-0">
          <UInput
            v-model="qalinligi_ortasi"
            class="w-full my-1 sm:my-0"
            size="xl"
            placeholder="Qalinligi O'rtasi"
            :disabled="loadingSearch"
          />
        </div>
        <USelect
          v-model="holati"
          size="xl"
          class="w-full my-1 sm:my-0"
          :options="['Yangi', 'Eski', 'B/U']"
          placeholder="Holati"
          :disabled="loadingSearch"
        />
        <UButton size="xl" :loading="loadingSearch" @click="handleSearchItems"
          >Tasdiqlash</UButton
        >
      </div>
      <div class="overflow-x-auto hide-scrollbar">
        <table class="w-full text-[13px] mt-[2%]">
          <thead>
            <tr>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Mahsulot Nomi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                O'lchamlari
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Kategoriyasi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Qalinligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Holati
              </th>
              <th
                v-if="mahsulotTuri != 'List'"
                class="px-5 py-3 text-left border-y border-gray-300"
              >
                Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Umumiy Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Ombor
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300"></th>
            </tr>
          </thead>
          <tbody v-for="item in items" :key="item._id">
            <tr class="hover:bg-gray-200 cursor-pointer w-full">
              <td class="px-5 py-3 border-b border-gray-300 min-w-[150px]">
                <template v-if="item.cut">
                  {{ item.name }} (kesilgan)
                </template>
                <template v-else>
                  {{ item.name }}
                </template>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div>{{ item.olchamlari }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div>
                  {{ item.category }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div>
                  <div v-if="item.qalinligi_ortasi">
                    O'rta: {{ item.qalinligi_ortasi }}mm<br />
                    Chet: {{ item.qalinligi }}mm
                  </div>
                  <div v-else>{{ item.qalinligi }}mm</div>
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div>
                  {{ item.holati }}
                </div>
              </td>
              <td
                v-if="mahsulotTuri != 'List'"
                class="px-5 py-3 border-b border-gray-300"
              >
                {{ item.minUzunligi }} - {{ item.maxUzunligi }}m
              </td>

              <td class="px-5 py-3 border-b border-gray-300">
                <div>{{ item.quantity }}ta</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[154px]">
                {{ item.totalUzunligi.toFixed(2) }}
                {{ item.name == "List" ? "m²" : "m" }}
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[100px]">
                {{ item.sklad.name }}
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="flex">
                  <UButton @click="openModal(item)" class="px-3 py-2 mx-2">
                    Batafsil
                  </UButton>
                  <UButton @click="downloadExcel(item)" class="px-3 py-2 mx-2">
                    Excel
                  </UButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="justify-between grid sm:grid-cols-3 grid-cols-1 gap-4 sm:mx-[10%] mx-[4%] mt-[15%] sm:mt-[5%]"
    >
      <div v-for="item in sklads" :key="item._id" class="my-[2%]">
        <NuxtLink :to="`/2/sklad/${item._id}`">
          <div
            class="lg:w-[396px] w-[100%] grid grid-cols-3 gap-4 bg-white dark:bg-gray-500 rounded-[24px] border border-gray-50 shadow-xl p-4"
          >
            <div class="col-span-1">
              <div
                class="border border-gray-50 rounded-[16px] px-[40px] py-[20px] bg-[#F3F4F6] shadow-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <g clip-path="url(#clip0_209_453)">
                    <path
                      d="M39.2722 8.62498L20.4441 0.104351C20.1363 -0.0349458 19.7834 -0.0345552 19.4761 0.105132L0.726094 8.62576C0.307656 8.81591 0.0390625 9.23302 0.0390625 9.69263V38.8282C0.0390625 39.4754 0.56375 40.0001 1.21094 40.0001H38.7891C39.4362 40.0001 39.9609 39.4754 39.9609 38.8282V9.69263C39.9609 9.2324 39.6915 8.81466 39.2722 8.62498ZM27.3827 32.9688C28.0299 32.9688 28.5546 32.4441 28.5546 31.7969V30.6251H30.8984V37.6563H23.8671V30.6251H26.2109V31.7969C26.2109 32.4442 26.7355 32.9688 27.3827 32.9688ZM30.8984 28.2813H22.6952C22.048 28.2813 21.5234 28.806 21.5234 29.4532V37.6563H18.3984C18.3984 35.7954 18.3984 21.7743 18.3984 20.0782C18.3984 19.431 17.8737 18.9063 17.2265 18.9063H9.02336V16.5626H30.8984V28.2813ZM9.02336 28.2813V21.2501H11.3671V22.4219C11.3671 23.0691 11.8918 23.5938 12.539 23.5938C13.1862 23.5938 13.7109 23.0691 13.7109 22.4219V21.2501H16.0546V28.2813H9.02336ZM9.02336 30.6251H11.3671V31.7969C11.3671 32.4441 11.8918 32.9688 12.539 32.9688C13.1862 32.9688 13.7109 32.4441 13.7109 31.7969V30.6251H16.0546V37.6563H9.02336V30.6251ZM37.6171 37.6563H33.2421V15.3907C33.2421 14.7435 32.7174 14.2188 32.0702 14.2188H7.85148C7.2043 14.2188 6.67961 14.7435 6.67961 15.3907V37.6563H2.38273V10.4473L19.9619 2.45873L37.6171 10.4486V37.6563Z"
                      fill="#1F1F1F"
                    />
                    <path
                      d="M15.2734 9.14062C15.2734 9.78781 15.7981 10.3125 16.4453 10.3125H23.4766C24.1237 10.3125 24.6484 9.78781 24.6484 9.14062C24.6484 8.49344 24.1237 7.96875 23.4766 7.96875H16.4453C15.7981 7.96875 15.2734 8.49344 15.2734 9.14062Z"
                      fill="#1F1F1F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_209_453">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            <div class="col-span-1 flex items-center justify-center">
              <div class="text-[24px] font-medium">{{ item.name }}</div>
            </div>

            <div class="col-span-2"></div>

            <div class="col-span-1 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
              >
                <path
                  d="M52.9827 26.3504L36.6493 10.0171C36.2093 9.59202 35.6199 9.35683 35.0081 9.36215C34.3963 9.36747 33.8111 9.61286 33.3784 10.0455C32.9458 10.4781 32.7004 11.0633 32.6951 11.6751C32.6898 12.2869 32.925 12.8763 33.35 13.3164L45.7003 25.6667H4.66634C4.0475 25.6667 3.45401 25.9126 3.01643 26.3501C2.57884 26.7877 2.33301 27.3812 2.33301 28.0001C2.33301 28.6189 2.57884 29.2124 3.01643 29.65C3.45401 30.0876 4.0475 30.3334 4.66634 30.3334H45.7003L33.35 42.6837C33.1272 42.899 32.9494 43.1564 32.8271 43.4411C32.7048 43.7258 32.6404 44.032 32.6378 44.3418C32.6351 44.6516 32.6941 44.9589 32.8114 45.2456C32.9287 45.5324 33.102 45.7929 33.3211 46.012C33.5402 46.2311 33.8007 46.4043 34.0875 46.5216C34.3742 46.639 34.6815 46.698 34.9913 46.6953C35.3011 46.6926 35.6073 46.6282 35.892 46.506C36.1766 46.3837 36.4341 46.2059 36.6493 45.9831L52.9827 29.6497C53.4201 29.2122 53.6658 28.6188 53.6658 28.0001C53.6658 27.3813 53.4201 26.788 52.9827 26.3504Z"
                  fill="#2767E4"
                />
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <UModal v-model="isOpenModal" fullscreen>
      <UCard
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow overflow-auto',
          },
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              <div class="text-2xl font-bold">Batafsil</div>
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpenModal = false"
            />
          </div>
        </template>

        <div class="border border-gray-50">
          <table class="w-full text-[13px]">
            <thead>
              <tr>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Mahsulot Nomi
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  O'lchamlari
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Kategoriyasi
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Qalinligi
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Holati
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Uzunligi
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Soni
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Umumiy Uzunligi
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  1 m Uchun Sotuv Narxi
                </th>
              </tr>
            </thead>
            <tbody v-for="item in fetchedProducts" :key="item._id">
              <tr class="hover:bg-gray-200 cursor-pointer w-full">
                <td class="px-5 py-3 border-b border-gray-300 min-w-[150px]">
                  <template v-if="item.cut">
                    {{ item.name }} (kesilgan)
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </td>
                <td class="px-5 py-3 border-b border-gray-300">
                  <div>{{ item.olchamlari }}</div>
                </td>
                <td class="px-5 py-3 border-b border-gray-300">
                  <div>
                    {{ item.category }}
                  </div>
                </td>
                <td class="px-5 py-3 border-b border-gray-300">
                  <div>
                    <div v-if="item.qalinligi_ortasi">
                      O'rta: {{ item.qalinligi_ortasi }}mm<br />
                      Chet: {{ item.qalinligi }}mm
                    </div>
                    <div v-else>{{ item.qalinligi }}mm</div>
                  </div>
                </td>
                <td class="px-5 py-3 border-b border-gray-300">
                  <div>
                    {{ item.holati }}
                  </div>
                </td>
                <td class="px-5 py-3 border-b border-gray-300">
                  <template
                    v-if="
                      item.name == 'Palasa' ||
                      item.name == 'Kvadrat prut' ||
                      item.name == 'Kvadrad profil'
                    "
                  >
                    <div>
                      Uzunligi: {{ item.uzunligi }}m <br />
                      Bo'yi: {{ item.uzunligi_x }}sm <br />
                      Eni: {{ item.uzunligi_y }}sm
                    </div>
                  </template>
                  <template v-else-if="item.uzunligi">
                    <div>{{ item.uzunligi }}m</div>
                  </template>
                  <template v-else>
                    <div>
                      Bo'yi: {{ item.uzunligi_x }}sm <br />
                      Eni: {{ item.uzunligi_y }}sm
                    </div>
                  </template>
                </td>

                <td class="px-5 py-3 border-b border-gray-300">
                  <div>{{ item.quantity }}ta</div>
                </td>
                <td class="px-5 py-3 border-b border-gray-300 min-w-[155px]">
                  <template v-if="item.uzunligi">
                    <div>{{ (item.uzunligi * item.quantity).toFixed(2) }}m</div>
                  </template>
                  <template v-else>
                    <div>
                      {{
                        (item.uzunligi_y * item.uzunligi_x * item.quantity) /
                        10000
                      }}
                      m<sup>2</sup>
                    </div>
                  </template>
                </td>
                <td class="px-5 py-3 border-b border-gray-300 min-w-[200px]">
                  <div>
                    {{
                      item.saledPrice == null
                        ? "Narx belgilanmagan"
                        : `${item.saledPrice
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`
                    }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </UCard>
    </UModal>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
let loading = ref(true);
let sklads = ref([]);
let MahsulotName = ref([
  "Dvuxtavr",
  "Shvellir",
  "Ugalok",
  "Truba",
  "List",
  "Armatura",
  "Kvadrad profil",
  "Kvadrat prut",
  "Prut",
  "Palasa",
  "Planka",
]);
let mahsulotTuri = ref(null);
let category = ref("");
let olchamlari = ref("");
let qalinligi = ref("");
let qalinligi_ortasi = ref("");
let loadingSearch = ref(false);
let isOpenModal = ref(false);
let fetchedProducts = ref([]);
let items = ref([]);
let holati = ref(null);

onMounted(async () => {
  try {
    const res = await $host.get("/user");
    if (res.data.user.user_level != 2) {
      window.location.href = "/";
    }
    const skladRes = await $host2.get("/sklad");
    sklads.value = skladRes.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
definePageMeta({
  layout: false,
});
const mahsulotTuriChange = () => {
  category.value = "";
  olchamlari.value = "";
  qalinligi.value = "";
  qalinligi_ortasi.value = "";
  holati.value = null;
};
const handleSearchItems = async () => {
  loadingSearch.value = true;
  if (mahsulotTuri.value == null) {
    return (loadingSearch.value = false);
  }
  try {
    const res = await $host2.post("/products/find", {
      name: mahsulotTuri.value,
      category: category.value,
      olchamlari: olchamlari.value,
      qalinligi: qalinligi.value,
      holati: holati.value,
      qalinligi_ortasi: qalinligi_ortasi.value,
    });
    items.value = res.data;
  } catch (error) {
    console.log(error);
  }
  loadingSearch.value = false;
};
const openModal = async (item) => {
  loading.value = true;
  try {
    const res = await $host2.post("/sklad/products", {
      name: item.name,
      olchamlari: item.olchamlari,
      category: item.category,
      qalinligi: item.qalinligi,
      qalinligi_ortasi: item.qalinligi_ortasi,
      holati: item.holati,
      sklad: item.sklad._id,
    });
    fetchedProducts.value = res.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
  isOpenModal.value = true;
};
const downloadExcel = async (item) => {
  loading.value = true;
  try {
    const res = await $host2.post(
      `/products/excel`,
      {
        name: item.name,
        olchamlari: item.olchamlari,
        category: item.category,
        qalinligi: item.qalinligi,
        qalinligi_ortasi: item.qalinligi_ortasi,
        holati: item.holati,
        sklad: item.sklad._id,
      },
      {
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `mahsulotlar-${Date.now()}.xlsx`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
</script>
<style scoped>
.body {
  background-color: #f3f4f6;
  min-height: 100svh;
}
.body {
  overflow: hidden;
  height: 100%;
}
.hide-scrollbar {
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
</style>