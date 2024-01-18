<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold">Telefon Raqamni O'zgartirish</span>
    </div>
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl min-h-[70vh]"
    >
      <div class="items-center max-w-lg mx-auto">
        <form @submit="handleSubmit">
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Birinchi Telefon Raqam</label
            >
            <input
              type="text"
              v-model="one"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Ikkinchi Telefon Raqam</label
            >
            <input
              type="text"
              v-model="two"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Tasdiqlash
          </button>
        </form>
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

let loading = ref(true);
let one = ref("");
let two = ref("");

onMounted(async () => {
  try {
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    const resPhone = await $host.get("/phone");
    one.value = resPhone.data.one;
    two.value = resPhone.data.two;
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
});
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    const res = await $host.post("/phone", {
      one: one.value,
      two: two.value,
    });
    if (res.data.status == "success") {
      await Swal.fire({
        icon: "success",
        title: "Yuborildi",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
</script>