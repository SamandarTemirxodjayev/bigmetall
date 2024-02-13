<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold">Chiqim</span>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <div class="flex justify-between text-center">
        <div class="flex gap-[2%]">
          <div class="mb-6">
            <USelect
              v-model="mahsulotTuri"
              @change="handleChangeMahsulotTuri"
              size="xl"
              :options="['Hammasi', ...MahsulotName]"
              placeholder="Temir mahsulot turi"
              class="max-w-[180px]"
              :disabled="isSearchLoading"
            />
          </div>
          <div class="mb-6">
            <UInput
              v-model="category"
              size="xl"
              placeholder="Kategoriyasi"
              class="max-w-[180px]"
              :disabled="isSearchLoading"
            />
          </div>
          <div class="mb-6">
            <UInput
              v-model="qalinligi"
              size="xl"
              class="max-w-[180px]"
              placeholder="Qalinligi"
              :disabled="isSearchLoading"
            />
          </div>
          <div class="mb-6" v-if="mahsulotTuri == 'Dvuxtavr'">
            <UInput
              v-model="qalinligi_ortasi"
              size="xl"
              class="max-w-[180px]"
              placeholder="Qalinligi O'rtasi"
              :disabled="isSearchLoading"
            />
          </div>
          <div class="mb-6">
            <USelect
              v-model="holati"
              size="xl"
              placeholder="Holati"
              :options="['Hammasi', 'Yangi', 'Eski', 'B/U']"
              class="max-w-[180px]"
              :disabled="isSearchLoading"
            />
          </div>
          <div class="mb-6">
            <UInput
              size="xl"
              v-model="uzunligi"
              :disabled="isSearchLoading"
              lass="max-w-[180px]"
              placeholder="Uzunligi"
            />
          </div>
          <div class="mb-6">
            <UButton
              size="xl"
              icon="i-heroicons-magnifying-glass-20-solid"
              :loading="isSearchLoading"
              @click="handleSearchItems"
            />
          </div>
        </div>
        <div class="mb-7">
          <template v-if="totalQuantity == 0">
            <UButton size="xl" disabled class="mx-1 mb-1">
              Umumiy Summasi
              {{ totalSummary }}
              so'm
            </UButton>
            <UButton size="xl" disabled class="mx-1 mb-1"> Tasdiqlash </UButton>
          </template>
          <template v-else>
            <UButton size="xl" class="mx-1 mb-1">
              Umumiy Summasi
              {{
                totalSummary
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              }}
              so'm
            </UButton>
            <UButton size="xl" class="mx-1 mb-1">
              Umumiy Uzunligi
              {{
                totalUzunligi
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              }}
              m
            </UButton>
            <NuxtLink to="/1/chiqim/cart" class="mx-1">
              <UButton size="xl"> Tasdiqlash </UButton>
            </NuxtLink>
          </template>
        </div>
      </div>

      <table class="w-full text-[12px]">
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
              Umumiy Uzunligi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              1 m Uchun Sotuv Narxi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">Ombor</th>
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
              <template v-if="item.cut"> {{ item.name }} (kesilgan) </template>
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
                    (item.uzunligi_y * item.uzunligi_x * item.quantity) / 10000
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
              {{ sklads.find((x) => (x._id == item.sklad ? x : false)).name }}
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div>
                <template
                  v-if="
                    storeItems.some((p) => {
                      if (
                        p.name == item.name &&
                        p.qalinligi == item.qalinligi &&
                        p.qalinligi_ortasi == item.qalinligi_ortasi &&
                        p.olchamlari == item.olchamlari &&
                        p.category == item.category &&
                        p.holati == item.holati &&
                        p.uzunligi == item.uzunligi &&
                        p.uzunligi_y == item.uzunligi_y &&
                        p.uzunligi_x == item.uzunligi_x &&
                        p.sklad == item.sklad &&
                        p.price == item.price &&
                        p.saledPrice == item.saledPrice &&
                        p.cut == item.cut
                      ) {
                        return true;
                      } else {
                        return false;
                      }
                    })
                  "
                >
                  <div
                    class="flex items-center justify-center gap-2 text-center"
                  >
                    <button
                      @click="deleteProduct(item._id)"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                    >
                      -
                    </button>
                    <div class="mr-2 mb-1">
                      {{
                        storeItems.find(
                          (p) =>
                            p.name == item.name &&
                            p.qalinligi == item.qalinligi &&
                            p.qalinligi_ortasi == item.qalinligi_ortasi &&
                            p.olchamlari == item.olchamlari &&
                            p.category == item.category &&
                            p.holati == item.holati &&
                            p.uzunligi == item.uzunligi &&
                            p.uzunligi_y == item.uzunligi_y &&
                            p.uzunligi_x == item.uzunligi_x &&
                            p.sklad == item.sklad &&
                            p.price == item.price &&
                            p.saledPrice == item.saledPrice &&
                            p.cut == item.cut
                        ).quantity
                      }}
                    </div>
                    <button
                      @click="add(item._id)"
                      type="button"
                      :disabled="
                        item.quantity ==
                        storeItems.find(
                          (p) =>
                            p.name == item.name &&
                            p.qalinligi == item.qalinligi &&
                            p.qalinligi_ortasi == item.qalinligi_ortasi &&
                            p.olchamlari == item.olchamlari &&
                            p.category == item.category &&
                            p.holati == item.holati &&
                            p.uzunligi == item.uzunligi &&
                            p.uzunligi_y == item.uzunligi_y &&
                            p.uzunligi_x == item.uzunligi_x &&
                            p.sklad == item.sklad &&
                            p.price == item.price &&
                            p.saledPrice == item.saledPrice &&
                            p.cut == item.cut
                        ).quantity
                      "
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </template>
                <template v-else>
                  <div class="flex">
                    <button
                      @click="add(item._id)"
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                    >
                      Qo'shish
                    </button>
                    <button
                      @click="handleCutItem(item._id)"
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 focus:outline-none"
                    >
                      <Icon name="mdi:hand-saw" size="1.5em" />
                    </button>
                  </div>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="items-center justify-center flex mt-10">
        <UPagination
          size="xl"
          :prev-button="{
            icon: 'i-heroicons-arrow-small-left-20-solid',
            label: 'Oldingisi',
            color: 'gray',
          }"
          :next-button="{
            icon: 'i-heroicons-arrow-small-right-20-solid',
            trailing: true,
            label: 'Keyingisi',
            color: 'gray',
          }"
          v-model="page"
          :page-count="1"
          :total="maxPage"
        />
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
              Kesish
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
          <div>Mahsulot Nomi: {{ product.name }}</div>
          <div>O'lchamlari: {{ product.olchamlari }}</div>
          <div>Kategoriyasi: {{ product.category }}</div>
          <div>
            Qalinligi:
            {{
              product.qalinligi_ortasi
                ? `${product.qalinligi_ortasi}mm/${product.qalinligi}`
                : product.qalinligi
            }}mm
          </div>
          <div>Holati: {{ product.holati }}</div>
          <div>Uzunligi: {{ product.uzunligi }}m</div>
          <div>1M uchun Sotuv Narxi: {{ product.saledPrice }} so'm</div>
          <form @submit="handleSubmitCut">
            <div class="my-4">
              <UMeter
                :value="cutRange"
                :min="0"
                :max="product.uzunligi - 0.01"
              />
            </div>
            <div class="my-4">
              <input
                type="number"
                :max="product.uzunligi - 0.01"
                min="0.01"
                step="0.01"
                v-model="cutRange"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <button
              @click="handleSubmit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Tasdiqlash
            </button>
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
import { useCounterStore } from "~/store";

