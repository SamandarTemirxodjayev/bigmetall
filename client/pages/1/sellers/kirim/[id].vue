<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold"
        >Sotuvchi - {{ seller.name }} - Kirim Qilingan Mahsulotlar</span
      >
    </div>
    <div class="items-center bg-white shadow-xl rounded-md">
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
                <UButton size="lg"> Batafsil </UButton>
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
              Batafsil
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
          <div class="flex justify-between gap-[1%] mb-4">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Mahsulot Nomi</label
              >
              <UInput disabled :value="product.name" size="xl" />
            </div>
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                O'lchamlari</label
              >
              <UInput disabled :value="product.olchamlari" size="xl" />
            </div>
          </div>
          <div class="flex justify-between gap-[1%] mb-4">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Kategoriyasi</label
              >
              <UInput disabled :value="product.category" size="xl" />
            </div>
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Qalinligi</label
              >
              <UInput
                disabled
                size="xl"
                v-if="product.qalinligi_ortasi"
                :value="`Orta: ${product.qalinligi_ortasi}mm, Chet: ${product.qalinligi}mm`"
              />

              <UInput
                size="xl"
                disabled
                v-else
                :value="`${product.qalinligi}mm`"
              />
            </div>
          </div>

          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Holati</label
            >
            <UInput disabled :value="product.holati" size="xl" />
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Soni</label
            >
            <UInput disabled :value="product.quantity" size="xl" />
          </div>
          <div class="mb-4">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-700"
              >Uzunligi
            </label>
            <div
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-not-allowed"
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
          <div class="flex justify-between gap-[1%] mb-4">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Kirim Narxi 1m uchun</label
              >
              <UInput
                disabled
                :value="
                  product.price
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                "
                size="xl"
              />
            </div>
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-700"
              >
                Sotuv Narxi 1m uchun</label
              >
              <UInput
                disabled
                :value="
                  product.saledPrice
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                "
                size="xl"
              />
            </div>
          </div>
        </div>
      </UCard>
    </UModal>
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
