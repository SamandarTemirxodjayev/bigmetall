<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold">Kompaniya Qarzdorliklari</span>
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
            <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              1m uchun sotuv narxi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Umumiy Narxi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              1m uchun tan narxi
            </th>
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
        <tbody v-if="products.products.length == 0">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td
              class="px-5 py-3 border-b border-gray-300 text-center"
              colspan="9"
            >
              Ma'lumot mavjud emas
            </td>
          </tr>
        </tbody>
        <tbody v-for="item in products.products" :key="item._id">
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
                {{ item.quantity }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ numberFormat(item.saledPrice) }}so'm
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
              <div class="print-text">{{ numberFormat(item.price) }}so'm</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <template v-if="item.uzunligi">
                <div class="print-text">
                  {{
                    item.price == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(
                          item.price * item.uzunligi * item.quantity
                        )} so'm`
                  }}
                </div>
              </template>
              <template v-else>
                <div class="print-text">
                  {{
                    item.price == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(
                          ((item.price * (item.uzunligi_x * item.uzunligi_y)) /
                            10000) *
                            item.quantity
                        )} so'm`
                  }}
                </div>
              </template>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ formatTime(item.date) }}
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
        <div class="flex">
          <UButton size="xl">
            To'langan:
            {{ numberFormat(products.payedAmount) }}
            so'm
          </UButton>
          <UButton size="xl" class="mx-2">
            Qoldiq:
            {{ numberFormat(products.allAmount - products.payedAmount) }}
            so'm
          </UButton>
        </div>
        <UButton
          :disabled="
            products.allAmount - products.payedAmount == 0 ? true : false
          "
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
              To'lov Summasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'lov Turi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'lov Sanasi
            </th>
          </tr>
        </thead>
        <tbody
          v-if="
            products.historyAmount ? products.historyAmount.length == 0 : false
          "
        >
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td
              class="px-5 py-3 border-b border-gray-300 text-center"
              colspan="11"
            >
              Ma'lumot mavjud emas
            </td>
          </tr>
        </tbody>
        <tbody v-for="item in products.historyAmount" :key="item._id">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">BIG METALL</div>
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
              Modal
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
              Qarz Beruvchi</label
            >
            <input
              v-model="products.seller"
              type="text"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
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
              :max="products.allAmount - products.payedAmount"
              min="1"
              step="0.01"
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
              size="lg"
            />
          </div>
          <div>
            <UButton type="submit" block> Tasdiqlash </UButton>
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
import { component as VueNumber } from "@coders-tm/vue-number-format";

let number = ref({
  decimal: ".",
  separator: " ",
  suffix: " so'm",
  precision: 2,
  masked: false,
  min: 0,
});
let amount = ref();
let payedType = ref();
const route = useRoute();
let loading = ref(true);
let products = ref([]);
let isPopupOpen = ref(false);
onMounted(async () => {
  try {
    products.value = (await $host.get("/businessdebt/" + route.params.id)).data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});

const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $host.post("/businessdebt/" + route.params.id, {
      amount: parseFloat(amount.value),
      payedType: payedType.value,
    });
    Swal.fire({
      icon: "success",
      title: "Success!",
      showConfirmButton: false,
      timer: 1500,
    });
    products.value = (await $host.get("/businessdebt/" + route.params.id)).data;
    isPopupOpen.value = false;
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
</script>