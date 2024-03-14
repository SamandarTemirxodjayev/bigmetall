<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold">Harajatlar</span>
    </div>
    <div class="items-center bg-white shadow-xl rounded-md">
      <div class="flex p-4 justify-between">
        <div class="flex">
          <div class="mr-3 w-full">
            <UInput
              icon="i-heroicons-magnifying-glass-20-solid"
              size="xl"
              color="gray"
              :trailing="false"
              placeholder="Qidirish..."
              v-model="search"
            />
          </div>
          <div class="items-center pt-0.5 w-full">
            <VueDatePicker
              class="border border-gray-500 rounded-[5px] min-w-[350px]"
              v-model="date"
              range
              :max-date="new Date()"
              time-picker-inline
            />
          </div>
          <select
            v-model="skladSearch"
            class="ml-2 text-blue-500 border-2 border-blue-500 bg-white py-2 px-3 rounded-xl font-semibold"
          >
            <option value="">Hammasi</option>
            <option v-for="item in sklads" :key="item._id" :value="item._id">
              {{ item.name }}
            </option>
          </select>
          <UButton @click="handleSearch" class="px-3 mx-2"> Qidirish </UButton>
          <UButton @click="handleExcelDownloadByDate" class="px-3 mx-2">
            Excel
          </UButton>
        </div>
        <div class="flex">
          <div>
            <UButton @click="isPopupOpen = true" class="px-3 py-3 mx-2">
              Harajat Qo'shish
            </UButton>
            <UButton @click="handleExcelDownload" class="px-3 py-3 mx-2">
              Excel
            </UButton>
            <select
              v-model="count"
              @change="countHandleChange"
              class="ml-2 text-blue-500 border-2 border-blue-500 bg-white py-2 px-3 rounded-xl font-semibold"
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-5 py-3 text-left border-y border-gray-300">#</th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Harajat Nomi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Summasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">Ombor</th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Qo'shilgan Vaqti
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300"></th>
          </tr>
        </thead>
        <tbody v-if="harajats.length == 0">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td
              class="px-5 py-3 border-b border-gray-300 text-center"
              colspan="9"
            >
              Ma'lumot mavjud emas
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr
            v-for="(item, i) in harajats"
            :key="item._id"
            class="hover:bg-gray-200 cursor-pointer"
          >
            <td class="px-5 py-3 border-b border-gray-300 w-10 text-center">
              <div class="print-text">{{ i + 1 }}</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.name }}</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.amount.toLocaleString("en-US").replace(/,/g, " ") }}so'm
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.sklad.name }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ formatTime(item.date) }}
              </div>
            </td>
            <td
              class="px-5 py-3 border-b border-gray-300 text-right w-[10%] text-gray-400"
            >
              <div>
                <Icon
                  name="clarity:pencil-line"
                  class="mr-4 hover:text-black"
                  size="1.5rem"
                  @click="
                    handleEditHarajat(
                      item._id,
                      item.name,
                      item.amount,
                      item.sklad._id
                    )
                  "
                />
                <Icon
                  name="ant-design:delete-outlined"
                  class="hover:text-black"
                  size="1.5rem"
                  @click="handleDeleteHarajat(item._id)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <UModal v-model="isPopupOpen" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Harajat Qo'shish
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isPopupOpen = false"
            />
          </div>
        </template>

        <div>
          <form @submit="handleSubmit">
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Harajat Nomi</label
              >
              <UInput
                v-model="name"
                color="white"
                variant="outline"
                size="lg"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="quantity"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Harajat Summasi</label
              >
              <VueNumber
                v-model="amount"
                v-bind="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div class="mb-4">
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Ombor</label
              >
              <USelect
                v-model="sklad"
                :options="
                  sklads.map((item) => ({ name: item.name, id: item._id }))
                "
                value-attribute="id"
                option-attribute="name"
                size="lg"
              />
            </div>
            <div>
              <UButton type="submit" block class="px-4 py-2">
                Tasdiqlash
              </UButton>
            </div>
          </form>
        </div>
      </UCard>
    </UModal>
    <UModal v-model="isPopupEditOpen" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Harajatni Tahrirlash
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isPopupEditOpen = false"
            />
          </div>
        </template>

        <div>
          <form @submit="handleEditHarajatForm">
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Harajat Nomi</label
              >
              <UInput
                v-model="editName"
                color="white"
                variant="outline"
                size="lg"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="quantity"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Harajat Summasi</label
              >
              <VueNumber
                v-model="editAmount"
                v-bind="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div class="mb-4">
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Ombor</label
              >
              <USelect
                v-model="editSklad"
                :options="
                  sklads.map((item) => ({ name: item.name, id: item._id }))
                "
                value-attribute="id"
                option-attribute="name"
                size="lg"
              />
            </div>
            <div>
              <UButton type="submit" block class="px-4 py-2">
                Tasdiqlash
              </UButton>
            </div>
          </form>
        </div>
      </UCard>
    </UModal>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { component as VueNumber } from "@coders-tm/vue-number-format";

