<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold">Kirim</span>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <form @submit="handleSubmit">
        <div class="grid grid-cols-2 gap-[5%]">
          <div
            class="w-[100%] grid grid-cols-4 gap-x-[7%] grid-span-2 grid-rows-5"
          >
            <div class="w-full col-span-2 mb-4">
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Temir Mahsulot Turi</label
              >
              <div>
                <USelect
                  v-model="mahsulotTuri"
                  class="w-full"
                  size="xl"
                  :options="
                    MahsulotName.map((item) => ({
                      name: item,
                    }))
                  "
                  option-attribute="name"
                  value-attribute="name"
                  required
                />
              </div>
            </div>

            <div class="w-full col-span-2 mb-4">
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Sotuvchi</label
              >
              <USelect
                v-model="seller"
                class="w-full"
                size="xl"
                :options="
                  sellers.map((seller) => ({
                    name: `${seller.name}(${seller.phone})`,
                    id: seller._id,
                  }))
                "
                option-attribute="name"
                value-attribute="id"
                required
              />
            </div>

            <div class="col-span-4 mb-4">
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >O'lchamlari</label
              >
              <UInput v-model="olchamlari" size="lg" required />
            </div>

            <div class="col-span-4 mb-4">
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Kategoriyasi</label
              >
              <UInput v-model="category" size="lg" required />
            </div>

            <div
              class="w-full col-span-2 mb-4"
              v-if="mahsulotTuri == 'Dvuxtavr'"
            >
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Qalinligi o'rtasi(mm)</label
              >
              <input
                type="number"
                step="0.01"
                min="0"
                v-model="qalinligiOrtasi"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div
              class="w-full col-span-2 mb-4"
              v-if="mahsulotTuri == 'Dvuxtavr'"
            >
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Qalinligi chetlari(mm)</label
              >
              <input
                type="number"
                step="0.01"
                min="0"
                required
                v-model="qalinligi"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div
              class="w-full col-span-4 mb-4"
              v-if="mahsulotTuri != 'Dvuxtavr'"
            >
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Qalinligi(mm)</label
              >
              <input
                type="number"
                required
                step="0.01"
                v-model="qalinligi"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div class="w-full col-span-4 mb-4">
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Tan Narxi(1m uchun)</label
              >
              <VueNumber
                v-model="tanNarxi"
                v-bind="number"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div
            class="w-[100%] grid grid-cols-4 gap-x-[7%] grid-span-2 grid-rows-5"
          >
            <div class="w-full col-span-2 mb-4">
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Holati</label
              >
              <USelect
                v-model="holati"
                size="lg"
                :options="['Yangi', 'Eski', 'B/U']"
                required
              />
            </div>

            <div class="w-full col-span-2 mb-4">
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Ombor</label
              >
              <USelect
                v-model="ombor"
                size="lg"
                :options="
                  ombors.map((item) => ({
                    name: item.name,
                    id: item._id,
                  }))
                "
                option-attribute="name"
                value-attribute="id"
                required
              >
              </USelect>
            </div>

            <div
              class="w-full col-span-2 mb-4"
              v-if="
                mahsulotTuri == 'List' ||
                mahsulotTuri == 'Kvadrad profil' ||
                mahsulotTuri == 'Kvadrat prut' ||
                mahsulotTuri == 'Palasa'
              "
            >
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Uzunligi Bo'yi(sm)</label
              >
              <input
                type="number"
                step="0.01"
                min="0"
                v-model="uzunligi_x"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div
              class="w-full col-span-2 mb-4"
              v-if="
                mahsulotTuri == 'List' ||
                mahsulotTuri == 'Kvadrad profil' ||
                mahsulotTuri == 'Kvadrat prut' ||
                mahsulotTuri == 'Palasa'
              "
            >
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Uzunligi Eni(sm)</label
              >
              <input
                type="number"
                step="0.01"
                v-model="uzunligi_y"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div class="w-full col-span-4 mb-4" v-if="mahsulotTuri != 'List'">
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Uzunligi(m)</label
              >
              <input
                type="number"
                step="0.01"
                min="0"
                v-model="uzunligi"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div class="w-full col-span-4 mb-4">
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Soni</label
              >
              <input
                type="number"
                step="1"
                min="0"
                v-model="quantity"
                required
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div class="w-full col-span-4 mb-4">
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Sotuv Narxi(1m uchun)</label
              >
              <VueNumber
                v-model="sotuvNarxi"
                v-bind="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="w-full col-span-2 mb-4">
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >To'lov Turi</label
              >
              <div class="select-wrapper">
                <USelect
                  required
                  v-model="isDebt"
                  size="xl"
                  :options="[
                    {
                      name: 'Naqt',
                      id: false,
                    },
                    {
                      name: 'Qarz',
                      id: true,
                    },
                  ]"
                  option-attribute="name"
                  value-attribute="id"
                />
              </div>
            </div>
            <div v-if="isDebt" class="w-full col-span-2 mb-4">
              <label class="mb-[6px] block text-sm font-medium text-gray-900"
                >Qarzga Beruvchi</label
              >
              <UInput v-model="debtSeller" size="xl" required />
            </div>
          </div>
        </div>
        <div class="text-right">
          <UButton type="submit" size="lg"> Tasdiqlash </UButton>
        </div>
      </form>
    </div>
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
let mahsulotTuri = ref("Dvuxtavr");
let ombors = ref("");
let ombor = ref("");
let qalinligi = ref("");
let holati = ref("");
let uzunligi = ref("");
let quantity = ref("");
let category = ref("");
let tanNarxi = ref("");
let sotuvNarxi = ref("");
let olchamlari = ref("");
const numericInput = ref(null);
const value = ref(0);
const numericInput2 = ref(null);
const value2 = ref(0);
let qalinligiOrtasi = ref("");
let uzunligi_x = ref("");
let uzunligi_y = ref("");
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
let sellers = ref([]);
let seller = ref("");
let isDebt = ref(false);
let debtSeller = ref("");
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
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    const omborsRes = await $host.get("/sklad");
    ombors.value = omborsRes.data;
    const resSellers = await $host.get("/sellers");
    sellers.value = resSellers.data;
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
});
function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are zero-based
  let year = date.getFullYear();

  // Pad the day and month with leading zeros if necessary
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return day + "." + month + "." + year;
}
const handleSubmit = async (e) => {
  e.preventDefault();
  if (
    ombor.value == "" ||
    qalinligi.value == "" ||
    holati.value == "" ||
    quantity.value == "" ||
    tanNarxi.value == ""
  ) {
    return Swal.fire({
      icon: "error",
      title: "Zarur Parametrlarni kiriting",
    });
  }
  loading.value = true;
  try {
    await $host.put("/products", {
      name: mahsulotTuri.value,
      sellerId: seller.value,
      qalinligi: qalinligi.value,
      qalinligiOrtasi: qalinligiOrtasi.value,
      olchamlari: olchamlari.value,
      category: category.value,
      holati: holati.value,
      uzunligi: uzunligi.value,
      uzunligi_x: uzunligi_x.value,
      uzunligi_y: uzunligi_y.value,
      quantity: quantity.value,
      sklad: ombor.value,
      price: tanNarxi.value,
      saledPrice: sotuvNarxi.value,
      isDebt: isDebt.value,
      seller: debtSeller.value,
      date: formatDate(new Date()),
    });
    Swal.fire({
      icon: "success",
      title: "Mahsulot qo'shildi",
      showConfirmButton: false,
      timer: 1000,
    });
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};
watchEffect(() => {
  if (mahsulotTuri.value) {
    qalinligi.value = "";
    uzunligi.value = "";
    quantity.value = "";
    qalinligiOrtasi.value = "";
    uzunligi_x.value = "";
    uzunligi_y.value = "";
  }
});
const HandleChangeTanNarxi = (e) => {
  tanNarxi.value = parseInt(e.target.value.replace(",", ""));
};
const HandleChangeSotuvNarxi = (e) => {
  sotuvNarxi.value = parseInt(e.target.value.replace(",", ""));
};
</script>