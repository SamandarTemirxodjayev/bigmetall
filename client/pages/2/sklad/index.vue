<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold">Omborlar ro‘yxati</span>
    </div>
    <div class="items-center bg-white shadow-xl rounded-md">
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
        </div>
      </div>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-5 py-3 text-left border-y border-gray-300">#</th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Ombor Nomi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Yaratilgan Vaqti
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Ma'lomutlar
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in filteredSklads"
            :key="item._id"
            class="hover:bg-gray-200 cursor-pointer"
          >
            <td class="px-5 py-3 border-b border-gray-300 w-10 text-center">
              <div class="print-text">{{ i + 1 }}</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <NuxtLink :to="`/2/sklad/${item._id}`">
                <div class="print-text">{{ item.name }}</div>
              </NuxtLink>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <NuxtLink :to="`/2/sklad/${item._id}`">
                <div class="print-text">
                  {{ formatTime(item.date) }}
                </div>
              </NuxtLink>
            </td>
            <td
              class="px-5 py-3 border-b border-gray-300 text-right w-[10%] text-gray-500"
            >
              <div>
                <Icon
                  name="clarity:pencil-line"
                  class="mr-4 hover:text-black print-text"
                  size="1.5rem"
                  @click="handleEditOmborv(item._id, item.name)"
                />
                <Icon
                  name="ant-design:delete-outlined"
                  class="hover:text-black print-text"
                  size="1.5rem"
                  @click="handleDeleteOmbor(item._id)"
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
          @click="() => (isPopupOpen = false)"
          class="relative -top-8 -right-8 float-right text-gray-500 hover:text-gray-700"
        >
          <Icon name="material-symbols:close" width="25" height="25" />
        </button>

        <div>
          <form @submit="handleAddOmbor">
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Ombor Nomi</label
              >
              <input
                v-model="name"
                type="text"
                required
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
      v-if="isPopupOpenEdit"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-25"
    >
      <div class="bg-white p-10 rounded-md shadow-lg w-[400px]">
        <button
          @click="() => (isPopupOpenEdit = false)"
          class="relative -top-8 -right-8 float-right text-gray-500 hover:text-gray-700"
        >
          <Icon name="material-symbols:close" width="25" height="25" />
        </button>

        <div>
          <form @submit="handleEditOmbor">
            <div class="mb-4">
              <label
                for="editName"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Ombor Nomi</label
              >
              <input
                v-model="editName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                autofocus
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
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

let loading = ref(true);
let isPopupOpen = ref(false);
let isPopupOpenEdit = ref(false);
let editName = ref("");
let editId = ref("");
let sklads = ref();
let search = ref("");
let name = ref("");

onMounted(async () => {
  try {
    const res = await $host2.get("/user");
    if (res.data.user.user_level != 2) {
      window.location.href = "/";
    }
    const resSklad = await $host2.get("/sklad");
    sklads.value = resSklad.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const handleEditOmborv = (id, name) => {
  isPopupOpenEdit.value = true;
  editName.value = name;
  editId.value = id;
};
const handleAddOmbor = async () => {
  loading.value = true;
  try {
    await $host2.put("/sklad", {
      name: name.value,
    });
    await Swal.fire("Ombor", "Muvaffiqatli yaratildi", "success");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
const handleDeleteOmbor = async (_id) => {
  Swal.fire({
    title: "Haqiqatdan ham o'chirmoqchimisiz?",
    showCancelButton: true,
    confirmButtonText: "O'chirish",
    confirmButtonColor: "#D11A2A",
    cancelButtonText: "Bekor Qilish",
  }).then(async (result) => {
    if (result.isConfirmed) {
      loading.value = true;
      await $host2.delete(`/sklad/${_id}`).then(async () => {
        await Swal.fire("O'chirildi", "", "success");
        window.location.reload();
      });
    }
  });
};
const handleEditOmbor = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $host2.patch(`/sklad/${editId.value}`, {
      name: editName.value,
    });
    await Swal.fire("Ombor", "Muvaffiqatli o'zgartirildi", "success");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
let filteredSklads = computed(() => {
  if (!search.value) return sklads.value;
  return sklads.value.filter((sklad) =>
    sklad.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
definePageMeta({
  layout: "user2",
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