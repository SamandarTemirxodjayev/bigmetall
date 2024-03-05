<template>
  <div class="hidden-print">
    <div v-if="!loading">
      <div class="mb-2">
        <span class="text-2xl font-semibold">Chiqim</span>
      </div>
      <div
        class="mt-8 text-[13px] bg-white border borer-gray-50 shadow-2xl p-4"
      >
        <div class="border border-gray-50">
          <table class="w-full">
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
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Holati
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Uzunligi
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Soni
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Umumiy Uzunligi
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  1 m Uchun Sotuv Narxi
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Umumiy Narxi
                </th>
                <th
                  class="px-5 py-3 text-left border-y border-gray-300 hidden-print"
                >
                  O'zgartirish
                </th>
              </tr>
            </thead>
            <tbody v-for="item in products" :key="item._id">
              <tr class="hover:bg-gray-200 cursor-pointer w-full">
                <td class="px-5 py-3 border-b border-gray-300">
                  <template v-if="item.cut">
                    {{ item.name }} (kesilgan)
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </td>
                <td class="px-5 py-3 border-b border-gray-300">
                  <div>{{ item.olchamlari }}</div>
                </td>
                <td class="px-5 py-3 border-b border-gray-300">
                  <div>
                    {{ item.category }}
                  </div>
                </td>
                <td class="px-5 py-3 border-b border-gray-300">
                  <div>
                    <div v-if="item.qalinligi_ortasi">
                      O'rta: {{ item.qalinligi_ortasi }}mm<br />
                      Chet: {{ item.qalinligi }}mm
                    </div>
                    <div v-else>{{ item.qalinligi }}mm</div>
                  </div>
                </td>
                <td class="px-5 py-3 border-b border-gray-300">
                  <div>
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
                    <div>
                      Uzunligi: {{ item.uzunligi }}m <br />
                      Bo'yi: {{ item.uzunligi_x }}sm <br />
                      Eni: {{ item.uzunligi_y }}sm
                    </div>
                  </template>
                  <template v-else-if="item.uzunligi">
                    <div>{{ item.uzunligi }}m</div>
                  </template>
                  <template v-else>
                    <div>
                      Bo'yi: {{ item.uzunligi_x }}sm <br />
                      Eni: {{ item.uzunligi_y }}sm
                    </div>
                  </template>
                </td>

                <td class="px-5 py-3 border-b border-gray-300">
                  <div>{{ item.quantity }}ta</div>
                </td>
                <td class="px-5 py-3 border-b border-gray-300">
                  <template v-if="item.uzunligi">
                    <div>{{ (item.uzunligi * item.quantity).toFixed() }}m</div>
                  </template>
                  <template v-else>
                    <div>
                      {{
                        (item.uzunligi_y * item.uzunligi_x * item.quantity) /
                        10000
                      }}
                      m<sup>2</sup>
                    </div>
                  </template>
                </td>
                <td class="px-5 py-3 border-b border-gray-300">
                  <div>
                    {{
                      item.saledPrice == null
                        ? "Narx belgilanmagan"
                        : `${item.saledPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`
                    }}
                  </div>
                </td>
                <td class="px-5 py-3 border-b border-gray-300">
                  <template v-if="item.uzunligi">
                    <div>
                      {{
                        item.saledPrice == null
                          ? "Narx belgilanmagan"
                          : `${(item.saledPrice * item.uzunligi * item.quantity)
                              .toFixed(2)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`
                      }}
                    </div>
                  </template>
                  <template v-else>
                    <div>
                      {{
                        item.saledPrice == null
                          ? "Narx belgilanmagan"
                          : `${(
                              ((item.saledPrice *
                                (item.uzunligi_x * item.uzunligi_y)) /
                                10000) *
                              item.quantity
                            )
                              .toFixed(2)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`
                      }}
                    </div>
                  </template>
                </td>
                <td class="px-5 py-3 border-b border-gray-300 hidden-print">
                  <div>
                    <Icon
                      name="clarity:pencil-line"
                      class="hover:text-black text-gray-400"
                      size="1.5rem"
                      @click="handleEditProductPrice(item)"
                    />
                    <Icon
                      name="ant-design:delete-outlined"
                      class="ml-2 hover:text-black text-gray-400"
                      size="1.5rem"
                      @click="handleDeleteProduct(item)"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex mt-8 gap-8 ml-4 pb-4">
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Sotuvchi</label
            >
            <select
              v-model="seller"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option v-for="(item, id) in sellers" :key="id" :value="item">
                {{ item.name }} ({{ item.phone }})
              </option>
            </select>
          </div>
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Mijoz</label
            >
            <select
              v-model="client"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option v-for="(item, id) in clients" :key="id" :value="item">
                {{ item.name }} ({{ item.phone }})
              </option>
            </select>
          </div>
          <div>
            <label
              for="quantity"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              To'lov Usuli</label
            >
            <select
              v-model="saledType"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option>Naxt</option>
              <option>Qarz</option>
              <option>Perechesleniya</option>
              <option>Kartaga( terminal)</option>
            </select>
          </div>
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Umumiy summasi</label
            >
            <input
              :value="formatNumberWithSpaces(total)"
              type="text"
              disabled
              class="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="hidden-print">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Tasdiqlaysizmi?</label
            >
            <button
              @click="submitAll"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 focus:outline-none"
            >
              Tasdiqlash
            </button>
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
                Narxni o'zgartirish
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
                >1m uchun sotuv narxini kiriting
              </label>
              <VueNumber
                v-model="saledPrice"
                v-bind="number"
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
        </UCard>
      </UModal>
      <div class="print-wrapper h-full max-w-[25.9%]">
        <div class="print-content ps-12 mt-20">
          <div
            class="print-text w-full text-xl font-bold justify-between flex items-center mb-4"
          >
            <img src="/logo.png" alt="" class="print-text" width="150" />
            <div class="print-text">
              <div class="print-text">{{ phones.one }}</div>
              <div class="print-text">{{ phones.two }}</div>
            </div>
          </div>
          <div
            class="print-text w-full text-[13px] font-bold justify-center flex items-center"
          >
            "GOLDEN METALL RUSTAM" MChJ
          </div>
          <div
            class="print-text w-full text-[13px] font-bold justify-center flex items-center"
          >
            Toshkent Tumani,Xasanboy Daxasi,Dom 571
          </div>
          <br />
          <div class="print-text text-[13px]">
            <div class="flex justify-between print-text">
              <div class="print-text">Savdo Sanasi:</div>
              <div class="print-text" style="white-space: nowrap">
                {{ formatTime(new Date()) }}
              </div>
            </div>
          </div>
          <div class="print-text font-bold">
            --------------------------------------
          </div>
          <div
            class="print-text text-[13px]"
            v-for="item in products"
            :key="item._id"
          >
            <div class="flex justify-between print-text">
              <div class="print-text">Mahsulot Nomi:</div>
              <div class="print-text">{{ item.name }}</div>
            </div>
            <div class="flex justify-between print-text">
              <div class="print-text">O'lchamlari:</div>
              <div class="print-text">{{ item.olchamlari }}</div>
            </div>
            <div class="flex justify-between print-text">
              <div class="print-text">Kategoriyasi:</div>
              <div class="print-text">{{ item.category }}</div>
            </div>
            <div class="flex justify-between print-text">
              <div class="print-text">Qalinligi:</div>
              <div class="print-text">
                <div class="print-text">
                  <div v-if="item.qalinligi_ortasi" class="print-text">
                    <div class="print-text" style="white-space: nowrap">
                      O'rta: {{ item.qalinligi_ortasi }}mm
                    </div>
                    <div class="print-text" style="white-space: nowrap">
                      Chet: {{ item.qalinligi }}mm
                    </div>
                  </div>
                  <div class="print-text" style="white-space: nowrap" v-else>
                    {{ item.qalinligi }}mm
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-between print-text">
              <div class="print-text">Holati:</div>
              <div class="print-text">{{ item.holati }}</div>
            </div>
            <div class="flex justify-between print-text">
              <div class="print-text">Uzunligi:</div>
              <div class="print-text">
                <template
                  v-if="
                    item.name == 'Palasa' ||
                    item.name == 'Kvadrat prut' ||
                    item.name == 'Kvadrad profil'
                  "
                >
                  <div class="text-print">
                    <div class="print-text" style="white-space: nowrap">
                      Uzunligi: {{ item.uzunligi }}m
                    </div>
                    <div class="print-text" style="white-space: nowrap">
                      Bo'yi: {{ item.uzunligi_x }}m
                    </div>
                    <div class="print-text" style="white-space: nowrap">
                      Eni: {{ item.uzunligi_y }}m
                    </div>
                  </div>
                </template>
                <template v-else-if="item.uzunligi">
                  <div class="print-text" style="white-space: nowrap">
                    {{ item.uzunligi }}m
                  </div>
                </template>
                <template v-else>
                  <div>
                    <div class="print-text" style="white-space: nowrap">
                      Bo'yi: {{ item.uzunligi_x }}sm
                    </div>
                    <div class="print-text" style="white-space: nowrap">
                      Eni: {{ item.uzunligi_y }}sm
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div class="flex justify-between print-text">
              <div class="print-text">Soni:</div>
              <div class="print-text">{{ item.quantity }}</div>
            </div>
            <div class="flex justify-between print-text">
              <div class="print-text">Umumiy Uzunligi:</div>
              <div class="print-text">
                <template v-if="item.uzunligi">
                  <div class="print-text">
                    {{ (item.uzunligi * item.quantity).toFixed(2) }}m
                  </div>
                </template>
                <template v-else>
                  <div class="print-text">
                    {{
                      (item.uzunligi_y * item.uzunligi_x * item.quantity) /
                      10000
                    }}
                    m<sup>2</sup>
                  </div>
                </template>
              </div>
            </div>
            <div class="flex justify-between print-text">
              <div class="print-text">1 m Uchun Sotuv Narxi:</div>
              <div class="print-text" style="white-space: nowrap">
                {{
                  item.saledPrice == null
                    ? "Narx belgilanmagan"
                    : `${numberFormat(+item.saledPrice)} so'm`
                }}
              </div>
            </div>
            <div class="flex justify-between print-text">
              <div class="print-text">Umumiy Narxi:</div>
              <div class="print-text" style="white-space: nowrap">
                <template v-if="item.uzunligi">
                  <div class="print-text">
                    {{
                      item.saledPrice == null
                        ? "Narx belgilanmagan"
                        : `${numberFormat(
                            (
                              item.saledPrice *
                              item.uzunligi *
                              item.quantity
                            ).toFixed(2)
                          )} so'm`
                    }}
                  </div>
                </template>
                <template v-else>
                  <div class="print-text">
                    {{
                      item.saledPrice == null
                        ? "Narx belgilanmagan"
                        : `${(
                            ((item.saledPrice *
                              (item.uzunligi_x * item.uzunligi_y)) /
                              10000) *
                            item.quantity
                          )
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`
                    }}
                  </div>
                </template>
              </div>
            </div>
            <div class="print-text text-lg">
              <div class="print-text font-bold">
                ----------------------------------
              </div>
            </div>
          </div>
          <div class="print-text text-[13px]">
            <div class="flex justify-between print-text whitespace-nowrap">
              <div class="print-text">Jami:</div>
              <div class="print-text">
                {{ formatNumberWithSpaces(total) }} so'm
              </div>
            </div>
            <div class="flex justify-between print-text whitespace-nowrap">
              <div class="print-text">Sotuvchi:</div>
              <div class="print-text">
                {{ seller.name }}
              </div>
            </div>
            <div class="flex justify-between print-text whitespace-nowrap">
              <div class="print-text">Mijoz:</div>
              <div class="print-text">
                {{ client.name }}
              </div>
            </div>
            <div class="flex justify-between print-text whitespace-nowrap">
              <div class="print-text">To'lov Usuli:</div>
              <div class="print-text">
                {{ saledType }}
              </div>
            </div>
          </div>
          <div class="print-text text-lg">
            <div class="print-text font-bold">
              ----------------------------------
            </div>
          </div>
          <div
            class="w-full print-text whitespace-nowrap font-bold text-[15.5px]"
          >
            <div class="print-text">
              BigMetall.uz - Xaridingiz Uchun Rahmat!!!
            </div>
          </div>
          <div class="print-text text-lg">
            <div class="print-text font-bold">
              ----------------------------------
            </div>
          </div>
          <div
            class="print-text w-full text-[13px] font-bold justify-center flex items-center"
          >
            <img
              src="/qr.png"
              alt=""
              width="300"
              height="300"
              class="print-text"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Loader />
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "~/store";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { component as VueNumber } from "@coders-tm/vue-number-format";

