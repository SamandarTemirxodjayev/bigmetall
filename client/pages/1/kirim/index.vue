<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold">Kirim</span>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <div class="items-center max-w-lg mx-auto">
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Sotuvchi</label
          >
          <select
            v-model="seller"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option v-for="(item, id) in sellers" :key="id" :value="item._id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Temir Mahsulot Turi</label
          >
          <select
            v-model="mahsulotTuri"
            @change="handleChangeMahsulotTuri"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option v-for="(item, id) in MahsulotName" :key="id" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >O'lchamlari</label
          >
          <input
            type="text"
            v-model="olchamlari"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Kategoriyasi</label
          >
          <input
            type="text"
            v-model="category"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div
          class="mb-6 flex justify-between"
          v-if="mahsulotTuri == 'Dvuxtavr'"
        >
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Qalinligi o'rtasi(mm)</label
            >
            <input
              type="number"
              step="0.01"
              v-model="qalinligiOrtasi"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Qalinligi chetlari(mm)</label
            >
            <input
              type="number"
              step="0.01"
              v-model="qalinligi"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
        <div class="mb-6" v-else>
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Qalinligi(mm)</label
          >
          <input
            type="number"
            step="0.01"
            v-model="qalinligi"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Holati</label
          >
          <select
            v-model="holati"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option key="Yangi">Yangi</option>
            <option key="Eski">Eski</option>
            <option key="B/U">B/U</option>
          </select>
        </div>
        <div
          class="mb-6 flex justify-between"
          v-if="
            mahsulotTuri == 'List' ||
            mahsulotTuri == 'Kvadrad profil' ||
            mahsulotTuri == 'Kvadrat prut' ||
            mahsulotTuri == 'Palasa'
          "
        >
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Uzunligi Bo'yi(sm)</label
            >
            <input
              type="number"
              step="0.01"
              v-model="uzunligi_x"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Uzunligi Eni(sm)</label
            >
            <input
              type="number"
              step="0.01"
              v-model="uzunligi_y"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
        </div>
        <div class="mb-6" v-if="mahsulotTuri != 'List'">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Uzunligi(m)</label
          >
          <input
            type="number"
            step="0.01"
            v-model="uzunligi"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Soni</label
          >
          <input
            type="number"
            step="1"
            v-model="quantity"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Ombor</label
          >
          <select
            v-model="ombor"
            @change="() => console.log(ombor)"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option v-for="item in ombors" :key="item._id" :value="item._id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Tan Narxi(1m uchun)</label
          >
          <input
            ref="numericInput"
            v-model="tanNarxi"
            class="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <input
            ref="numericInput"
            @change="HandleChangeTanNarxi"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Sotuv Narxi(1m uchun)</label
          >
          <input
            ref="numericInput2"
            v-model="sotuvNarxi"
            class="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <input
            ref="numericInput2"
            @change="HandleChangeSotuvNarxi"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <button
          @click="handleSubmit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Tasdiqlash
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import AutoNumeric from "autonumeric";

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
    new AutoNumeric(numericInput.value, value.value, {
      decimalPlaces: 0,
    });

    numericInput.value.addEventListener("change", () => {
      value.value = numericInput.value.getNumericString();
    });
    new AutoNumeric(numericInput2.value, value2.value, {
      decimalPlaces: 0,
    });

    numericInput2.value.addEventListener("change", () => {
      value2.value = numericInput2.value.getNumericString();
    });
  } catch (error) {
    console.log(error);
  }
});
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
    });
    Swal.fire({
      icon: "success",
      title: "Mahsulot qo'shildi",
      showConfirmButton: false,
      timer: 1500,
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
const HandleChangeTanNarxi = (e) => {
  tanNarxi.value = parseInt(e.target.value.replace(",", ""));
};
const HandleChangeSotuvNarxi = (e) => {
  sotuvNarxi.value = parseInt(e.target.value.replace(",", ""));
};
</script>