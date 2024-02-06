<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold">Kompaniya Qarzdorliklari</span>
    </div>
    <div class="shadow-2xl border border-gray-300 items-center">
      <div class="flex p-4 justify-between">
        <div class="flex items-center gap-x-[2%]">
          <div class="items-center w-full">
            <VueDatePicker
              class="border border-gray-500 rounded-[5px] min-w-[350px] z-1"
              v-model="date"
              range
              :max-date="new Date()"
              time-picker-inline
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <table class="w-full text-[14px]">
        <thead>
          <tr>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Qarz Oluvchi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Qarz Beruvchi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Mahsulot Soni
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Umumiy Summasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'langan Summasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Qolgan Summasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Qabul Qilingan Sanasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'lov Turi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Ma'lumotlar
            </th>
          </tr>
        </thead>
        <tbody v-for="item in products" :key="item._id">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td class="px-5 py-3 border-b border-gray-300">BIG METALL</td>
            <td class="px-5 py-3 border-b border-gray-300">
              {{ item.seller }}
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.products.length }}</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{
                  item.allAmount
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                so'm
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{
                  item.payedAmount
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                so'm
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{
                  (item.allAmount - item.payedAmount)
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                so'm
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.date }}</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">Qarz</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <NuxtLink :to="`/1/business/${item._id}`">
                  <UButton size="lg">Batafsil</UButton>
                </NuxtLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
      <table class="w-full text-[14px]">
        <thead>
          <tr>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Qarz Oluvchi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Qarz Beruvchi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Mahsulot Soni
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Umumiy Summasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'langan Summasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Qolgan Summasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Qabul Qilingan Sanasi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              To'lov Turi
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Ma'lumotlar
            </th>
          </tr>
        </thead>
        <tbody v-for="item in productsPayed" :key="item._id">
          <tr class="hover:bg-gray-200 cursor-pointer w-full">
            <td class="px-5 py-3 border-b border-gray-300">BIG METALL</td>
            <td class="px-5 py-3 border-b border-gray-300">
              {{ item.seller }}
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.products.length }}</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{
                  item.allAmount
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                so'm
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{
                  item.payedAmount
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                so'm
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{
                  (item.allAmount - item.payedAmount)
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                so'm
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.date }}</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">Qarz(To'langan)</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <NuxtLink :to="`/1/business/${item._id}`">
                  <UButton size="lg">Batafsil</UButton>
                </NuxtLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
let loading = ref(true);
let products = ref([]);
let productsPayed = ref([]);
let date = ref([]);
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
onMounted(async () => {
  try {
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    const productsRes = await $host.get("/businessdebt");
    products.value = productsRes.data;
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
    date.value = [startDate, endDate];
    const productsPayedRes = await $host.post("/businessdebt/payed", {
      startDate,
      endDate,
    });
    productsPayed.value = productsPayedRes.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
watchEffect(async () => {
  loading.value = true;
  try {
    const productsPayedRes = await $host.post("/businessdebt/payed", {
      startDate: date.value && date.value[0] ? date.value[0] : null,
      endDate: date.value && date.value[1] ? date.value[1] : null,
    });
    productsPayed.value = productsPayedRes.data;
  } catch (error) {
    return console.log(error);
  }
  loading.value = false;
});
</script>