const counterStore = useCounterStore();

let storeItems = ref();

const add = (product) => {
  counterStore.add(product);
};
const deleteProduct = (product) => {
  counterStore.deleteProduct(product);
};
const totalQuantity = computed(() => {
  return storeItems.value.reduce((total, item) => total + item.quantity, 0);
});
const totalSummary = computed(() => {
  return storeItems.value.reduce((total, item) => {
    if (item.name !== "List") {
      return total + item.uzunligi * item.saledPrice * item.quantity;
    } else {
      return (
        total +
        ((item.uzunligi_y * item.uzunligi_x) / 10000) *
          item.saledPrice *
          item.quantity
      );
    }
  }, 0);
});
const totalUzunligi = computed(() => {
  return storeItems.value.reduce((total, item) => {
    if (item.name !== "List") {
      return total + item.uzunligi * item.quantity;
    } else {
      return 0;
    }
  }, 0);
});

let loading = ref(true);
let isSearchLoading = ref(false);
let mahsulotTuri = ref("");
let products = ref([]);
let product = ref();
let isPopupOpen = ref(false);
let MahsulotName = ref([
  "Dvuxtavr",
  "Shvellir",
  "Ugalok",
  "Truba",
  "List",
  "Armatura",
  "Kvadrad profil",
  "Kvadrat prut",
  "Prut",
  "Palasa",
  "Planka",
]);
let categories = ref([]);
let category = ref("");
let holati = ref("Hammasi");
let qalinliglari = ref([]);
let qalinligi = ref("");
let qalinligi_ortasi = ref("");
let saledType = ref("");
let sklads = ref([]);
let cutRange = ref(0);
let uzunligi = ref("");
let page = ref(1);
let maxPage = ref(100);

