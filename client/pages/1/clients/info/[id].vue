<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold"
        >Mahsulotlar Haqida - {{ pro.clientId.name }} - {{ pro.type }}</span
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
              <div class="print-text">
                {{ numberFormat(item.saledPrice) }}so'm
              </div>
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
                      : `${numberFormat(
                          item.saledPrice * item.uzunligi * item.quantity
                        )} so'm`
                  }}
                </div>
              </template>
              <template v-else>
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(
                          ((item.saledPrice *
                            (item.uzunligi_x * item.uzunligi_y)) /
                            10000) *
                            item.quantity
                        )} so'm`
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
              <div class="print-text">{{ pro.type }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <template v-if="pro.type == 'Qarz(To\'langan)'">
      <div class="mt-8 bg-white border border-gray-50 px-4 pb-4 shadow-2xl">
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
          <tbody v-for="item in pro.debt.historyAmount" :key="item._id">
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
                  {{ numberFormat(item.amount) }}so'm
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.payedType }}</div>
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
    </template>
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