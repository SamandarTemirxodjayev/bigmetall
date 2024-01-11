<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold"
        >Sotuvchi - {{ seller.name }} - Sotilgan Mahsulotlar</span
      >
    </div>
    <div class="shadow items-center bg-white shadow-xl rounded-md">
      <div class="flex w-[30%] p-4 justify-between">
        <VueDatePicker
          v-model="date"
          range
          :max-date="new Date()"
          time-picker-inline
        />
      </div>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Sotuvchi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">Mijoz</th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Umumiy Summasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'lov Turi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Sotilgan Vaqti
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Ma'lumotlar
            </th>
          </tr>
        </thead>

        <tbody v-for="item in debtProducts" :key="item._id">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.sellerId.name }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.clientId.name }}({{ item.clientId.phone }})
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <div>
                  {{
                    item.allAmount
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }}
                  so'm
                </div>
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <div>Qarz</div>
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ formatTime(item.date) }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <NuxtLink :to="`/1/clients/debtInfo/${item._id}`">
                  <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Batafsil
                  </button>
                </NuxtLink>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody v-for="item in products" :key="item._id">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.sellerId.name }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.clientId.name }}({{ item.clientId.phone }})
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <div>
                  {{
                    item.allAmount
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }}
                  so'm
                </div>
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <div>
                  {{ item.type }}
                </div>
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ formatTime(item.date) }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <NuxtLink :to="`/1/clients/info/${item._id}`">
                <div class="print-text">
                  <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Batafsil
                  </button>
                </div>
              </NuxtLink>
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const route = useRoute();
let loading = ref(true);
let seller = ref(null);
let date = ref(null);
let products = ref([]);
let debtProducts = ref([]);

onMounted(async () => {
  try {
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
    date.value = [startDate, endDate];

    const res = await $host.get("/seller/" + route.params.id);
    seller.value = res.data;
    const res2 = await $host.post(`/seller/${route.params.id}/products`, {
      startDate,
      endDate,
    });
    products.value = res2.data.products;
    debtProducts.value = res2.data.debts;

    loading.value = false;
  } catch (error) {
    console.log(error);
  }
});
watch(date, async () => {
  loading.value = true;
  try {
    const res = await $host.post(`/seller/${route.params.id}/products`, {
      startDate: date.value && date.value[0] ? date.value[0] : null,
      endDate: date.value && date.value[1] ? date.value[1] : null,
    });
    products.value = res.data.products;
    debtProducts.value = res.data.debts;
  } catch (error) {
    return console.log(error);
  }
  loading.value = false;
});
</script>