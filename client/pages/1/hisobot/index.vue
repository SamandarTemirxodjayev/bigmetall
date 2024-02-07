<template>
  <div v-if="!loading" class="">
    <div>
      <span class="text-2xl font-semibold">Hisobot</span>
    </div>
    <div class="shadow-2xl border border-gray-300 items-center">
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
          <USelect
            v-model="ombor"
            size="lg"
            class="min-w-[350px]"
            :options="
              [{ name: 'Hammasi', id: null }].concat(
                ombors.map((item) => ({
                  name: item.name,
                  id: item._id,
                }))
              )
            "
            value-attribute="id"
            option-attribute="name"
            required
          />
          <UButton size="lg" @click="handleSearch"> Qidirish </UButton>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <div class="flex gap-[1%] font-[500]">
        <div
          @click="clickOne"
          class="w-[15%] bg-white border-t border-x border-gray-50 p-4 cursor-pointer rounded-t-xl"
        >
          <div
            class="flex gap-[5%]"
            :class="[
              button == 1 ? `text-blue-500 ` : 'grayscale text-[#ABB1BD]',
            ]"
          >
            <img src="/icons/kirim.svg" alt="" />
            <div>Kirim Tushumi</div>
          </div>
        </div>
        <div
          @click="clickTwo"
          class="w-[15%] bg-white border-t border-x border-gray-50 p-4 rounded-t-xl cursor-pointer"
        >
          <div
            class="flex gap-[5%]"
            :class="[
              button == 2 ? `text-blue-500 ` : 'grayscale text-[#ABB1BD]',
            ]"
          >
            <img src="/icons/savdo.svg" alt="" class="" />
            <div>Savdo Tushumi</div>
          </div>
        </div>
        <div
          @click="clickThree"
          class="w-[15%] bg-white border border-x border-gray-50 p-4 rounded-t-xl cursor-pointer"
        >
          <div
            class="flex gap-[5%]"
            :class="[
              button == 3 ? `text-blue-500 ` : 'grayscale text-[#ABB1BD]',
            ]"
          >
            <img src="/icons/harajat.svg" alt="" />
            <div>Operatsion Harajat</div>
          </div>
        </div>
        <div
          @click="clickFour"
          class="w-[15%] bg-white border border-x border-gray-50 p-4 rounded-t-xl cursor-pointer"
        >
          <div
            class="flex gap-[5%]"
            :class="[
              button == 4 ? `text-blue-500 ` : 'grayscale text-[#ABB1BD]',
            ]"
          >
            <img src="/icons/savdofoyda.svg" alt="" />
            <div>Savdo Foydasi</div>
          </div>
        </div>
        <div
          @click="clickFive"
          class="w-[15%] bg-white border border-x border-gray-50 p-4 rounded-t-xl cursor-pointer"
        >
          <div
            class="flex gap-[5%]"
            :class="[
              button == 5 ? `text-blue-500 ` : 'grayscale text-[#ABB1BD]',
            ]"
          >
            <img src="/icons/soffoyda.svg" alt="" />
            <div>Sof Foyda</div>
          </div>
        </div>
      </div>
      <div
        :class="[
          isActive
            ? `transition duration-[500] ease-in w-[15%] bg-white p-4 ${classObject}`
            : '',
        ]"
      ></div>
      <div
        class="w-full bg-white border border-gray-50 p-4 flex justify-around"
      >
        <div
          class="w-[40%] h-[300px] max-h-[300px] overflow-y-auto scrollbar pe-4"
        >
          <div
            class="grid grid-cols-2 bg-[#F3F4F6] rounded-md p-2 my-2"
            v-for="item in fetchItems"
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
        <div class="w-[40%] bg-[#F3F4F6] rounded-xl">
          <div class="p-4 font-[500] text-[24px] text-[#437DEB]">Umumiy:</div>
          <div
            class="-m-16 flex items-center justify-center text-[#437DEB] text-[42px] font-[500] h-full"
          >
            {{ numberFormat(fetchSummary.toFixed(2)) }} so'm
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <Line id="my-chart-id" :data="data5" class="max-w-[100%] max-h-[477px]" />
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <Line id="my-chart-id" :data="data" class="max-w-[100%] max-h-[477px]" />
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <Line id="my-chart-id" :data="data2" class="max-w-[100%] max-h-[477px]" />
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <Line id="my-chart-id" :data="data3" class="max-w-[100%] max-h-[477px]" />
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <Line id="my-chart-id" :data="data4" class="max-w-[100%] max-h-[477px]" />
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
let date = ref([]);
let savdoTushumi = ref([]);
let savdoTushumiSummary = ref(0);
let harajat = ref([]);
let harajatSummary = ref(0);
let foyda = ref([]);
let foydaSummary = ref(0);
let sofFoyda = ref([]);
let sofFoydaSummary = ref(0);
let kirimTushumi = ref([]);
let kirimTushumiSummary = ref(0);
let data = ref(null);
let data2 = ref(null);
let data3 = ref(null);
let data4 = ref(null);
let data5 = ref(null);
let isActive = ref(true);
let classObject = ref("");
let button = ref(1);
let fetchSummary = ref(0);
let fetchItems = ref([]);
let ombor = ref("Hammasi");
let ombors = ref([]);

