<template>
  <div v-if="!loading">
    <NewLayout>
      <div class="mb-2">
        <span class="text-2xl font-semibold">Mahsulotlar Haqida</span>
      </div>
      <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
        <table class="w-full text-[14px]">
          <thead>
            <tr>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Mijoz Ismi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Mahsulot Nomi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                O'lchamlari
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Qalinligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Kategoriyasi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Holati
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                1m uchun tan narxi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
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
                <div class="print-text">{{ pro.clientId.name }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.name }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.olchamlari }}
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
                  {{ item.category }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.holati }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.saledPrice }}
                  so'm
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.quantity }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{
                    `${padWithZero(pro.date.day)}.${padWithZero(
                      pro.date.month
                    )}.${padWithZero(pro.date.year)} ${padWithZero(
                      pro.time.hour
                    )}:${padWithZero(pro.time.minute)}:${padWithZero(
                      pro.time.second
                    )}`
                  }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ pro.type }}</div>
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
let search = ref("Hammasi");
let products = ref([]);
let product = ref({});
let pro = ref({});

onMounted(async () => {
  try {
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    const resProducts = await $host.post(`/products/info/${route.params.id}`);
    products.value = resProducts.data.products;
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