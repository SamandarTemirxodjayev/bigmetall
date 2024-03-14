<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold"
        >Mahsulotlar Haqida - {{ pro.clientId ? pro.clientId.name : "" }} -
        Qarzdorlik</span
      >
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-4 shadow-2xl">
      <table class="w-full text-[11px]">
        <thead>
          <tr>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Mahsulot Nomi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              O'lchamlari
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Kategoriyasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Qalinligi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">Holati</th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Uzunligi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              1m uchun sotuv narxi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Umumiy Narxi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Sotilgan Sanasi va Vaqti
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'lov Turi
            </th>
          </tr>
        </thead>
        <tbody v-if="products.length == 0">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td
              class="px-5 py-3 border-b border-gray-300 text-center"
              colspan="11"
            >
              Ma'lumot mavjud emas
            </td>
          </tr>
        </tbody>
        <tbody v-for="item in products" :key="item._id">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <template v-if="item.cut">
                  {{ item.name }} (kesilgan)
                </template>
                <template v-else>
                  {{ item.name }}
                </template>
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.olchamlari }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.category }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <template v-if="item.name == 'Dvuxtavr'">
                  O'rta: {{ item.qalinligi_ortasi }}mm <br />
                  Chet: {{ item.qalinligi }}mm
                </template>
                <template v-else> {{ item.qalinligi }}mm </template>
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.holati }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <template
                v-if="
                  item.name == 'Palasa' ||
                  item.name == 'Kvadrat prut' ||
                  item.name == 'Kvadrad profil'
                "
              >
                <div class="print-text">
                  Uzunligi: {{ item.uzunligi }}m <br />
                  Bo'yi: {{ item.uzunligi_x }}sm <br />
                  Eni: {{ item.uzunligi_y }}sm
                </div>
              </template>
              <template v-else-if="item.uzunligi">
                <div class="print-text">{{ item.uzunligi }}m</div>
              </template>
              <template v-else>
                <div class="print-text">
                  Bo'yi: {{ item.uzunligi_x }}sm <br />
                  Eni: {{ item.uzunligi_y }}sm
                </div>
              </template>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ numberFormat(item.saledPrice) }} so'm
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.quantity }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <template v-if="item.uzunligi">
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(
                          item.saledPrice * item.uzunligi * item.quantity
                        )} so'm`
                  }}
                </div>
              </template>
              <template v-else>
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(
                          ((item.saledPrice *
                            (item.uzunligi_x * item.uzunligi_y)) /
                            10000) *
                            item.quantity
                        )} so'm`
                  }}
                </div>
              </template>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ formatTime(pro.date) }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">Qarz</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-8 bg-white border border-gray-50 px-4 pb-4 shadow-2xl">
      <div class="my-4 flex justify-between">
        <div class="flex gap-[1%]">
          <UButton size="xl">
            To'langan:
            {{ numberFormat(pro.payedAmount) }}
            so'm
          </UButton>
          <UButton size="xl">
            Qoldiq:
            {{ numberFormat(pro.allAmount - pro.payedAmount) }}
            so'm
          </UButton>
        </div>
        <UButton
          :disabled="pro.allAmount - pro.payedAmount == 0 ? true : false"
          @click="() => (isPopupOpen = true)"
          size="xl"
        >
          To'lov Qo'shish
        </UButton>
      </div>
      <table class="w-full text-[14px]">
        <thead>
          <tr>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Mijoz Ismi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Qabul Qiluvchi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'lov Summasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'lov Turi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'lov Sanasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300"></th>
          </tr>
        </thead>
        <tbody v-if="pro.historyAmount ? pro.historyAmount.length == 0 : false">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td
              class="px-5 py-3 border-b border-gray-300 text-center"
              colspan="11"
            >
              Ma'lumot mavjud emas
            </td>
          </tr>
        </tbody>
        <tbody v-for="item in pro.historyAmount" :key="item._id">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ pro.clientId.name }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.clientSaved }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ numberFormat(item.amount) }}
                so'm
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.payedType }}
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
              <div v-if="pro.allAmount - pro.payedAmount != 0">
                <Icon
                  name="clarity:pencil-line"
                  class="mr-4 hover:text-black"
                  size="1.5rem"
                  @click="handleEditDebtHistory(item)"
                />
                <Icon
                  name="ant-design:delete-outlined"
                  class="hover:text-black"
                  size="1.5rem"
                  @click="handleDeleteDebtHistory(item._id)"
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
              To'lov Qo'shish
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
              Mijoz Ismi</label
            >
            <UInput size="xl" v-model="pro.clientId.name" disabled />
          </div>
          <div class="mb-4">
            <label
              for="quantity"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Qabul Qiluvchi</label
            >
            <UInput v-model="clientSaved" required size="xl" />
          </div>
          <div class="mb-4">
            <label
              for="quantity"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              To'lov Summasi</label
            >
            <VueNumber
              v-bind="number"
              v-model="amount"
              required
              :max="pro.allAmount - pro.payedAmount"
              min="1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="quantity"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              To'lov Turi</label
            >
            <USelect
              v-model="payedType"
              :options="['Naxt', 'Perechesleniya', 'Kartaga( terminal)']"
              size="xl"
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
              To'lovni Tahrirlash
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

        <form @submit="handleEditSubmit">
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Mijoz Ismi</label
            >
            <UInput size="xl" v-model="pro.clientId.name" disabled />
          </div>
          <div class="mb-4">
            <label
              for="quantity"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Qabul Qiluvchi</label
            >
            <UInput v-model="editProduct.clientSaved" required size="xl" />
          </div>
          <div class="mb-4">
            <label
              for="quantity"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              To'lov Summasi</label
            >
            <VueNumber
              v-bind="number"
              v-model="editProduct.amount"
              required
              :max="pro.allAmount - pro.payedAmount"
              min="1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="quantity"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              To'lov Turi</label
            >
            <USelect
              v-model="editProduct.payedType"
              :options="['Naxt', 'Perechesleniya', 'Kartaga( terminal)']"
              size="xl"
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
      </UCard>
    </UModal>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import { component as VueNumber } from "@coders-tm/vue-number-format";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

