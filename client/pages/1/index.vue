<template>
  <div v-if="!loading">
    <div>
      <span class="text-2xl font-semibold">Bosh Sahifa</span>
    </div>
    <div class="mt-4">
      <div class="flex justify-between gap-[1%]">
        <div class="flex-1 my-4 p-2 shadow-xl border border-gray-300">
          <div class="flex justify-between mx-3 items-center my-2">
            <div class="font-semibold">Sana:</div>
            <div>
              <VueDatePicker
                class="border border-gray-500 rounded-[5px] mx-auto max-w-[80%]"
                v-model="date"
                :enable-time-picker="false"
                disabled
              />
            </div>
          </div>
          <div class="flex justify-between mx-3 mt-8 items-center text-center">
            <div class="font-semibold">Foyda:</div>
            <div class="text-[#196CF4] text-xl font-bold">
              {{ numberFormat(foyda.toFixed()) }} so'm
            </div>
          </div>
        </div>
        <div class="flex-1 my-4 p-2 shadow-xl border border-gray-300">
          <div class="flex justify-between mx-3 items-center my-2">
            <div class="font-semibold">Sana:</div>
            <div>
              <VueDatePicker
                class="border border-gray-500 rounded-[5px] mx-auto max-w-[80%]"
                v-model="date"
                :enable-time-picker="false"
                disabled
              />
            </div>
          </div>
          <div class="flex justify-between mx-3 mt-8 items-center text-center">
            <div class="font-semibold">Harajatlar:</div>
            <div class="text-[red] text-xl font-bold">
              {{ numberFormat(xarajats) }} so'm
            </div>
          </div>
        </div>
        <div class="flex-1 my-4 p-2 shadow-xl border border-gray-300">
          <div class="flex justify-between mx-3 items-center my-2">
            <div class="font-semibold">Sana:</div>
            <div>
              <VueDatePicker
                class="border border-gray-500 rounded-[5px] mx-auto max-w-[80%]"
                v-model="date"
                :enable-time-picker="false"
                disabled
              />
            </div>
          </div>
          <div class="flex justify-between mx-3 mt-8 items-center text-center">
            <div class="font-semibold">Qarzdorliklar:</div>
            <div class="text-[red] text-xl font-bold">
              {{ numberFormat(debts.toFixed()) }} so'm
            </div>
          </div>
        </div>
        <div class="flex-1 my-4 p-2 shadow-xl border border-gray-300">
          <div class="flex justify-between mx-3 items-center my-2">
            <div class="font-semibold">Sana:</div>
            <div>
              <VueDatePicker
                class="border border-gray-500 rounded-[5px] mx-auto max-w-[80%]"
                v-model="date"
                :enable-time-picker="false"
                disabled
              />
            </div>
          </div>
          <div class="flex justify-between mx-3 mt-8 items-center text-center">
            <div class="font-semibold">Omborxona:</div>
            <div class="text-[blue] text-xl font-bold">
              {{ numberFormat(ombors.toFixed()) }} so'm
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <span class="text-2xl font-semibold">Qidiruv</span>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <div class="flex justify-around gap-[1%]">
        <USelect
          v-model="mahsulotTuri"
          class="w-full"
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
          class="w-full"
          size="xl"
          placeholder="O'lchamlari"
          :disabled="loadingSearch"
        />
        <UInput
          v-model="category"
          class="w-full"
          size="xl"
          placeholder="Kategoriyasi"
          :disabled="loadingSearch"
        />
        <UInput
          v-model="qalinligi"
          class="w-full"
          size="xl"
          placeholder="Qalinligi"
          :disabled="loadingSearch"
        />
        <div v-if="mahsulotTuri == 'Dvuxtavr'" class="w-full">
          <UInput
            v-model="qalinligi_ortasi"
            class="w-full"
            size="xl"
            placeholder="Qalinligi O'rtasi"
            :disabled="loadingSearch"
          />
        </div>
        <USelect
          v-model="holati"
          size="xl"
          class="w-full"
          :options="['Yangi', 'Eski', 'B/U']"
          placeholder="Holati"
          :disabled="loadingSearch"
        />
        <UButton size="xl" :loading="loadingSearch" @click="handleSearchItems"
          >Tasdiqlash</UButton
        >
      </div>
      <div>
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
              <td class="px-5 py-3 border-b border-gray-300">
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
              <td class="px-5 py-3 border-b border-gray-300">
                {{ item.totalUzunligi.toFixed(2) }}
                {{ item.name == "List" ? "m²" : "m" }}
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                {{ item.sklad.name }}
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <UButton
                  @click="openModal(item)"
                  :ui="{ rounded: 'rounded-xl' }"
                  class="px-3 py-2 mx-2"
                >
                  Batafsil
                </UButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <Line id="my-chart-id" :data="data" class="max-w-[100%] max-h-[477px]" />
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <Line id="my-chart-id" :data="data2" class="max-w-[100%] max-h-[477px]" />
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
                <td class="px-5 py-3 border-b border-gray-300">
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
                <td class="px-5 py-3 border-b border-gray-300">
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
                <td class="px-5 py-3 border-b border-gray-300">
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

