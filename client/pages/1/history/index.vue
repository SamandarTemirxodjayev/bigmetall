<template>
  <div v-if="!loading">
    <div>
      <span class="text-2xl font-semibold">Hisobot</span>
    </div>
    <div class="shadow-2xl border border-gray-300 items-center mt-5">
      <div class="flex p-4 justify-between">
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
        <div>
          <UButton size="lg" @click="handleDownloadExcel"> Excel </UButton>
        </div>
      </div>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-4 shadow-2xl">
      <table class="w-full text-[11px]">
        <thead>
          <tr>
            <th class="px-5 py-3 text-left border-y border-gray-300">#</th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Mahsulot Nomi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Sotuvchi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">Mijoz</th>
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
        <tbody v-for="(item, i) in products" :key="item._id">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ i + 1 }}
              </div>
            </td>
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
                {{ item.saledSeller ? item.saledSeller.name : "" }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.saledClient ? item.saledClient.name : "" }}
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
                {{ formatTime(item.saledDate) }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.saledType }}</div>
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

let loading = ref(true);
let products = ref([]);
let date = ref([]);

onMounted(async () => {
  try {
    const res = await $host.post("/products/saled");
    products.value = res.data;
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    date.value = [threeDaysAgo, new Date()];
  } catch (error) {
    return console.error(error);
  }
  loading.value = false;
});
const handleSearch = async () => {
  loading.value = true;
  try {
    const startDate = date.value && date.value[0] ? date.value[0] : null;
    const endDate = date.value && date.value[1] ? date.value[1] : null;
    const res = await $host.post("/products/saled", {
      startDate,
      endDate,
    });
    products.value = res.data;
  } catch (error) {
    return console.error(error);
  }
  loading.value = false;
};
const handleDownloadExcel = async () => {
  loading.value = true;
  try {
    const res = await $host.get(`/history/excel`, {
      responseType: "blob",
      params: {
        startDate: date.value && date.value[0] ? date.value[0] : null,
        endDate: date.value && date.value[1] ? date.value[1] : null,
      },
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Tarix.xlsx");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    return console.error(error);
  }
  loading.value = false;
};
</script>