<template>
  <div v-if="!loading" class="mx-5">
    <div class="my-4">
      <span class="text-2xl font-semibold">Hisobot - {{ seller.name }}</span>
    </div>
    <div class="shadow-2xl border border-gray-300 items-center">
      <div class="flex p-4 justify-between">
        <div class="flex items-center">
          <div class="items-center pt-0.5 w-full">
            <VueDatePicker
              class="border border-gray-500 rounded-[5px] min-w-[350px] -z-0"
              v-model="date"
              range
              :max-date="new Date()"
              time-picker-inline
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <div class="flex justify-between gap-[10%]">
        <div
          class="w-[50%] bg-white border border-gray-50 p-4 shadow-2xl rounded-xl"
        >
          <div class="flex gap-2 mb-5">
            <img src="/icons/line.svg" alt="" />
            <h1 class="font-[500] text-[20px] leading-7">Kirim Mahsulot</h1>
          </div>
          <div class="max-h-[200px] overflow-y-auto scrollbar pe-4">
            <div
              class="grid grid-cols-2 bg-[#F3F4F6] rounded-md p-2 my-2"
              v-for="item in came"
              :key="item._id"
            >
              <div>
                {{ padWithZero(item._id.day) }}.{{
                  padWithZero(item._id.month)
                }}.{{ padWithZero(item._id.year) }}
              </div>
              <div class="place-self-end">
                {{ numberFormat(item.totalAmount.toFixed(2)) }} so'm
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-[50%] bg-white border border-gray-50 p-4 shadow-2xl rounded-xl"
        >
          <div class="flex gap-2 mb-5">
            <img src="/icons/profit.svg" alt="" />
            <h1 class="font-[500] text-[20px] leading-7">Foyda</h1>
          </div>
          <div class="max-h-[200px] overflow-y-auto scrollbar pe-4">
            <div
              class="grid grid-cols-2 bg-[#F3F4F6] rounded-md p-2 my-2"
              v-for="item in saleds"
              :key="item._id"
            >
              <div>
                {{ padWithZero(item._id.day) }}.{{
                  padWithZero(item._id.month)
                }}.{{ padWithZero(item._id.year) }}
              </div>
              <div class="place-self-end">
                {{ numberFormat(item.totalAmount.toFixed(2)) }} so'm
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-between gap-[10%] mt-5">
        <div
          class="w-[50%] bg-white border border-gray-50 p-4 shadow-2xl rounded-xl text-[#196DF4] font-[500] text-xl"
        >
          <div class="grid grid-cols-2 p-2 my-2">
            <div>Umumiy:</div>
            <div class="place-self-end">
              {{ numberFormat(cameSummary.toFixed(2)) }} so'm
            </div>
          </div>
        </div>
        <div
          class="w-[50%] bg-white border border-gray-50 p-4 shadow-2xl rounded-xl text-[#40DE50] font-[500] text-xl"
        >
          <div class="grid grid-cols-2 p-2 my-2">
            <div>Umumiy:</div>
            <div class="place-self-end">
              {{ numberFormat(foydaSummary.toFixed(2)) }} so'm
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <Line id="my-chart-id" :data="data" class="max-w-[100%] max-h-[477px]" />
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <Line id="my-chart-id" :data="data2" class="max-w-[100%] max-h-[477px]" />
    </div>
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
let seller = ref(null);
let saleds = ref();
let date = ref([]);
let came = ref(null);
let foydaSummary = ref(0);
let cameSummary = ref(0);
let data = ref(null);
let data2 = ref(null);

const route = useRoute();

onMounted(async () => {
  const res = await $host.get("/seller/" + route.params.id);
  seller.value = res.data;
  const endDate = new Date();
  const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
  date.value = [startDate, endDate];
  const datas = await $host.post("/seller/" + route.params.id + "/results", {
    startDate: startDate,
    endDate: endDate,
  });
  saleds.value = datas.data.sales;
  for (const key in saleds.value) {
    foydaSummary.value += saleds.value[key].totalAmount;
  }
  came.value = datas.data.came;
  for (const key in came.value) {
    cameSummary.value += came.value[key].totalAmount;
  }
  data.value = {
    labels: came.value.map(
      (item) =>
        `${padWithZero(item._id.day)}.${padWithZero(
          item._id.month
        )}.${padWithZero(item._id.year)}`
    ),
    datasets: [
      {
        label: "Kirim Mahsulot",
        data: came.value.map((item) => item.totalAmount),
        fill: false,
        borderColor: "rgba(16, 185, 129, 1)",
        pointStyle: "star",
        pointBorderWidth: 5,
        tension: 0.1,
      },
    ],
  };
  data2.value = {
    labels: came.value.map(
      (item) =>
        `${padWithZero(item._id.day)}.${padWithZero(
          item._id.month
        )}.${padWithZero(item._id.year)}`
    ),
    datasets: [
      {
        label: "Kirim Mahsulot",
        data: came.value.map((item) => item.totalAmount),
        fill: false,
        borderColor: "rgba(239, 68, 68, 1)",
        pointStyle: "star",
        pointBorderWidth: 5,
        tension: 0.1,
      },
    ],
  };
  loading.value = false;
});
watch(date, async () => {
  loading.value = true;
  try {
    const datas = await $host.post("/seller/" + route.params.id + "/results", {
      startDate: date.value && date.value[0] ? date.value[0] : null,
      endDate: date.value && date.value[1] ? date.value[1] : null,
    });
    saleds.value = datas.data.sales;
    foydaSummary.value = 0;
    for (const key in saleds.value) {
      foydaSummary.value += saleds.value[key].totalAmount;
    }
    came.value = datas.data.came;
    cameSummary.value = 0;
    for (const key in came.value) {
      cameSummary.value += came.value[key].totalAmount;
    }
    data.value = {
      labels: came.value.map(
        (item) =>
          `${padWithZero(item._id.day)}.${padWithZero(
            item._id.month
          )}.${padWithZero(item._id.year)}`
      ),
      datasets: [
        {
          label: "Kirim Mahsulot",
          data: came.value.map((item) => item.totalAmount),
          fill: false,
          borderColor: "#196DF4",
          pointStyle: "star",
          pointBorderWidth: 5,
          tension: 0.1,
        },
      ],
    };
    data2.value = {
      labels: saleds.value.map(
        (item) =>
          `${padWithZero(item._id.day)}.${padWithZero(
            item._id.month
          )}.${padWithZero(item._id.year)}`
      ),
      datasets: [
        {
          label: "Foyda",
          data: saleds.value.map((item) => item.totalAmount),
          fill: false,
          borderColor: "#40DE50",
          pointStyle: "star",
          pointBorderWidth: 5,
          tension: 0.1,
        },
      ],
    };
  } catch (error) {
    return console.log(error);
  }
  loading.value = false;
});
</script>
<style scoped>
.scrollbar::-webkit-scrollbar-thumb {
  background: #196df4;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 3px;
  background-color: #fff;
}
</style>