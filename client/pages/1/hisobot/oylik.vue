<template>
  <div v-if="!loading">
    <SidebarAdmin>
      <div class="flex items-center">
        <div class="mx-16 max-w-sm">
          <label
            for="large"
            class="block mb-2 text-base font-medium text-gray-900"
            >Yilni tanglang</label
          >
          <select
            v-model="selectedYear"
            id="large"
            class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          >
            <option v-for="item in 10" :key="item" :value="item + 2021">
              {{ item + 2021 }}
            </option>
          </select>
        </div>
        <div class="mx-16 max-w-sm">
          <label
            for="large"
            class="block mb-2 text-base font-medium text-gray-900"
            >Oyni tanglang</label
          >
          <select
            v-model="selectedMoths"
            id="large"
            class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          >
            <option v-for="(item, i) in labels" :key="item" :value="i + 1">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="px-2 py-3 mt-8 bg-blue-500 text-white rounded-lg">
          <button>Tasdiqlash</button>
        </div>
      </div>
      <div class="mx-10 my-8">
        <div class="font-semibold ml-10">1yil davomidagi hisobot (so'm)</div>
        <Line
          id="my-chart-id"
          :data="dataForLineHarajat"
          class="max-w-[100%] max-h-[477px]"
        />
        <div class="flex mx-5">
          <table class="w-full">
            <thead>
              <tr>
                <th
                  colspan="2"
                  class="px-5 py-3 text-left border border-black text-center bg-red-500"
                >
                  Harajatlar
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="hover:bg-gray-200 cursor-pointer"
                v-for="(item, i) in labels"
                :key="i"
              >
                <td class="px-5 py-3 border border-black">{{ item }}</td>
                <td class="px-5 py-3 border border-black">
                  <div>{{ datas[i + 1].toFixed(2) }}so'm</div>
                </td>
              </tr>
              <tr class="hover:bg-gray-200 cursor-pointer font-bold">
                <td class="px-5 py-3 border border-black bg-yellow-300">
                  Umumiy:
                </td>
                <td class="px-5 py-3 border border-black bg-yellow-300">
                  <div>{{ harajatSummary.toFixed(2) }}so'm</div>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="w-full mx-10">
            <thead>
              <tr>
                <th
                  colspan="2"
                  class="px-5 py-3 text-left border border-black text-center bg-green-500"
                >
                  Прибыл
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="hover:bg-gray-200 cursor-pointer"
                v-for="(item, i) in labels"
                :key="i"
              >
                <td class="px-5 py-3 border border-black">{{ item }}</td>
                <td class="px-5 py-3 border border-black">
                  <div>0so'm</div>
                </td>
              </tr>
              <tr class="hover:bg-gray-200 cursor-pointer font-bold">
                <td class="px-5 py-3 border border-black bg-yellow-300">
                  Итого:
                </td>
                <td class="px-5 py-3 border border-black bg-yellow-300">
                  <div>0so'm</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="justify-center flex">
          <table class="w-[50%] my-5 mx-5">
            <thead>
              <tr>
                <th
                  colspan="2"
                  class="px-5 py-3 text-left border border-black text-center bg-blue-500"
                >
                  Отчет
                </th>
              </tr>
            </thead>
            <tbody class="font-semibold">
              <tr class="hover:bg-gray-200 cursor-pointer">
                <td class="px-5 py-3 border border-black bg-green-500">
                  Прибыл:
                </td>
                <td class="px-5 py-3 border border-black bg-green-500">
                  <div>0so'm</div>
                </td>
              </tr>
              <tr class="hover:bg-gray-200 cursor-pointer">
                <td class="px-5 py-3 border border-black bg-red-500">
                  Harajatlar:
                </td>
                <td class="px-5 py-3 border border-black bg-red-500">
                  <div>{{ harajatSummary.toFixed(2) }}so'm</div>
                </td>
              </tr>
              <tr class="hover:bg-gray-200 cursor-pointer font-bold">
                <td
                  colspan="2"
                  class="px-5 py-3 border border-black bg-yellow-300"
                >
                  <div class="text-center">Итого: 0so'm</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SidebarAdmin>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
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
const datas = ref();
let dataForLineHarajat = ref();
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
let selectedYear = ref(new Date().getFullYear());
let selectedMoths = ref(new Date().getMonth() + 1);
let loading = ref(true);
const labels = ref([
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
]);
let harajatSummary = ref(0);

onMounted(async () => {
  const ress = await $host.get("/user");
  if (ress.data.user.user_level != 1) {
    window.location.href = "/";
  }
  try {
    const res = await $host.post("/filter/harajat", {
      year: selectedYear.value,
    });
    datas.value = res.data.monthlySummary;
    for (const key in datas.value) {
      harajatSummary.value += datas.value[key];
    }
    const monthLabelss = Array.from({ length: 12 }, (_, i) => i + 1);

    dataForLineHarajat.value = {
      labels: labels.value,
      datasets: [
        {
          label: "Xarajatlar",
          data: monthLabelss.map((month) => datas.value[month] || 0),
          fill: false,
          borderColor: "rgba(239, 68, 68, 1)",
          pointStyle: "star",
          pointBorderWidth: "5",
          tension: 0.1,
        },
        {
          label: "Foyda",
          data: monthLabelss.map((month) => datas.value[month] || 0),
          fill: false,
          borderColor: "rgb(50,205,50)",
          pointStyle: "star",
          pointBorderWidth: "5",
          tension: 0.1,
        },
      ],
    };
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const changeYear = async () => {
  harajatSummary.value = 0;
  loading.value = true;
  try {
    const res = await $host.post("/filter/harajat", {
      year: selectedYear.value,
    });
    datas.value = res.data.monthlySummary;
    for (const key in datas.value) {
      harajatSummary.value += datas.value[key];
    }
    const monthLabelss = Array.from({ length: 12 }, (_, i) => i + 1);

    dataForLineHarajat.value = {
      labels: labels.value,
      datasets: [
        {
          label: "Xarajatlar",
          data: monthLabelss.map((month) => datas.value[month] || 0),
          fill: false,
          borderColor: "rgba(239, 68, 68, 1)",
          pointStyle: "star",
          pointBorderWidth: "5",
          tension: 0.1,
        },
        {
          label: "Foyda",
          data: monthLabelss.map((month) => datas.value[month] || 0),
          fill: false,
          borderColor: "rgb(50,205,50)",
          pointStyle: "star",
          pointBorderWidth: "5",
          tension: 0.1,
        },
      ],
    };
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
</script>