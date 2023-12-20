<template>
  <div v-if="!loading">
    <NewLayout>
      <div class="my-4">
        <span class="text-2xl font-semibold">Sotuvchilar</span>
      </div>
      <div class="shadow-2xl border border-gray-300 items-center">
        <div class="flex p-4 justify-between">
          <div
            class="flex items-center border border-gray-500 rounded-lg px-2 bg-white"
          >
            <input
              type="text"
              v-model="search"
              id="first_name"
              class="text-gray-900 text-sm block w-full p-2.5 outline-none"
              placeholder="Qidiruv"
            />
            <div class="text-gray-500">
              <Icon name="iconamoon:search-thin" size="1.5rem" />
            </div>
          </div>
          <div>
            <div>
              <button
                @click="() => (isPopupOpen = true)"
                class="mx-2 text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-xl font-semibold"
              >
                Sotuvchi Qo'shish
              </button>
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
                Sotuvchi Ismi
              </th>
              <th class="px-5 py-2 text-left border-y border-gray-300">
                Telefon Raqami
              </th>
              <th class="px-5 py-2 text-left border-y border-gray-300">
                Ma'lumotlar
              </th>
              <th class="px-5 py-2 text-left border-y border-gray-300">
                Tizimga Kiritilgan Vaqti
              </th>
              <th class="px-5 py-2 text-left border-y border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in filteredClients"
              :key="item._id"
              class="hover:bg-gray-200 cursor-pointer"
            >
              <td class="px-5 py-3 border-b border-gray-300 w-10 text-center">
                <NuxtLink :to="`/1/clients/${item._id}`">
                  <div class="print-text">{{ i + 1 }}</div>
                </NuxtLink>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <NuxtLink :to="`/1/clients/${item._id}`">
                  <div class="print-text">{{ item.name }}</div>
                </NuxtLink>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <NuxtLink :to="`/1/clients/${item._id}`">
                  <div class="print-text">{{ item.phone }}</div>
                </NuxtLink>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text flex items-center">
                  <NuxtLink :to="`/1/sellers/products/${item._id}`">
                    <button
                      class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      <span
                        class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0"
                      >
                        Sotilgan Mahsulotlar
                      </span>
                    </button>
                  </NuxtLink>
                  <NuxtLink :to="`/1/sellers/kirim/${item._id}`">
                    <button
                      class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      <span
                        class="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0"
                      >
                        Kirim Qilingan Mahsulotlar
                      </span>
                    </button>
                  </NuxtLink>
                  <NuxtLink :to="`/1/sellers/${item._id}`">
                    <button
                      class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      <span
                        class="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0"
                      >
                        Hisobot
                      </span>
                    </button>
                  </NuxtLink>
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <NuxtLink :to="`/1/clients/${item._id}`">
                  <div class="print-text">
                    {{ formatTime(item.date) }}
                  </div>
                </NuxtLink>
              </td>
              <td
                class="px-5 py-3 border-b border-gray-300 text-right w-[10%] text-gray-400"
              >
                <div>
                  <Icon
                    name="clarity:pencil-line"
                    class="mr-4 hover:text-black"
                    size="1.5rem"
                    @click="handleEditClient(item._id, item.name, item.phone)"
                  />
                  <Icon
                    name="ant-design:delete-outlined"
                    class="hover:text-black"
                    size="1.5rem"
                    @click="handleDeleteClient(item._id)"
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
            <form @submit="handleSubmit">
              <div class="mb-4">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-700"
                >
                  Sotuvchi Ismi</label
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
                  Sotuvchi Telefon Raqami</label
                >
                <input
                  v-model="phone"
                  required
                  type="text"
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
            @click="() => (isPopupEditOpen = false)"
            class="relative -top-8 -right-8 float-right text-gray-500 hover:text-gray-700"
          >
            <Icon name="material-symbols:close" width="25" height="25" />
          </button>

          <div>
            <form @submit="handleSubmitEdit">
              <div class="mb-4">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-700"
                >
                  Sotuvchi Ismi</label
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
                  Sotuvchi Telefon Raqami</label
                >
                <input
                  v-model="editPhone"
                  required
                  type="text"
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

let clients = ref("");
let isPopupOpen = ref(false);
let isPopupEditOpen = ref(false);
let editName = ref("");
let editPhone = ref("");
let clientId = ref("");
let loading = ref(true);
let name = ref("");
let phone = ref("");
let search = ref("");

onMounted(async () => {
  try {
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    const clientsRes = await $host.get("/sellers");
    clients.value = clientsRes.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});

const handleSubmit = async (e) => {
  loading.value = true;
  e.preventDefault();
  try {
    await $host.put("/sellers", {
      name: name.value,
      phone: phone.value,
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};
const handleDeleteClient = async (_id) => {
  Swal.fire({
    title: "Haqiqatdan ham o'chirmoqchimisiz?",
    showCancelButton: true,
    confirmButtonText: "O'chirish",
    confirmButtonColor: "#D11A2A",
    cancelButtonText: "Bekor Qilish",
  }).then(async (result) => {
    if (result.isConfirmed) {
      loading.value = true;
      await $host.delete(`/sellers/${_id}`).then(async () => {
        await Swal.fire("O'chirildi", "", "success");
        window.location.reload();
      });
    }
  });
};
const handleEditClient = (_id, name, phone) => {
  isPopupEditOpen.value = true;
  editName.value = name;
  editPhone.value = phone;
  clientId.value = _id;
};
const handleSubmitEdit = async (e) => {
  loading.value = true;
  e.preventDefault();
  try {
    await $host.post(`/sellers/${clientId.value}`, {
      name: editName.value,
      phone: editPhone.value,
    });
    await Swal.fire("O'zgartildi", "", "success");
    window.location.reload();
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};
let filteredClients = computed(() => {
  if (!search.value) return clients.value;
  return clients.value.filter((client) =>
    client.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>