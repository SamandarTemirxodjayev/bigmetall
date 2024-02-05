<template>
  <div v-if="!loading">
    <div class="my-4">
      <span class="text-2xl font-semibold">Sotuvchilar</span>
    </div>
    <div class="shadow-2xl border border-gray-300 items-center">
      <div class="flex p-4 justify-between">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass-20-solid"
          size="xl"
          :trailing="false"
          placeholder="Qidiruv"
        />
        <div>
          <div>
            <UButton @click="() => (isPopupOpen = true)" size="xl">
              Sotuvchi Qo'shish
            </UButton>
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
              <div class="print-text flex items-center gap-[1%]">
                <NuxtLink :to="`/1/sellers/products/${item._id}`">
                  <UButton size="xl"> Sotilgan Mahsulotlar </UButton>
                </NuxtLink>
                <NuxtLink :to="`/1/sellers/kirim/${item._id}`">
                  <UButton size="xl"> Kirim Qilingan Mahsulotlar </UButton>
                </NuxtLink>
                <NuxtLink :to="`/1/sellers/${item._id}`">
                  <UButton size="xl">Hisobot</UButton>
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
              Sotuvchi Qo'shish
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

        <form @submit="handleSubmit">
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Sotuvchi Ismi</label
            >
            <UInput v-model="name" required size="xl" />
          </div>
          <div class="mb-4">
            <label
              for="quantity"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Sotuvchi Telefon Raqami</label
            >
            <UInput v-model="phone" required size="xl" />
          </div>
          <div>
            <UButton type="submit" size="xl" block> Tasdiqlash </UButton>
          </div>
        </form>
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
              Sotuvchi Qo'shish
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

        <form @submit="handleSubmitEdit">
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Sotuvchi Ismi</label
            >
            <UInput v-model="editName" required size="xl" />
          </div>
          <div class="mb-4">
            <label
              for="quantity"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Sotuvchi Telefon Raqami</label
            >
            <UInput v-model="editPhone" required size="xl" />
          </div>
          <div>
            <UButton size="xl" type="submit" block> Tasdiqlash </UButton>
          </div>
        </form>
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