let loading = ref(true);
let holati = ref(null);
let calculator = ref(false);
let isFullScreen = ref(false);
let mahsulotTuri = ref(null);
let date = ref(new Date());
let xarajats = ref(null);
let ombors = ref(null);
let debts = ref(null);
let foyda = ref(null);
let data = ref([]);
let data2 = ref([]);
let category = ref("");
let olchamlari = ref("");
let qalinligi = ref("");
let qalinligi_ortasi = ref("");
let loadingSearch = ref(false);
let isOpenModal = ref(false);
let fetchedProducts = ref([]);
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
let items = ref([]);
onMounted(async () => {
  try {
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    const resHarajats = await $host.get("/harajat/year");
    xarajats.value = resHarajats.data.totalAmount;
    const resOmbor = await $host.get("/sklad/price");
    ombors.value = resOmbor.data.result;
    const resDebts = await $host.get("/products/debts/price");
    debts.value = resDebts.data.result;
    const resFoyda = await $host.get("/productsYear");
    foyda.value = resFoyda.data.totalAmount;
    const resFoydaGraph = await $host.get("/productsYear/graph");
    data.value = {
      labels: resFoydaGraph.data.map(
        (item) =>
          `${padWithZero(item._id.day)}.${padWithZero(
            item._id.month
          )}.${padWithZero(item._id.year)}`
      ),
      datasets: [
        {
          label: "Foyda",
          data: resFoydaGraph.data.map((item) => item.totalAmount),
          fill: false,
          borderColor: "rgba(16, 185, 129, 1)",
          pointStyle: "star",
          pointBorderWidth: 5,
          tension: 0.1,
        },
      ],
    };
    const resHarajatsGraph = await $host.get("/harajat/graph");
    data2.value = {
      labels: resHarajatsGraph.data.map(
        (item) =>
          `${padWithZero(item._id.day)}.${padWithZero(
            item._id.month
          )}.${padWithZero(item._id.year)}`
      ),
      datasets: [
        {
          label: "Harajat",
          data: resHarajatsGraph.data.map((item) => item.totalAmount),
          fill: false,
          borderColor: "red",
          pointStyle: "star",
          pointBorderWidth: 5,
          tension: 0.1,
        },
      ],
    };
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const handleSearchItems = async () => {
  loadingSearch.value = true;
  if (mahsulotTuri.value == null) {
    return (loadingSearch.value = false);
  }
  try {
    const res = await $host.post("/products/find", {
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
    const res = await $host.post("/sklad/products", {
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
</script>
<style scoped>
.square {
  width: 230px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
.square2 {
  width: 280px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
</style>