<template>
  <div v-if="!loading">
    <NewLayout>
      <div class="mb-2">
        <span class="text-2xl font-semibold">Mijoz - {{ client.name }}</span>
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
                Mahsulot Nomi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                O'lchamlari
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Kategoriyasi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Sotilgan Sanasi
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
                <div class="print-text">{{ item.name }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.olchamlari }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.category }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{
                    `${padWithZero(item.saledDate.day)}.${padWithZero(
                      item.saledDate.month
                    )}.${padWithZero(item.saledDate.year)} ${padWithZero(
                      item.saledTime.hour
                    )}:${padWithZero(item.saledTime.minute)}:${padWithZero(
                      item.saledTime.second
                    )}`
                  }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.saledType }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  <button
                    @click="handleAboutClick(item)"
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Batafsil
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="isPopupOpen"
        class="fixed top-8 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-25"
      >
        <div
          class="bg-white p-10 rounded-md shadow-lg w-[600px] max-h-[90vh] overflow-auto"
        >
          <button
            @click="() => (isPopupOpen = false)"
            class="relative -top-8 -right-8 float-right text-gray-500 hover:text-gray-700"
          >
            <Icon name="material-symbols:close" width="25" height="25" />
          </button>

          <div class="my-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Mahsulot Nomi</label
            >
            <input
              v-model="product.name"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="my-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              O'lchamlari</label
            >
            <input
              v-model="product.olchamlari"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="my-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Kategoriyasi</label
            >
            <input
              v-model="product.category"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="my-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Qalinligi</label
            >
            <input
              :value="
                product.qalinligi_ortasi
                  ? `${product.qalinligi_ortasi}mm/${product.qalinligi}mm`
                  : `${product.qalinligi}mm`
              "
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="my-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Holati</label
            >
            <input
              :value="product.holati"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="my-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Uzunligi</label
            >
            <input
              :value="`${product.uzunligi}m`"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="my-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              1m uchun tan narxi</label
            >
            <input
              :value="product.price.toLocaleString()"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="my-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              1m uchun sotuv narxi</label
            >
            <input
              :value="product.saledPrice.toLocaleString()"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="my-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Umumiy sotuv narxi</label
            >
            <input
              :value="`${(
                product.saledPrice * product.uzunligi
              ).toLocaleString()}`"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="my-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Qabul qilingan sana</label
            >
            <input
              :value="`${padWithZero(product.date.day)}.${padWithZero(
                product.date.month
              )}.${padWithZero(product.date.year)} ${padWithZero(
                product.time.hour
              )}:${padWithZero(product.time.minute)}:${padWithZero(
                product.time.second
              )}`"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="my-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Sotilgan sana</label
            >
            <input
              :value="`${padWithZero(product.saledDate.day)}.${padWithZero(
                product.saledDate.month
              )}.${padWithZero(product.saledDate.year)} ${padWithZero(
                product.saledTime.hour
              )}:${padWithZero(product.saledTime.minute)}:${padWithZero(
                product.saledTime.second
              )}`"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
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
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

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
    const resProducts = await $host.post("/products/" + route.params.id);
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