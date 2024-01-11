<template>
  <div v-if="!loading">
    <section class="bg-gray-50">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <div class="m-4 text-center">
          <NuxtLink
            to="/login"
            class="text-2xl font-bold flex text-center items-center"
          >
            <div class="px-2 py-1 bg-[#196CF4] rounded-[8px] text-white">
              BIG
            </div>
            <div class="text-[#196CF4]">METALL</div>
          </NuxtLink>
        </div>
        <div
          class="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0 border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form class="space-y-4 md:space-y-6" @submit="handleSubmit">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Login</label
                >
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required
                  v-model="username"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Parol</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  required=""
                  v-model="password"
                />
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Kirish
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>
<script setup>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

let username = ref("");
let password = ref("");
let loading = ref(true);
onMounted(() => {
  if (localStorage.getItem("token")) {
    return (window.location.href = "/");
  }
  loading.value = false;
});
const handleSubmit = async (e) => {
  loading.value = true;
  e.preventDefault();
  try {
    const res = await $host.post("/login", {
      login: username.value,
      password: password.value,
    });
    localStorage.setItem("token", res.data.token);
    await Swal.fire({
      icon: "success",
      title: "Muvaffaqiyatli kirdingiz",
    });
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    loading.value = false;
    Swal.fire({
      icon: "error",
      title: error.response.data.message,
    });
  }
};
definePageMeta({
  layout: false,
});
</script>