let isPopupOpen = ref(false);
let isPopupEditOpen = ref(false);
let loading = ref(true);
let name = ref("");
let amount = ref();
let date = ref("");
let harajats = ref({});
let search = ref("");
let editName = ref("");
let editAmount = ref("");
let harajatId = ref("");
let count = ref(0);
let sklads = ref([]);
let sklad = ref(null);
let editSklad = ref(null);
let skladSearch = ref("");
let number = ref({
  decimal: ".",
  separator: " ",
  suffix: " so'm",
  precision: 2,
  masked: false,
  min: 0,
});
onMounted(async () => {
  try {
    count.value = localStorage.getItem("count") || 100;
    const harajatRes = await $host.get("/harajat?limit=" + count.value);
    harajats.value = harajatRes.data;

    const skladsRes = await $host.get("/sklad");
    sklads.value = skladsRes.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});

const handleClosePopUpEdit = () => {
  isPopupEditOpen.value = false;
};
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    const data = {
      name: name.value,
      amount: amount.value,
      sklad: sklad.value,
    };
    await $host.put("/harajat", data);
    await Swal.fire("Saqlandi", "Muvaffiqatli saqlandi", "success");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
const handleSearch = async (e) => {
  loading.value = true;
  try {
    const searchParams = {
      search: search.value,
      sklad: skladSearch.value,
    };
    if (date.value && date.value[0]) {
      searchParams.startDate = date.value[0];
    }
    if (date.value && date.value[1]) {
      searchParams.endDate = date.value[1];
    }

    const res = await $host.post(
      "/harajat/find?limit=" + count.value,
      searchParams
    );
    harajats.value = res.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
const handleDeleteHarajat = async (_id) => {
  Swal.fire({
    title: "Haqiqatdan ham o'chirmoqchimisiz?",
    showCancelButton: true,
    confirmButtonText: "O'chirish",
    confirmButtonColor: "#D11A2A",
    cancelButtonText: "Bekor Qilish",
  }).then(async (result) => {
    if (result.isConfirmed) {
      loading.value = true;
      await $host.delete(`/harajat/${_id}`).then(async () => {
        await Swal.fire("O'chirildi", "", "success");
        window.location.reload();
      });
    }
  });
};
const handleEditHarajat = (_id, name, amount, sklad) => {
  isPopupEditOpen.value = true;
  editName.value = name;
  editAmount.value = amount;
  editSklad.value = sklad;
  harajatId.value = _id;
};
const handleEditHarajatForm = async () => {
  loading.value = true;
  try {
    await $host.patch(`/harajat/${harajatId.value}`, {
      name: editName.value,
      amount: editAmount.value,
      sklad: editSklad.value,
    });
    await Swal.fire("Saqlandi", "Muvaffiqatli saqlandi", "success");
    window.location.reload();
  } catch (error) {
    console.log(error);
    Swal.fire("Xatolik", "Xatolik", "error");
    loading.value = false;
  }
};
const countHandleChange = async () => {
  localStorage.setItem("count", count.value);
  loading.value = true;
  try {
    const res = await $host.get("/harajat?limit=" + count.value);
    harajats.value = res.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
const handleExcelDownload = async () => {
  loading.value = true;
  try {
    const res = await $host.get(`/harajat/excel`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `harajatlar-${datetime}.xlsx`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
const handleExcelDownloadByDate = async () => {
  loading.value = true;
  try {
    const res = await $host.get(`/harajat/excel-by-date`, {
      responseType: "blob",
      params: {
        startDate: date.value && date.value[0] ? date.value[0] : null,
        endDate: date.value && date.value[1] ? date.value[1] : null,
        sklad: skladSearch.value,
      },
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `harajatlar-${datetime}.xlsx`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isPopupOpen],
    handler: () => {
      isPopupOpen.value = false;
    },
  },
});
defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isPopupEditOpen],
    handler: () => {
      isPopupEditOpen.value = false;
    },
  },
});
</script>
<style scoped>
@media print {
  body * {
    visibility: hidden;
  }

  table {
    visibility: visible;
    position: absolute;
    top: 0%;
    left: 0%;
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
