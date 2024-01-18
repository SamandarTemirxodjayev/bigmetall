<template>
  <div v-if="!loading">
    <div>
      <span class="text-2xl font-semibold">Bosh Sahifa</span>
    </div>
    <div class="mt-4">
      <div class="flex justify-between">
        <div class="flex-1 m-4 p-2 shadow-xl border border-gray-300">
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
        <div class="flex-1 m-4 p-2 shadow-xl border border-gray-300">
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
        <div class="flex-1 m-4 p-2 shadow-xl border border-gray-300">
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
        <div class="flex-1 m-4 p-2 shadow-xl border border-gray-300">
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
let calculator = ref(false);
let isFullScreen = ref(false);
let date = ref(new Date());
let xarajats = ref(null);
let ombors = ref(null);
let debts = ref(null);
let foyda = ref(null);
let data = ref([]);
let data2 = ref([]);

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