const clickOne = () => {
  isActive.value = true;
  button.value = 1;
  classObject.value = "translate-x-0";
  fetchItems.value = kirimTushumi.value;
  fetchSummary.value = kirimTushumiSummary.value;
};
const clickTwo = () => {
  isActive.value = true;
  button.value = 2;
  classObject.value = "translate-x-[106.5%]";
  fetchItems.value = savdoTushumi.value;
  fetchSummary.value = savdoTushumiSummary.value;
};
const clickThree = () => {
  isActive.value = true;
  button.value = 3;
  classObject.value = "translate-x-[213.5%]";
  fetchItems.value = harajat.value;
  fetchSummary.value = harajatSummary.value;
};
const clickFour = () => {
  isActive.value = true;
  button.value = 4;
  classObject.value = "translate-x-[320%]";
  fetchItems.value = foyda.value;
  fetchSummary.value = foydaSummary.value;
};
const clickFive = () => {
  isActive.value = true;
  button.value = 5;
  classObject.value = "translate-x-[427%]";
  fetchItems.value = sofFoyda.value;
  fetchSummary.value = sofFoydaSummary.value;
};

onMounted(async () => {
  try {
    const resOmbor = await $host.get("/sklad");
    ombors.value = resOmbor.data;
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
    date.value = [startDate, endDate];
    const resHisobot = await $host.post("/hisobot", {
      startDate,
      endDate,
      sklad: ombor.value,
    });
    harajat.value = resHisobot.data.harajat;
    for (const key in harajat.value) {
      harajatSummary.value += harajat.value[key].totalAmount;
    }
    data2.value = {
      labels: harajat.value.map(
        (item) =>
          `${padWithZero(item._id.day)}.${padWithZero(
            item._id.month
          )}.${padWithZero(item._id.year)}`
      ),
      datasets: [
        {
          label: "Operatsion Harajat",
          data: harajat.value.map((item) => item.totalAmount),
          fill: false,
          borderColor: "#FA9804",
          pointStyle: "star",
          pointBorderWidth: 5,
          tension: 0.1,
        },
      ],
    };
    foyda.value = resHisobot.data.foyda;
    for (const key in foyda.value) {
      foydaSummary.value += foyda.value[key].totalAmount;
    }
    data3.value = {
      labels: foyda.value.map(
        (item) =>
          `${padWithZero(item._id.day)}.${padWithZero(
            item._id.month
          )}.${padWithZero(item._id.year)}`
      ),
      datasets: [
        {
          label: "Savdo Operatsiyalaridan Qolgan Foyda",
          data: foyda.value.map((item) => item.totalAmount),
          fill: false,
          borderColor: "#FA9804",
          pointStyle: "star",
          pointBorderWidth: 5,
          tension: 0.1,
        },
      ],
    };
    savdoTushumi.value = resHisobot.data.savdoTushumi;
    for (const key in savdoTushumi.value) {
      savdoTushumiSummary.value += savdoTushumi.value[key].totalAmount;
    }
    data.value = {
      labels: savdoTushumi.value.map(
        (item) =>
          `${padWithZero(item._id.day)}.${padWithZero(
            item._id.month
          )}.${padWithZero(item._id.year)}`
      ),
      datasets: [
        {
          label: "Savdo Tushumi",
          data: savdoTushumi.value.map((item) => item.totalAmount),
          fill: false,
          borderColor: "#DC2F02",
          pointStyle: "star",
          pointBorderWidth: 5,
          tension: 0.1,
        },
      ],
    };
    sofFoyda.value = resHisobot.data.sofFoyda;
    for (const key in sofFoyda.value) {
      sofFoydaSummary.value += sofFoyda.value[key].totalAmount;
    }
    data4.value = {
      labels: sofFoyda.value.map(
        (item) =>
          `${padWithZero(item._id.day)}.${padWithZero(
            item._id.month
          )}.${padWithZero(item._id.year)}`
      ),
      datasets: [
        {
          label: "Sof Foyda",
          data: sofFoyda.value.map((item) => item.totalAmount),
          fill: false,
          borderColor: "#40DE50",
          pointStyle: "star",
          pointBorderWidth: 5,
          tension: 0.1,
        },
      ],
    };
    kirimTushumi.value = resHisobot.data.kirimTushumi;
    for (const key in kirimTushumi.value) {
      kirimTushumiSummary.value += kirimTushumi.value[key].totalAmount;
    }
    data5.value = {
      labels: kirimTushumi.value.map(
        (item) =>
          `${padWithZero(item._id.day)}.${padWithZero(
            item._id.month
          )}.${padWithZero(item._id.year)}`
      ),
      datasets: [
        {
          label: "Kirim Tushumi",
          data: kirimTushumi.value.map((item) => item.totalAmount),
          fill: false,
          borderColor: "#40DE50",
          pointStyle: "star",
          pointBorderWidth: 5,
          tension: 0.1,
        },
      ],
    };
    fetchItems.value = kirimTushumi.value;
    fetchSummary.value = kirimTushumiSummary.value;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const handleSearch = async () => {
  loading.value = true;
  const startDate = date.value && date.value[0] ? date.value[0] : null;
  const endDate = date.value && date.value[1] ? date.value[1] : null;
  const resHisobot = await $host.post("/hisobot", {
    startDate,
    endDate,
    sklad: ombor.value,
  });
  harajat.value = resHisobot.data.harajat;
  harajatSummary.value = 0;
  for (const key in harajat.value) {
    harajatSummary.value += harajat.value[key].totalAmount;
  }
  data2.value = {
    labels: harajat.value.map(
      (item) =>
        `${padWithZero(item._id.day)}.${padWithZero(
          item._id.month
        )}.${padWithZero(item._id.year)}`
    ),
    datasets: [
      {
        label: "Operatsion Harajat",
        data: harajat.value.map((item) => item.totalAmount),
        fill: false,
        borderColor: "#FA9804",
        pointStyle: "star",
        pointBorderWidth: 5,
        tension: 0.1,
      },
    ],
  };
  foyda.value = resHisobot.data.foyda;
  foydaSummary.value = 0;
  for (const key in foyda.value) {
    foydaSummary.value += foyda.value[key].totalAmount;
  }
  data3.value = {
    labels: foyda.value.map(
      (item) =>
        `${padWithZero(item._id.day)}.${padWithZero(
          item._id.month
        )}.${padWithZero(item._id.year)}`
    ),
    datasets: [
      {
        label: "Savdo Operatsiyalaridan Qolgan Foyda",
        data: foyda.value.map((item) => item.totalAmount),
        fill: false,
        borderColor: "#FA9804",
        pointStyle: "star",
        pointBorderWidth: 5,
        tension: 0.1,
      },
    ],
  };
  savdoTushumi.value = resHisobot.data.savdoTushumi;
  savdoTushumiSummary.value = 0;
  for (const key in savdoTushumi.value) {
    savdoTushumiSummary.value += savdoTushumi.value[key].totalAmount;
  }
  data.value = {
    labels: savdoTushumi.value.map(
      (item) =>
        `${padWithZero(item._id.day)}.${padWithZero(
          item._id.month
        )}.${padWithZero(item._id.year)}`
    ),
    datasets: [
      {
        label: "Savdo Tushumi",
        data: savdoTushumi.value.map((item) => item.totalAmount),
        fill: false,
        borderColor: "#DC2F02",
        pointStyle: "star",
        pointBorderWidth: 5,
        tension: 0.1,
      },
    ],
  };
  sofFoyda.value = resHisobot.data.sofFoyda;
  sofFoydaSummary.value = 0;
  for (const key in sofFoyda.value) {
    sofFoydaSummary.value += sofFoyda.value[key].totalAmount;
  }
  data4.value = {
    labels: sofFoyda.value.map(
      (item) =>
        `${padWithZero(item._id.day)}.${padWithZero(
          item._id.month
        )}.${padWithZero(item._id.year)}`
    ),
    datasets: [
      {
        label: "Sof Foyda",
        data: sofFoyda.value.map((item) => item.totalAmount),
        fill: false,
        borderColor: "#40DE50",
        pointStyle: "star",
        pointBorderWidth: 5,
        tension: 0.1,
      },
    ],
  };
  kirimTushumi.value = resHisobot.data.kirimTushumi;
  kirimTushumiSummary.value = 0;
  for (const key in kirimTushumi.value) {
    kirimTushumiSummary.value += kirimTushumi.value[key].totalAmount;
  }
  data5.value = {
    labels: kirimTushumi.value.map(
      (item) =>
        `${padWithZero(item._id.day)}.${padWithZero(
          item._id.month
        )}.${padWithZero(item._id.year)}`
    ),
    datasets: [
      {
        label: "Kirim Tushumi",
        data: kirimTushumi.value.map((item) => item.totalAmount),
        fill: false,
        borderColor: "#40DE50",
        pointStyle: "star",
        pointBorderWidth: 5,
        tension: 0.1,
      },
    ],
  };
  clickOne();
  loading.value = false;
};

const showBottomElement = ref(false);
const moveElementToBottom = () => {
  showBottomElement.value = true;
};
</script>
<style scoped>
.svg {
  filter: grayscale(100%);
}
</style>