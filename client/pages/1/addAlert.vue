<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold">Xabar Yuborish</span>
    </div>
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl min-h-[70vh]"
    >
      <div class="items-center max-w-lg mx-auto">
        <form @submit="handleSubmit">
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Xabaringizni Kiriting</label
            >
            <UTextarea
              resize
              v-model="text"
              color="white"
              variant="outline"
              size="lg"
              required
            />
          </div>
          <UButton type="submit" block class="px-4 py-2"> Tasdiqlash </UButton>
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
let text = ref("");

onMounted(async () => {
  try {
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
});
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    const res = await $host.put("/notices", {
      text: text.value,
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