<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold">Mijoz - {{ client.name }}</span>
    </div>
    <div class="items-center bg-white shadow-xl rounded-md">
      <div class="flex p-4 justify-between">
        <div class="flex">
          <div
            class="flex items-center border border-gray-500 rounded-lg px-2 mr-3"
          >
            <select
              class="text-gray-900 text-sm block w-full p-2.5 outline-none"
              placeholder="Qidiruv"
              v-model="search"
              @change="handleChangeSearch"
            >
              <option value="Hammasi">Hammasi</option>
              <option v-for="(item, id) in dates" :key="id" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <table class="w-full text-[14px]">
        <thead>
          <tr>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Mijoz Ismi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Mahsulot Soni
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Umumiy Summasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Sotilgan Sanasi va Vaqti
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'lov Turi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Ma'lumotlar
            </th>
          </tr>
        </thead>
        <tbody v-if="products.length == 0">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td
              class="px-5 py-3 border-b border-gray-300 text-center"
              colspan="6"
            >
              Ma'lumot mavjud emas
            </td>
          </tr>
        </tbody>
        <tbody v-for="item in products" :key="item._id">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.clientId.name }}</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.products.length }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{
                  item.allAmount
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                so'm
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ formatTime(item.date) }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.type }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <NuxtLink :to="`/1/clients/info/${item._id}`">
                  <UButton type="button" size="xl"> Batafsil </UButton>
                </NuxtLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
const route = useRoute();

let isPopupOpen = ref(false);
let loading = ref(true);
let dates = ref([]);
let search = ref("Hammasi");
let client = ref("");
let products = ref([]);
let product = ref({});

onMounted(async () => {
  try {
    client.value = (await $host.get("/client/" + route.params.id)).data;
    const resProducts = await $host.post("/products/" + route.params.id);
    dates.value = resProducts.data.dates;
    products.value = resProducts.data.products;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const handleChangeSearch = async () => {
  loading.value = true;
  try {
    if (search.value == "Hammasi") {
      const res = await $host.post("/products/" + route.params.id);
      products.value = res.data.products;
    } else {
      const d = search.value.split("-");
      const res = await $host.post("/products/client/" + route.params.id, {
        date: {
          day: parseInt(d[0]),
          month: parseInt(d[1]),
          year: parseInt(d[2]),
        },
      });
      products.value = res.data;
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
</script>
<style scoped>
@media print {
  body * {
    visibility: hidden;
  }

  table {
    visibility: visible;
    position: relative;
    margin-left: -15%;
  }

  table th,
  table td {
    visibility: visible;
  }

  .print-text {
    visibility: visible;
  }
}
</style>