<template>
  <div class="hidden-print">
    <template v-if="!loading">
      <NewLayout>
        <div class="mb-2">
          <span class="text-2xl font-semibold">Chiqim</span>
        </div>
        <div
          class="mt-8 text-[13px] bg-white border borer-gray-50 shadow-2xl p-4 print-table"
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
                      <div>{{ item.uzunligi * item.quantity }}m</div>
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
                            : `${(
                                item.saledPrice *
                                item.uzunligi *
                                item.quantity
                              )
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
                    >1m uchun sotuv narxini kiriting
                  </label>
                  <input
                    v-model="saledPrice"
                    type="number"
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
      </NewLayout>
    </template>
    <template v-else>
      <Loader />
    </template>
  </div>
</template>

<script setup>
import { useCounterStore } from "~/store";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

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
onMounted(async () => {
  try {
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    const clientRes = await $host.get("/clients");
    clients = clientRes.data.sort((a, b) => a.name.localeCompare(b.name));
    const sellerRes = await $host.get("/sellers");
    sellers = sellerRes.data.sort((a, b) => a.name.localeCompare(b.name));
    products = counterStore.get();
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
      if (product.name === "List") {
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
<style scoped>
@media print {
  .hidden-print {
    visibility: hidden;
  }
  .print-table {
    font-size: 12px;
    visibility: visible;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>