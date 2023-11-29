<template>
  <NewLayout>
    <div class="mb-2">
      <span class="text-2xl font-semibold">Kirim</span>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <div class="items-center max-w-lg mx-auto">
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Temir Mahsulot Turi</label
          >
          <select
            v-model="mahsulotTuri"
            @change="handleChangeMahsulotTuri"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option key="Dvuxtavr">Dvuxtavr</option>
            <option key="Shvellir">Shvellir</option>
            <option key="Ugalok">Ugalok</option>
            <option key="Truba">Truba</option>
            <option key="List">List</option>
            <option key="Armatura">Armatura</option>
            <option key="Kvadrad profil">Kvadrad profil</option>
            <option key="Kvadrat prut">Kvadrat prut</option>
            <option key="Prut">Prut</option>
            <option key="Palasa">Palasa</option>
            <option key="Planka">Planka</option>
          </select>
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Qalinligi(sm)</label
          >
          <input
            type="number"
            step="0.01"
            v-model="qalinligi"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Kategoriyasi</label
          >
          <select
            v-model="category"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option v-for="(item, id) in categories" :key="id" :value="item">
              {{ item }}
            </option>
          </select>
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
          </select>
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-gray-900"
            >Uzunligi (m)</label
          >
          <input
            type="number"
            step="0.01"
            v-model="uzunligi"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
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
            required
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
            >Tan Narxi(1 dona uchun)</label
          >
          <input
            ref="numericInput"
            v-model="tanNarxi"
            class="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          <input
            ref="numericInput"
            @change="HandleChangeTanNarxi"
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
  </NewLayout>
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
let categories = ref([
  "K-1",
  "K-2",
  "K-3",
  "K-4",
  "K-5",
  "K-6",
  "B-1",
  "B-2",
  "B-3",
  "B-4",
  "B-5",
  "Sh-1",
  "Sh-2",
  "Sh-3",
  "Sh-4",
  "Sh-5",
  "MK-1",
  "MK-2",
  "MK-3",
  "MK-4",
  "MK-5",
]);
let category = ref("");
let tanNarxi = ref("");
const numericInput = ref(null);
const value = ref(0);

onMounted(async () => {
  try {
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    const omborsRes = await $host.get("/sklad");
    ombors.value = omborsRes.data;
    new AutoNumeric(numericInput.value, value.value, {
      decimalPlaces: 0,
    });

    numericInput.value.addEventListener("change", () => {
      value.value = numericInput.value.getNumericString();
    });
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const handleChangeMahsulotTuri = () => {
  if (mahsulotTuri.value == "Truba") {
    categories.value = ["Spiral", "Elektra Svarnoy", "Bez-Shov"];
  } else if (mahsulotTuri.value == "Dvuxtavr") {
    categories.value = [
      "K-1",
      "K-2",
      "K-3",
      "K-4",
      "K-5",
      "K-6",
      "B-1",
      "B-2",
      "B-3",
      "B-4",
      "B-5",
      "Sh-1",
      "Sh-2",
      "Sh-3",
      "Sh-4",
      "Sh-5",
      "MK-1",
      "MK-2",
      "MK-3",
      "MK-4",
      "MK-5",
    ];
  } else if (mahsulotTuri.value == "List") {
    categories.value = ["oddiy", "reflonniy"];
  } else {
    categories.value = [];
  }
};
const handleSubmit = async (e) => {
  e.preventDefault();
  if (
    ombor.value == "" ||
    qalinligi.value == "" ||
    holati.value == "" ||
    uzunligi.value == "" ||
    quantity.value == "" ||
    tanNarxi.value == ""
  ) {
    console.log("Ombor ", ombor.value);
    console.log("Qalinligi ", qalinligi.value);
    console.log("Holati ", holati.value);
    console.log("Uzunligi ", uzunligi.value);
    console.log("Quantity ", quantity.value);
    console.log("Value ", value.value);
    console.log("Tan Narxi", tanNarxi.value);
    return Swal.fire({
      icon: "error",
      title: "Barcha Parametrlarni kiriting",
    });
  }
  try {
    await $host.put("/products", {
      name: mahsulotTuri.value,
      qalinligi: qalinligi.value,
      category: category.value,
      holati: holati.value,
      uzunligi: uzunligi.value,
      quantity: quantity.value,
      sklad: ombor.value,
      price: value.value,
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
  console.log(tanNarxi.value);
};
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }

  table {
    visibility: visible;
    position: absolute;
    top: 0%;
    left: 0%;
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
