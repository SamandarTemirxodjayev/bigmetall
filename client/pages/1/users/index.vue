<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold">Foydalanuvchilar</span>
    </div>
    <div class="items-center bg-white shadow-xl rounded-md">
      <div class="flex p-4 justify-between">
        <form @submit="handleSearchSubmit">
          <div class="flex">
            <UInput
              icon="i-heroicons-magnifying-glass-20-solid"
              size="xl"
              color="gray"
              :trailing="false"
              placeholder="Qidirish..."
              v-model="search"
            />
          </div>
        </form>
        <div>
          <UButton @click="() => (isPopupOpen = true)" class="mx-2 py-2 px-3">
            Foydalanuvchi Qo'shish
          </UButton>
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
              Foydalanuvchi Qo'shish
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
          <form @submit="handleAddOmbor">
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Ismi</label
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
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Familiyasi</label
              >
              <UInput
                v-model="surname"
                color="white"
                variant="outline"
                size="lg"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Darajasi</label
              >
              <USelect
                v-model="user_level"
                :options="[
                  { name: 'SuperAdmin', id: 1 },
                  { name: 'Admin', id: 2 },
                ]"
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
    <UModal v-model="isPopupOpenEdit" prevent-close>
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
              Foydalanuvchini Tahrirlash
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isPopupOpenEdit = false"
            />
          </div>
        </template>

        <div>
          <form @submit="handleEditOmbor">
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Ismi</label
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
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Familiyasi</label
              >
              <UInput
                v-model="editSurname"
                color="white"
                variant="outline"
                size="lg"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Darajasi</label
              >
              <USelect
                v-model="editUser_level"
                :options="[
                  { name: 'SuperAdmin', id: 1 },
                  { name: 'Admin', id: 2 },
                ]"
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
    await Swal.fire("Foydalanuvchi", "Muvaffiqatli o'zgartirildi", "success");
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
    whenever: [isPopupOpenEdit],
    handler: () => {
      isPopupOpenEdit.value = false;
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