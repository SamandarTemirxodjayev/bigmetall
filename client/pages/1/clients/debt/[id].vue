  <template>
  <div v-if="!loading">
    <NewLayout>
      <div class="mb-2">
        <span class="text-2xl font-semibold"
          >Mijoz - {{ client.name }} - Qarz</span
        >
      </div>
      <div class="shadow items-center bg-white shadow-xl rounded-md">
        <div class="flex p-4 justify-between">
          <div class="flex">
            <div
              class="px-5 flex items-center border border-gray-500 rounded-lg px-2 mr-3"
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
          <div>
            <button
              @click="handleClickDownloadExcel"
              class="mx-2 text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-xl font-semibold"
            >
              Excelda Yuklab Olish
            </button>
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
                To'langan Summasi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Qolgan Summasi
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
          <tbody v-for="item in products" :key="item._id">
            <tr class="hover:bg-gray-200 cursor-pointer w-full">
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.clientId.name }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ summaryQuantity(item.products) }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{
                    item.allAmount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }}
                  so'm
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{
                    item.payedAmount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }}
                  so'm
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{
                    (item.allAmount - item.payedAmount)
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
                <div class="print-text">Qarz</div>
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
        </table>
      </div>
    </NewLayout>
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
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    client.value = (await $host.get("/client/" + route.params.id)).data;
    const resProducts = await $host.post(`/products/${route.params.id}/debts`);
    dates.value = resProducts.data.dates;
    products.value = resProducts.data.products;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const handleClickDownloadExcel = async () => {
  loading.value = true;
  try {
    const res = await $host.get(`/sklad/${route.params.id}/excel`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `sklad-${datetime}.xlsx`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
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
const handleAboutClick = async (item) => {
  product.value = item;
  isPopupOpen.value = true;
};
const summaryQuantity = (items) => {
  let total = 0;
  for (const item of items) {
    total += item.quantity;
  }
  return total;
};
</script>
  <style scoped>
@media print {
  body * {
    visibility: hidden;
  }

  table {
    visibility: visible;
    top: 0;
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