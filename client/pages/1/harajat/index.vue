<template>
  <div v-if="!loading">
    <NewLayout>
      <div class="mb-2">
        <span class="text-2xl font-semibold">Harajatlar</span>
      </div>
      <div class="shadow items-center bg-white shadow-xl rounded-md">
        <div class="flex p-4 justify-between">
          <div class="flex">
            <div
              class="flex items-center border border-gray-500 rounded-lg px-2 mr-3"
            >
              <input
                type="text"
                class="text-gray-900 text-sm block w-full p-2.5 outline-none"
                placeholder="Qidiruv"
                v-model="search"
              />
              <div class="text-gray-500">
                <Icon name="iconamoon:search-thin" size="1.5rem" />
              </div>
            </div>
            <div class="flex items-center">
              <input
                type="date"
                v-model="startDate"
                class="border border-gray-400 rounded-md p-2"
              />
              <div class="mx-3">-</div>
              <input
                type="date"
                v-model="endDate"
                class="border border-gray-400 rounded-md p-2"
              />
            </div>
            <button
              @click="handleSearch"
              class="bg-blue-500 text-white font-semibold rounded-xl px-3 mx-2"
            >
              Qidirish
            </button>
            <button
              @click="clearSearch"
              class="bg-white text-blue-500 border border-2 border-blue-500 font-semibold rounded-xl px-3 mx-2"
            >
              Tozalash
            </button>
          </div>
          <div>
            <div>
              <button
                @click="handlePopUp"
                class="mx-2 text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-xl font-semibold"
              >
                Harajat Qo'shish
              </button>
              <button
                @click="handleExcelDownload"
                class="mx-2 text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-xl font-semibold"
              >
                Excel
              </button>
              <select
                v-model="count"
                @change="countHandleChange"
                class="ml-2 text-blue-500 border border-2 border-blue-500 bg-white py-2 px-3 rounded-xl font-semibold"
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
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Sanasi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Vaqti
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300"></th>
            </tr>
          </thead>
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
                  {{
                    item.amount.toLocaleString("en-US").replace(/,/g, " ")
                  }}so'm
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{
                    `${padWithZero(item.date.day)}.${padWithZero(
                      item.date.month
                    )}.${padWithZero(item.date.year)}`
                  }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{
                    `${padWithZero(item.time.hour)}:${padWithZero(
                      item.time.minute
                    )}:${padWithZero(item.time.second)}`
                  }}
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
                    @click="handleEditHarajat(item._id, item.name, item.amount)"
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
      <div
        v-if="isPopupOpen"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-25"
      >
        <div class="bg-white p-10 rounded-md shadow-lg w-[400px]">
          <button
            @click="handleClosePopUp"
            class="relative -top-8 -right-8 float-right text-gray-500 hover:text-gray-700"
          >
            <Icon name="material-symbols:close" width="25" height="25" />
          </button>

          <div>
            <form @submit="handleSubmit">
              <div class="mb-4">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-700"
                >
                  Harajat Nomi</label
                >
                <input
                  v-model="name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div class="mb-4">
                <label
                  for="quantity"
                  class="block mb-2 text-sm font-medium text-gray-700"
                >
                  Harajat Summasi</label
                >
                <input
                  v-model="amount"
                  required
                  step="0.01"
                  type="number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        v-if="isPopupEditOpen"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-25"
      >
        <div class="bg-white p-10 rounded-md shadow-lg w-[400px]">
          <button
            @click="handleClosePopUpEdit"
            class="relative -top-8 -right-8 float-right text-gray-500 hover:text-gray-700"
          >
            <Icon name="material-symbols:close" width="25" height="25" />
          </button>

          <div>
            <form @submit="handleEditHarajatForm">
              <div class="mb-4">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-700"
                >
                  Harajat Nomi</label
                >
                <input
                  v-model="editName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div class="mb-4">
                <label
                  for="quantity"
                  class="block mb-2 text-sm font-medium text-gray-700"
                >
                  Harajat Summasi</label
                >
                <input
                  v-model="editAmount"
                  required
                  step="0.01"
                  type="number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Tasdiqlash
                </button>
              </div>
            </form>
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
let startDate = ref(null);
let endDate = ref(null);
let count = ref(0);
onMounted(async () => {
  try {
    count.value = localStorage.getItem("count") || 100;
    const res = await $host.get("/user");
    if (res.data.user.user_level !== 1) {
      window.location.href = "/";
    }
    const harajatRes = await $host.get("/harajat?limit=" + count.value);
    harajats.value = harajatRes.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});

const handlePopUp = () => {
  isPopupOpen.value = true;
};
const handleClosePopUp = () => {
  isPopupOpen.value = false;
};
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
    const parts = startDate.value ? startDate.value.split("-") : [];
    const partsend = endDate.value ? endDate.value.split("-") : [];

    const searchParams = {
      search: search.value,
    };

    if (parts.length === 3 || partsend.length === 3) {
      searchParams.startDate = {
        year: parseInt(parts[0]),
        month: parseInt(parts[1]),
        day: parseInt(parts[2]),
      };
      searchParams.endDate = {
        year: parseInt(partsend[0]),
        month: parseInt(partsend[1]),
        day: parseInt(partsend[2]),
      };
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
const handleEditHarajat = (_id, name, amount) => {
  isPopupEditOpen.value = true;
  editName.value = name;
  editAmount.value = amount;
  harajatId.value = _id;
};
const handleEditHarajatForm = async () => {
  loading.value = true;
  try {
    await $host.patch(`/harajat/${harajatId.value}`, {
      name: editName.value,
      amount: editAmount.value,
    });
    await Swal.fire("Saqlandi", "Muvaffiqatli saqlandi", "success");
    window.location.reload();
  } catch (error) {
    console.log(error);
    Swal.fire("Xatolik", "Xatolik", "error");
    loading.value = false;
  }
};
const clearSearch = () => {
  search.value = "";
  startDate.value = null;
  endDate.value = null;
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