const counterStore = useCounterStore();

let loading = ref(true);
let products = reactive({});
let clients = reactive({});
let sellers = reactive({});
let seller = ref("");
let client = ref("");
let saledType = ref("");
let isPopupOpen = ref(false);
let productOne = ref([]);
let quantityProduct = ref();
let saledPrice = ref();
let phones = ref({});
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
    const clientRes = await $host.get("/clients");
    clients = clientRes.data.sort((a, b) => a.name.localeCompare(b.name));
    const sellerRes = await $host.get("/sellers");
    sellers = sellerRes.data.sort((a, b) => a.name.localeCompare(b.name));
    products = counterStore.get();
    const PhonesRes = await $host.get("/phone");
    phones.value = PhonesRes.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const total = computed(() => {
  if (Array.isArray(products)) {
    const hasNullPrice = products.some((product) => product.saledPrice == null);

    if (hasNullPrice) {
      return "Narx Kiriting";
    }

    return products.reduce((total, product) => {
      if (product.name === "List" || product.name === "Planka") {
        return (
          total +
          ((product.uzunligi_y * product.uzunligi_x) / 10000) *
            product.saledPrice *
            product.quantity
        );
      } else {
        return (
          total +
          (product.saledPrice || 0) * product.quantity * product.uzunligi
        );
      }
    }, 0);
  } else {
    return;
  }
});

