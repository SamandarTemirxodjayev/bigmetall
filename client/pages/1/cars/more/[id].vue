<template>
  <div v-if="!loading">
    <div>
      <span class="text-2xl font-semibold"
        >Moshina - {{ car.name }} - {{ car.number }}</span
      >
    </div>
    <div class="grid grid-cols-2 gap-1 min-h-[85vh] h-full w-full">
      <div class="border-r border-gray-400 pr-3">
        <div class="my-4">
          <span class="text-xl font-semibold">Savdo</span>
        </div>
        <div class="shadow-2xl border border-gray-300 items-center bg-white">
          <div class="flex p-4 justify-between">
            <div></div>
            <div>
              <div>
                <UButton @click="() => (isPopupOpen2 = true)" size="xl">
                  Savdo Qo'shish
                </UButton>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-2 bg-white border border-gray-50 p-8 shadow-2xl">
          <table class="w-full">
            <thead>
              <tr>
                <th class="px-5 py-3 text-left border-y border-gray-300">#</th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Savdo Nomi
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Summasi
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Qo'shilgan Vaqti
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in savdo"
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
                      @click="handleEditSavdo(item._id, item.name, item.amount)"
                    />
                    <Icon
                      name="ant-design:delete-outlined"
                      class="hover:text-black"
                      size="1.5rem"
                      @click="handleDeleteSavdo(item._id)"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="ml-2">
        <div class="my-4">
          <span class="text-xl font-semibold">Harajat</span>
        </div>

        <div class="shadow-2xl border border-gray-300 items-center bg-white">
          <div class="flex p-4 justify-between">
            <div></div>
            <div>
              <div>
                <UButton @click="isPopupOpen = true" size="xl">
                  Harjat Qo'shish
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-2 bg-white border border-gray-50 p-8 shadow-2xl">
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
                  Qo'shilgan Vaqti
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
                        handleEditHarajat(item._id, item.name, item.amount)
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
      </div>
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
          <form @submit="handleSubmitAddHarajat">
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
                size="xl"
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
            <div>
              <UButton type="submit" block class="px-4 py-2">
                Tasdiqlash
              </UButton>
            </div>
          </form>
        </div>
      </UCard>
    </UModal>
    <UModal v-model="isPopupOpen2" prevent-close>
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
              Savdo Qo'shish
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isPopupOpen2 = false"
            />
          </div>
        </template>

        <div>
          <form @submit="handleSubmitAddSavdo">
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Savdo Nomi</label
              >
              <UInput
                v-model="name"
                color="white"
                variant="outline"
                size="xl"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="quantity"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Savdo Summasi</label
              >
              <VueNumber
                v-model="amount"
                v-bind="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                size="xl"
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
            <div>
              <UButton type="submit" block class="px-4 py-2">
                Tasdiqlash
              </UButton>
            </div>
          </form>
        </div>
      </UCard>
    </UModal>
    <UModal v-model="isPopupEditOpen2" prevent-close>
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
              @click="isPopupEditOpen2 = false"
            />
          </div>
        </template>

        <div>
          <form @submit="handleEditSavdoForm">
            <div class="mb-4">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Savdo Nomi</label
              >
              <UInput
                v-model="editName"
                color="white"
                variant="outline"
                size="xl"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="quantity"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Savdo Summasi</label
              >
              <VueNumber
                v-model="editAmount"
                v-bind="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
import { component as VueNumber } from "@coders-tm/vue-number-format";

let loading = ref(true);
let car = ref(null);
const route = useRoute();
let harajats = ref(null);
let isPopupOpen = ref(false);
let isPopupOpen2 = ref(false);
let isPopupEditOpen = ref(false);
let isPopupEditOpen2 = ref(false);
let number = ref({
  decimal: ".",
  separator: " ",
  suffix: " so'm",
  precision: 2,
  masked: false,
  min: 0,
});
let amount = ref(0);
let name = ref();
let editName = ref();
let editAmount = ref();
let harajatId = ref();
let savdoId = ref();

let savdo = ref(null);
onMounted(async () => {
  try {
    const res = await $host.get(`/cars/${route.params.id}`);
    car.value = res.data;
    const carHarjatsRes = await $host.get(`/car/harajats/${route.params.id}`);
    harajats.value = carHarjatsRes.data;
    const carSavdoRes = await $host.get(`/car/savdo/${route.params.id}`);
    savdo.value = carSavdoRes.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const handleSubmitAddHarajat = async (e) => {
  e.preventDefault();
  loading.value = true;

  try {
    await $host.post("/car/harajat", {
      carId: route.params.id,
      name: name.value,
      amount: amount.value,
    });

    await Swal.fire({
      icon: "success",
      title: "Muvaffaqiyatli saqlandi",
    });

    window.location.reload();
  } catch (error) {
    console.error("Failed to add harajat:", error);

    await Swal.fire({
      icon: "error",
      title: "Xatolik yuz berdi",
      text: "Iltimos, qayta urinib ko'ring.",
    });
  }
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
      await $host.delete(`/car/harajat/${_id}`).then(async () => {
        await Swal.fire("O'chirildi", "", "success");
        window.location.reload();
      });
    }
  });
};
const handleDeleteSavdo = async (_id) => {
  Swal.fire({
    title: "Haqiqatdan ham o'chirmoqchimisiz?",
    showCancelButton: true,
    confirmButtonText: "O'chirish",
    confirmButtonColor: "#D11A2A",
    cancelButtonText: "Bekor Qilish",
  }).then(async (result) => {
    if (result.isConfirmed) {
      loading.value = true;
      await $host.delete(`/car/savdo/${_id}`).then(async () => {
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
const handleEditSavdo = async (_id, name, amount) => {
  isPopupEditOpen2.value = true;
  editName.value = name;
  editAmount.value = amount;
  savdoId.value = _id;
};
const handleEditHarajatForm = async () => {
  loading.value = true;
  try {
    await $host.patch(`/car/harajat/${harajatId.value}`, {
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
const handleEditSavdoForm = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $host.patch(`/car/savdo/${savdoId.value}`, {
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
const handleSubmitAddSavdo = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $host.post("/car/savdo", {
      carId: route.params.id,
      name: name.value,
      amount: amount.value,
    });

    await Swal.fire({
      icon: "success",
      title: "Muvaffaqiyatli saqlandi",
    });

    window.location.reload();
  } catch (error) {
    console.log(error);
    Swal.fire("Xatolik", "Xatolik", "error");
    loading.value = false;
  }
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
    whenever: [isPopupOpen2],
    handler: () => {
      isPopupOpen2.value = false;
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
defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isPopupEditOpen2],
    handler: () => {
      isPopupEditOpen2.value = false;
    },
  },
});
</script>