<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold">Foydalanuvchilar</span>
    </div>
    <div class="shadow items-center bg-white shadow-xl rounded-md">
      <div class="flex p-4 justify-between">
        <form @submit="handleSearchSubmit">
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
            <button
              type="submit"
              class="bg-blue-500 text-white font-semibold rounded-xl px-3 mx-2"
            >
              Qidirish
            </button>
          </div>
        </form>
        <div>
          <button
            @click="() => (isPopupOpen = true)"
            class="mx-2 text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-xl font-semibold"
          >
            Foydalanuvchi Qo'shish
          </button>
        </div>
      </div>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-5 py-3 text-left border-y border-gray-300">#</th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Ismi Familiyasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Darajasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">Logini</th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Yaratilgan Vaqti
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              So'ngi O'zgartirilgan Vaqti
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
              <div class="print-text">{{ item.name }} {{ item.surname }}</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.user_level == 1 ? "SuperAdmin" : "Admin" }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.login }}</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ formatTime(item.createdAt) }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ formatTime(item.updatedAt) }}
              </div>
            </td>
            <td
              class="px-5 py-3 border-b border-gray-300 text-right w-[10%] text-gray-500"
            >
              <div>
                <Icon
                  name="clarity:pencil-line"
                  class="mr-4 hover:text-black print-text"
                  size="1.5rem"
                  @click="
                    handleEditOmborv(
                      item._id,
                      item.name,
                      item.surname,
                      item.user_level
                    )
                  "
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
                Ismi</label
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
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Familiyasi</label
              >
              <input
                v-model="surname"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Darajasi</label
              >
              <select
                v-model="user_level"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="1">SuperAdmin</option>
                <option value="2">Admin</option>
              </select>
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
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Ismi</label
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
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Familiyasi</label
              >
              <input
                v-model="editSurname"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Darajasi</label
              >
              <select
                v-model="editUser_level"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="1">SuperAdmin</option>
                <option value="2">Admin</option>
              </select>
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
let editSurname = ref("");
let editUser_level = ref("");
let editId = ref("");
let users = ref();
let search = ref("");
let name = ref("");
let surname = ref("");
let user_level = ref("");

onMounted(async () => {
  try {
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    const resUsers = await $host.get("/users");
    users.value = resUsers.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const handleEditOmborv = (id, name, surname, user_level) => {
  isPopupOpenEdit.value = true;
  editName.value = name;
  editSurname.value = surname;
  editUser_level.value = user_level;
  editId.value = id;
};
const handleAddOmbor = async () => {
  loading.value = true;
  try {
    await $host.post("/register", {
      name: name.value,
      surname: surname.value,
      user_level: user_level.value,
    });
    await Swal.fire("Foydalanuvchi", "Muvaffiqatli yaratildi", "success");
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
      await $host.delete(`/user/${_id}`).then(async () => {
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
    await $host.patch(`/user/${editId.value}`, {
      name: editName.value,
      surname: editSurname.value,
      user_level: editUser_level.value,
    });
    await Swal.fire("Ombor", "Muvaffiqatli o'zgartirildi", "success");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
let filteredSklads = computed(() => {
  if (!search.value) return users.value;
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(search.value.toLowerCase()) ||
      user.surname.toLowerCase().includes(search.value.toLowerCase())
  );
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