let number = ref({
  decimal: ".",
  separator: " ",
  suffix: " so'm",
  precision: 2,
  masked: false,
  min: 0,
});
const route = useRoute();

let isPopupOpen = ref(false);
let loading = ref(true);
let search = ref("Hammasi");
let products = ref([]);
let product = ref({});
let pro = ref({});
let clientSaved = ref("");
let amount = ref(null);
let payedType = ref("");
let editProduct = ref(null);
let isPopupOpenEdit = ref(false);

onMounted(async () => {
  try {
    const resProducts = await $host.post(`/products/debt/${route.params.id}`);
    products.value = resProducts.data.products;
    pro.value = resProducts.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $host.put(`/products/debt/${route.params.id}`, {
      clientSaved: clientSaved.value,
      amount: parseFloat(amount.value),
      payedType: payedType.value,
    });
    isPopupOpen.value = false;
    const resProducts = await $host.post(`/products/debt/${route.params.id}`);
    pro.value = resProducts.data;
    clientSaved.value = "";
    amount.value = null;
    payedType.value = "";
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
const handleDeleteDebtHistory = async (_id) => {
  Swal.fire({
    title: "Haqiqatdan ham o'chirmoqchimisiz?",
    showCancelButton: true,
    confirmButtonText: "O'chirish",
    confirmButtonColor: "#D11A2A",
    cancelButtonText: "Bekor Qilish",
  }).then(async (result) => {
    if (result.isConfirmed) {
      loading.value = true;
      await $host
        .delete(`/products/debt/${route.params.id}?id=${_id}`)
        .then(async () => {
          const resProducts = await $host.post(
            `/products/debt/${route.params.id}`
          );
          pro.value = resProducts.data;
          await Swal.fire("O'chirildi", "", "success");
        });
      loading.value = false;
    }
  });
};
const handleEditDebtHistory = (item) => {
  editProduct.value = JSON.parse(JSON.stringify(item));
  isPopupOpenEdit.value = true;
};
const handleEditSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $host.patch(
      `/products/debt/${route.params.id}?id=${editProduct.value._id}`,
      {
        clientSaved: editProduct.value.clientSaved,
        amount: parseFloat(editProduct.value.amount),
        payedType: editProduct.value.payedType,
      }
    );
    isPopupOpenEdit.value = false;
    const resProducts = await $host.post(`/products/debt/${route.params.id}`);
    pro.value = resProducts.data;
    editProduct.value = null;
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
    top: 0;
    margin-left: -15%;
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