const handleEditProductPrice = async (p) => {
  loading.value = true;
  try {
    isPopupOpen.value = true;
    const { quantity, ...productData } = p;
    quantityProduct.value = quantity;
    const product = await $host.post("/productId", productData);
    productOne.value = product.data;
  } catch (error) {
    return console.log(error);
  }
  loading.value = false;
};
const handleDeleteProduct = (p) => {
  counterStore.productDelete(p);
};
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $host.put("/product", {
      saledPrice: saledPrice.value,
      quantity: quantityProduct.value,
      product: productOne.value,
    });
    productOne.value.saledPrice = saledPrice.value;
    productOne.value.quantity = quantityProduct.value;
    await counterStore.update(productOne.value);
    window.location.reload();
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};
const submitAll = async () => {
  loading.value = true;
  try {
    if (products.length == 0) {
      loading.value = false;
      return Swal.fire({
        icon: "error",
        title: "Xatolik",
      });
    }
    if (seller.value == "") {
      loading.value = false;
      return Swal.fire({
        icon: "error",
        title: "Xatolik",
      });
    }
    if (!client.value) {
      loading.value = false;
      return Swal.fire({
        icon: "error",
        title: "Mijoz tanlanmagan",
      });
    }
    if (!saledType.value) {
      loading.value = false;
      return Swal.fire({
        icon: "error",
        title: "To'lov turini tanglang",
      });
    }
    if (isNaN(total.value)) {
      loading.value = false;
      return Swal.fire(
        "Narx Kiritilmagan",
        "Barcha mahsulotlar uchun sotuv narxini kiriting",
        "error"
      );
    }
    await $host.post("/sell", {
      seller: seller.value,
      products: products,
      client: client.value,
      saledType: saledType.value,
      total: total.value,
    });
    await counterStore.resetAll();
    await Swal.fire(
      "Muvaffiqatli",
      "Belgilangan Mahsulotlar chiqarildi",
      "success"
    );
    navigateTo("/1/chiqim");
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};
const formatNumberWithSpaces = (number) => {
  if (typeof number === "number") {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  return number;
};
</script>
<style>
@media print {
  body,
  html {
    position: relative;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .print-wrapper {
    width: 100%;
    max-width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .print-content {
    width: 100%;
  }
}
</style>