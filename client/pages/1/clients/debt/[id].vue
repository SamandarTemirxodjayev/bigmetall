  <template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold"
        >Mijoz - {{ client.name }} - Qarz</span
      >
    </div>
    <div class="items-center bg-white shadow-xl rounded-md">
      <div class="flex p-2 justify-between">
        <div class="flex items-center gap-x-[2%]">
          <div class="items-center w-full">
            <VueDatePicker
              class="border border-gray-500 rounded-[5px] min-w-[350px] z-1"
              v-model="date"
              range
              :max-date="new Date()"
              time-picker-inline
            />
          </div>
          <UButton size="lg" @click="handleSearch"> Qidirish </UButton>
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
              Sotuvchi
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
        <tbody v-if="products.length == 0">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td
              class="px-5 py-3 border-b border-gray-300 text-center"
              colspan="9"
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
                {{ item.sellerId.name }}({{ item.sellerId.phone }})
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.products.length }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ numberFormat(item.allAmount) }}
                so'm
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ numberFormat(item.payedAmount) }}
                so'm
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ numberFormat(item.allAmount - item.payedAmount) }}
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
                  <UButton size="lg"> Batafsil </UButton>
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const route = useRoute();

let isPopupOpen = ref(false);
let loading = ref(true);
let dates = ref([]);
let search = ref("Hammasi");
let client = ref("");
let products = ref([]);
let product = ref({});
let date = ref();

onMounted(async () => {
  try {
    client.value = (await $host.get("/client/" + route.params.id)).data;
    const resProducts = await $host.post(`/products/${route.params.id}/debts`);
    dates.value = resProducts.data.dates;
    products.value = resProducts.data.products;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const handleSearch = async () => {
  loading.value = true;
  try {
    const startDate = date.value && date.value[0] ? date.value[0] : null;
    const endDate = date.value && date.value[1] ? date.value[1] : null;
    const res = await $host.post(
      "/products/client/" + route.params.id + "/debt",
      {
        startDate,
        endDate,
      }
    );
    products.value = res.data;
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