onMounted(async () => {
  try {
    storeItems.value = counterStore.get();
    const productsRes = await $host.get(`/products`, {
      params: {
        page: page.value,
        limit: 30,
      },
    });
    products.value = productsRes.data.products;
    page.value = productsRes.data.currentPage;
    maxPage.value = productsRes.data.totalPages;
    categories.value = products.value.map((item) => item.category);
    categories.value = [...new Set(categories.value)];
    qalinliglari.value = products.value.map((item) =>
      item.qalinligi_ortasi
        ? `${item.qalinligi_ortasi}/${item.qalinligi}`
        : `${item.qalinligi}`
    );
    qalinliglari.value = [...new Set(qalinliglari.value)];
    const skladsRes = await $host.get("/sklads");
    sklads.value = skladsRes.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const handleCutItem = async (item) => {
  isPopupOpen.value = true;
  product.value = item;
};
const handleSubmitCut = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $host.post("/cut", {
      product: product.value,
      cut: cutRange.value,
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};
watch(page, async () => {
  loading.value = true;
  try {
    if (
      (mahsulotTuri.value == "" || mahsulotTuri.value == "Hammasi") &&
      category.value == "" &&
      holati.value == "Hammasi" &&
      qalinligi.value == "" &&
      qalinligi_ortasi.value == "" &&
      uzunligi.value == ""
    ) {
      let productsRes = await $host.get(`/products`, {
        params: {
          page: page.value,
          limit: 30,
        },
      });
      products.value = productsRes.data.products;
      page.value = productsRes.data.currentPage;
      maxPage.value = productsRes.data.totalPages;
      isSearchLoading.value = false;
      return (loading.value = false);
    }
    let productsRes = await $host.patch("/products", {
      mahsulot: mahsulotTuri.value,
      category: category.value,
      holati: holati.value == "Hammasi" ? "" : holati.value,
      qalinligi: qalinligi.value,
      qalinligi_ortasi: qalinligi_ortasi.value,
      uzunligi: uzunligi.value,
      page: page.value,
      limit: 30,
    });
    products.value = productsRes.data.products;
    page.value = productsRes.data.currentPage;
    maxPage.value = productsRes.data.totalPages;
    return (loading.value = false);
  } catch (error) {
    return console.log(error);
  }
});
const handleSearchItems = async () => {
  isSearchLoading.value = true;
  try {
    if (
      (mahsulotTuri.value == "" || mahsulotTuri.value == "Hammasi") &&
      category.value == "" &&
      holati.value == "Hammasi" &&
      qalinligi.value == "" &&
      qalinligi_ortasi.value == "" &&
      uzunligi.value == ""
    ) {
      isSearchLoading.value = true;
      let productsRes = await $host.get(`/products`, {
        params: {
          page: page.value,
          limit: 30,
        },
      });
      products.value = productsRes.data.products;
      page.value = productsRes.data.currentPage;
      maxPage.value = productsRes.data.totalPages;
      isSearchLoading.value = false;
      return (isSearchLoading.value = false);
    }
    let productsRes = await $host.patch("/products", {
      mahsulot: mahsulotTuri.value,
      category: category.value,
      holati: holati.value == "Hammasi" ? "" : holati.value,
      qalinligi: qalinligi.value,
      qalinligi_ortasi: qalinligi_ortasi.value,
      uzunligi: uzunligi.value,
      page: page.value,
      limit: 30,
    });
    products.value = productsRes.data.products;
    page.value = 1;
    maxPage.value = productsRes.data.totalPages;
  } catch (error) {
    products.value = [];
    return console.log(error);
  }
  isSearchLoading.value = false;
};
const handleChangeMahsulotTuri = () => {
  category.value = "";
  holati.value = "Hammasi";
  qalinligi.value = "";
  qalinligi_ortasi.value = "";
  uzunligi.value = "";
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
