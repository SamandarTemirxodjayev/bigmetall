<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold"
        >Sotuvchi - {{ seller.name }} - Kirim Qilingan Mahsulotlar</span
      >
    </div>
    <div class="shadow items-center bg-white shadow-xl rounded-md">
      <div class="flex w-[30%] p-4 justify-between">
        <VueDatePicker
          v-model="date"
          range
          :max-date="new Date()"
          time-picker-inline
        />
      </div>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <table class="w-full">
        <thead>
          <tr>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Mahsulot Nomi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Mahsulot Soni
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Umumiy Summasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Qabul Qilingan Sanasi va Vaqti
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Ma'lumotlar
            </th>
          </tr>
        </thead>
        <tbody v-for="item in products" :key="item._id">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.name }}</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.quantity }} ta</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <template v-if="item.uzunligi">
                <div>
                  {{
                    item.price == null
                      ? "Narx belgilanmagan"
                      : `${(item.price * item.uzunligi * item.quantity)
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`
                  }}
                </div>
              </template>
              <template v-else>
                <div>
                  {{
                    item.price == null
                      ? "Narx belgilanmagan"
                      : `${(
                          ((item.price * (item.uzunligi_x * item.uzunligi_y)) /
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
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ formatTime(item.date) }}
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text" @click="handleAboutClick(item)">
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Batafsil
                </button>
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
      <div
        class="bg-white p-10 rounded-md shadow-lg w-[400px] overflow-y-auto max-h-[500px]"
      >
        <button
          @click="() => (isPopupOpen = false)"
          class="relative -top-8 -right-8 float-right text-gray-500 hover:text-gray-700"
        >
          <Icon name="material-symbols:close" width="25" height="25" />
        </button>

        <div>
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Mahsulot Nomi</label
            >
            <input
              disabled
              :value="product.name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              O'lchamlari</label
            >
            <input
              disabled
              :value="product.olchamlari"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Kategoriyasi</label
            >
            <input
              disabled
              :value="product.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Qalinligi</label
            >
            <div
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <div v-if="product.qalinligi_ortasi">
                O'rta: {{ product.qalinligi_ortasi }}mm<br />
                Chet: {{ product.qalinligi }}mm
              </div>
              <div v-else>{{ product.qalinligi }}mm</div>
            </div>
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Holati</label
            >
            <input
              disabled
              :value="product.holati"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Uzunligi</label
            >
            <div
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <template
                v-if="
                  product.name == 'Palasa' ||
                  product.name == 'Kvadrat prut' ||
                  product.name == 'Kvadrad profil'
                "
              >
                <div>
                  Uzunligi: {{ product.uzunligi }}m <br />
                  Bo'yi: {{ product.uzunligi_x }}sm <br />
                  Eni: {{ product.uzunligi_y }}sm
                </div>
              </template>
              <template v-else-if="product.uzunligi">
                <div>{{ product.uzunligi }}m</div>
              </template>
              <template v-else>
                <div>
                  Bo'yi: {{ product.uzunligi_x }}sm <br />
                  Eni: {{ product.uzunligi_y }}sm
                </div>
              </template>
            </div>
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Soni</label
            >
            <input
              disabled
              :value="product.quantity"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Kirim Narxi 1m uchun</label
            >
            <input
              disabled
              :value="
                product.price
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
              "
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Sotuv Narxi 1m uchun</label
            >
            <input
              disabled
              :value="
                product.saledPrice
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
              "
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const route = useRoute();

let date = ref([]);
let isPopupOpen = ref(false);
let loading = ref(true);
let search = ref("Hammasi");
let seller = ref("");
let products = reactive({});
let product = ref({});

onMounted(async () => {
  try {
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    seller.value = (await $host.get("/seller/" + route.params.id)).data;
    const resProducts = await $host.get("/products/seller/" + route.params.id);
    products = resProducts.data;
  } catch (error) {
    console.log(error);
  }
  const endDate = new Date();
  const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
  date.value = [startDate, endDate];
  loading.value = false;
});
const handleAboutClick = async (item) => {
  product.value = item;
  isPopupOpen.value = true;
};
const handleChangeDate = () => {
  console.log(date.value);
};
watchEffect(async () => {
  loading.value = true;
  try {
    const res = await $host.post("/products/seller/" + route.params.id, {
      startDate: date.value && date.value[0] ? date.value[0] : null,
      endDate: date.value && date.value[1] ? date.value[1] : null,
    });
    products = res.data;
    const combinedProducts = {};

    products.forEach((product) => {
      const key = JSON.stringify({
        name: product.name,
        sellerId: product.sellerId,
        qalinligi: product.qalinligi,
        qalinligi_ortasi: product.qalinligi_ortasi,
        olchamlari: product.olchamlari,
        category: product.category,
        holati: product.holati,
        uzunligi: product.uzunligi,
        uzunligi_x: product.uzunligi_x,
        uzunligi_y: product.uzunligi_y,
        sklad: product.sklad,
        price: product.price,
        saledPrice: product.saledPrice,
        saled: product.saled,
        cut: product.cut,
        createdAt: product.createdAt,
      });

      if (combinedProducts[key]) {
        combinedProducts[key].quantity += 1;
      } else {
        combinedProducts[key] = {
          ...product,
          quantity: 1,
        };
      }
    });

    products = Object.values(combinedProducts);
  } catch (error) {
    return console.log(error);
  }
  loading.value = false;
});
</script>
