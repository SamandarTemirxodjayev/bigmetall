<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold"
        >Mahsulotlar Haqida - {{ pro.clientId.name }} - Qarzdorlik</span
      >
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-4 shadow-2xl">
      <table class="w-full text-[11px]">
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
            <th class="px-5 py-3 text-left border-y border-gray-300">Holati</th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Uzunligi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              1m uchun sotuv narxi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Umumiy Narxi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Sotilgan Sanasi va Vaqti
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'lov Turi
            </th>
          </tr>
        </thead>
        <tbody v-for="item in products" :key="item._id">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <template v-if="item.cut">
                  {{ item.name }} (kesilgan)
                </template>
                <template v-else>
                  {{ item.name }}
                </template>
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.olchamlari }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.category }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <template v-if="item.name == 'Dvuxtavr'">
                  O'rta: {{ item.qalinligi_ortasi }}mm <br />
                  Chet: {{ item.qalinligi }}mm
                </template>
                <template v-else> {{ item.qalinligi }}mm </template>
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
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
                <div class="print-text">
                  Uzunligi: {{ item.uzunligi }}m <br />
                  Bo'yi: {{ item.uzunligi_x }}sm <br />
                  Eni: {{ item.uzunligi_y }}sm
                </div>
              </template>
              <template v-else-if="item.uzunligi">
                <div class="print-text">{{ item.uzunligi }}m</div>
              </template>
              <template v-else>
                <div class="print-text">
                  Bo'yi: {{ item.uzunligi_x }}sm <br />
                  Eni: {{ item.uzunligi_y }}sm
                </div>
              </template>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.saledPrice }}so'm</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.quantity }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <template v-if="item.uzunligi">
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${(item.saledPrice * item.uzunligi * item.quantity)
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`
                  }}
                </div>
              </template>
              <template v-else>
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${(
                          ((item.saledPrice *
                            (item.uzunligi_x * item.uzunligi_y)) /
                            10000) *
                          item.quantity
                        )
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`
                  }}
                </div>
              </template>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ formatTime(pro.date) }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">Qarz</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-8 bg-white border border-gray-50 px-4 pb-4 shadow-2xl">
      <div class="my-4 flex justify-between">
        <div class="flex">
          <button
            class="mx-2 text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-xl font-semibold"
          >
            To'langan:
            {{
              pro.payedAmount
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }}
            so'm
          </button>
          <button
            class="mx-2 text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-xl font-semibold"
          >
            Qoldiq:
            {{
              (pro.allAmount - pro.payedAmount)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }}
            so'm
          </button>
        </div>
        <button
          @click="() => (isPopupOpen = true)"
          class="mx-2 text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-xl font-semibold"
        >
          To'lov Qo'shish
        </button>
      </div>
      <table class="w-full text-[14px]">
        <thead>
          <tr>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Mijoz Ismi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Qabul Qiluvchi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'lov Summasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'lov Turi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'lov Sanasi
            </th>
          </tr>
        </thead>
        <tbody v-for="item in paymentHistory" :key="item._id">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ pro.clientId.name }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.clientSaved }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{
                  item.amount
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                so'm
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.payedType }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ formatTime(item.date) }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="isPopupOpen"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-25"
    >
      <div class="bg-white p-10 rounded-md shadow-lg w-[400px]">
        <button
          @click="() => (isPopupOpen = false)"
          class="relative -top-8 -right-8 float-right text-gray-500 hover:text-gray-700"
        >
          <Icon name="material-symbols:close" width="25" height="25" />
        </button>

        <div>
          <form @submit="handleSubmit">
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Mijoz Ismi</label
              >
              <input
                v-model="pro.clientId.name"
                type="text"
                disabled
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div class="mb-4">
              <label
                for="quantity"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Qabul Qiluvchi</label
              >
              <input
                v-model="clientSaved"
                required
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div class="mb-4">
              <label
                for="quantity"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                To'lov Summasi</label
              >
              <input
                v-model="amount"
                required
                type="number"
                :max="pro.allAmount - pro.payedAmount"
                min="0"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div class="mb-4">
              <label
                for="quantity"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                To'lov Turi</label
              >
              <select
                v-model="payedType"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option>Naxt</option>
                <option>Perechesleniya</option>
                <option>Kartaga( terminal)</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Tasdiqlash
              </button>
            </div>
          </form>
        </div>
      </div>
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
let search = ref("Hammasi");
let products = ref([]);
let product = ref({});
let pro = ref({});
let paymentHistory = ref([]);
let clientSaved = ref("");
let amount = ref("");
let payedType = ref("");

onMounted(async () => {
  try {
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    const resProducts = await $host.post(`/products/debt/${route.params.id}`);
    products.value = resProducts.data.products;
    paymentHistory.value = resProducts.data.historyAmount;
    pro.value = resProducts.data;
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
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $host.put(`/products/debt/${route.params.id}`, {
      clientSaved: clientSaved.value,
      amount: amount.value,
      payedType: payedType.value,
    });
    isPopupOpen.value = false;
    window.location.reload();
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
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