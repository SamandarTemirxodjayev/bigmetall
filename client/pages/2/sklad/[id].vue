<template>
  <div v-if="!loading">
    <NewHeaderAdmin2 />
    <div class="mb-2 mt-[20%] sm:mt-[5%] mx-[5%] sm:mx-[1%]">
      <span class="text-xl font-semibold">Ombordagi Mahsulotlar Ro'yxati</span>
    </div>
    <div class="shadow items-center bg-white shadow-xl rounded-md">
      <div class="flex p-4 justify-between">
        <form @submit="handleSearchSubmit">
          <div class="flex">
            <div
              class="px-5 flex items-center border border-gray-500 rounded-lg px-2 mr-3"
            >
              <select
                class="text-gray-900 text-sm block w-full p-2.5 outline-none"
                placeholder="Qidiruv"
                v-model="search"
              >
                <option value="Hammasi">Hammasi</option>
                <option
                  v-for="(item, id) in MahsulotName"
                  :key="id"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
        </form>
        <div>
          <button
            @click="handleClickDownloadExcel"
            class="text-[12px] mx-2 text-white bg-blue-500 hover:bg-blue-600 py-[8%] px-3 rounded-xl font-semibold"
          >
            Excelda Yuklab Olish
          </button>
        </div>
      </div>
    </div>
    <!-- DVUXTAVR -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl text-sm"
      v-if="search == 'Hammasi' || search == 'Dvuxtavr'"
    >
      <div class="font-bold mb-2">Dvuxtavr</div>
      <div class="overflow-x-auto hide-scrollbar">
        <table class="w-full text-sm">
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
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Holati
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Umumiy Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                1 m Uchun Narx
              </th>
            </tr>
          </thead>
          <tbody v-for="item in products" :key="item._id">
            <tr
              class="hover:bg-gray-200 cursor-pointer w-full"
              v-if="item.name == 'Dvuxtavr'"
            >
              <td class="px-5 py-3 border-b border-gray-300 min-w-[170px]">
                <div class="print-text">
                  <template v-if="item.cut">
                    {{ item.name }} (kesilgan)
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.olchamlari }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.category }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  O'rta: {{ item.qalinligi_ortasi }}mm<br />
                  Chet: {{ item.qalinligi }}mm
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.holati }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.uzunligi }}m</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.quantity }}ta</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[180px]">
                <div class="print-text">
                  {{ item.uzunligi * item.quantity }}m
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[250px]">
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(item.saledPrice.toFixed(2))} so'm`
                  }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- SHVELLIR -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl text-sm"
      v-if="search == 'Hammasi' || search == 'Shvellir'"
    >
      <div class="font-bold mb-2">Shvellir</div>
      <div class="overflow-x-auto hide-scrollbar">
        <table class="w-full text-sm">
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
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Holati
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Umumiy Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                1 m Uchun Narx
              </th>
            </tr>
          </thead>
          <tbody v-for="item in products" :key="item._id">
            <tr
              class="hover:bg-gray-200 cursor-pointer w-full"
              v-if="item.name == 'Shvellir'"
            >
              <td class="px-5 py-3 border-b border-gray-300 min-w-[170px]">
                <div class="print-text">
                  <template v-if="item.cut">
                    {{ item.name }} (kesilgan)
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.olchamlari }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.category }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.qalinligi }}mm</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.holati }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.uzunligi }}m</div>
              </td>

              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.quantity }}ta</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[180px]">
                <div class="print-text">
                  {{ item.uzunligi * item.quantity }}m
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[250px]">
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(item.saledPrice.toFixed(2))} so'm`
                  }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- UGALOK -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl text-sm"
      v-if="search == 'Hammasi' || search == 'Ugalok'"
    >
      <div class="font-bold mb-2">Ugalok</div>
      <div class="overflow-x-auto hide-scrollbar">
        <table class="w-full text-sm">
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
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Holati
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Umumiy Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                1 m Uchun Narx
              </th>
            </tr>
          </thead>
          <tbody v-for="item in products" :key="item._id">
            <tr
              class="hover:bg-gray-200 cursor-pointer w-full"
              v-if="item.name == 'Ugalok'"
            >
              <td class="px-5 py-3 border-b border-gray-300 min-w-[170px]">
                <div class="print-text">
                  <template v-if="item.cut">
                    {{ item.name }} (kesilgan)
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.olchamlari }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.category }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.qalinligi }}mm</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.holati }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.uzunligi }}m</div>
              </td>

              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.quantity }}ta</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[180px]">
                <div class="print-text">
                  {{ item.uzunligi * item.quantity }}m
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[250px]">
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(item.saledPrice.toFixed(2))} so'm`
                  }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Truba -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Truba'"
    >
      <div class="text-sm font-bold mb-2">Truba</div>
      <div class="overflow-x-auto hide-scrollbar">
        <table class="w-full text-sm">
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
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Holati
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Umumiy Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                1 m Uchun Narx
              </th>
            </tr>
          </thead>
          <tbody v-for="item in products" :key="item._id">
            <tr
              class="hover:bg-gray-200 cursor-pointer w-full"
              v-if="item.name == 'Truba'"
            >
              <td class="px-5 py-3 border-b border-gray-300 min-w-[170px]">
                <div class="print-text">
                  <template v-if="item.cut">
                    {{ item.name }} (kesilgan)
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.olchamlari }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.category }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.qalinligi }}mm</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.holati }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.uzunligi }}m</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.quantity }}ta</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[180px]">
                <div class="print-text">
                  {{ item.uzunligi * item.quantity }}m
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[250px]">
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(item.saledPrice.toFixed(2))} so'm`
                  }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- LIST -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'List'"
    >
      <div class="text-sm font-bold mb-2">List</div>
      <div class="overflow-x-auto hide-scrollbar">
        <table class="w-full text-sm">
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
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Holati
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                O'lchamlari
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Umumiy Maydoni
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                1 m<sup>2</sup> Uchun Narx
              </th>
            </tr>
          </thead>
          <tbody v-for="item in products" :key="item._id">
            <tr
              class="hover:bg-gray-200 cursor-pointer w-full"
              v-if="item.name == 'List'"
            >
              <td class="px-5 py-3 border-b border-gray-300 min-w-[170px]">
                <div class="print-text">
                  <template v-if="item.cut">
                    {{ item.name }} (kesilgan)
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.olchamlari }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.category }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.qalinligi }}mm</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.holati }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  Bo'yi: {{ item.uzunligi_x }}sm <br />
                  Eni: {{ item.uzunligi_y }}sm
                </div>
              </td>

              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.quantity }}ta</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[180px]">
                <div class="print-text">
                  {{
                    (item.uzunligi_y * item.uzunligi_x * item.quantity) / 10000
                  }}
                  m<sup>2</sup>
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[250px]">
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(item.saledPrice.toFixed(2))} so'm`
                  }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Armatura -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Armatura'"
    >
      <div class="text-sm font-bold mb-2">Armatura</div>
      <div class="overflow-x-auto hide-scrollbar">
        <table class="w-full text-sm">
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
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Holati
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Umumiy Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                1 m Uchun Narx
              </th>
            </tr>
          </thead>
          <tbody v-for="item in products" :key="item._id">
            <tr
              class="hover:bg-gray-200 cursor-pointer w-full"
              v-if="item.name == 'Armatura'"
            >
              <td class="px-5 py-3 border-b border-gray-300 min-w-[170px]">
                <div class="print-text">
                  <template v-if="item.cut">
                    {{ item.name }} (kesilgan)
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.olchamlari }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.category }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.qalinligi }}mm</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.holati }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.uzunligi }}m</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.quantity }}ta</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[180px]">
                <div class="print-text">
                  {{ item.uzunligi * item.quantity }}m
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[250px]">
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(item.saledPrice.toFixed(2))} so'm`
                  }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Kvadrad prut -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Kvadrat prut'"
    >
      <div class="text-sm font-bold mb-2">Kvadrat prut</div>
      <div class="overflow-x-auto hide-scrollbar">
        <table class="w-full text-sm">
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
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Holati
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                O'lchamlari
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Umumiy Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                1 m Uchun Narx
              </th>
            </tr>
          </thead>
          <tbody v-for="item in products" :key="item._id">
            <tr
              class="hover:bg-gray-200 cursor-pointer w-full"
              v-if="item.name == 'Kvadrat prut'"
            >
              <td class="px-5 py-3 border-b border-gray-300 min-w-[170px]">
                <div class="print-text">
                  <template v-if="item.cut">
                    {{ item.name }} (kesilgan)
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.olchamlari }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.category }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.qalinligi }}mm</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.holati }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  Bo'yi: {{ item.uzunligi_x }}sm <br />
                  Eni: {{ item.uzunligi_y }}sm
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.uzunligi }}m</div>
              </td>

              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.quantity }}ta</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[180px]">
                <div class="print-text">
                  {{ item.uzunligi * item.quantity }}m
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[250px]">
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(item.saledPrice.toFixed(2))} so'm`
                  }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Kvadrat Profil -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Kvadrad profil'"
    >
      <div class="text-sm font-bold mb-2">Kvadrat profil</div>
      <div class="overflow-x-auto hide-scrollbar">
        <table class="w-full text-sm">
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
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Holati
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                O'lchamlari
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Umumiy Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                1 m Uchun Narx
              </th>
            </tr>
          </thead>
          <tbody v-for="item in products" :key="item._id">
            <tr
              class="hover:bg-gray-200 cursor-pointer w-full"
              v-if="item.name == 'Kvadrad profil'"
            >
              <td class="px-5 py-3 border-b border-gray-300 min-w-[170px]">
                <div class="print-text">
                  <template v-if="item.cut">
                    {{ item.name }} (kesilgan)
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.olchamlari }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.category }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.qalinligi }}mm</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.holati }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  Bo'yi: {{ item.uzunligi_x }}sm <br />
                  Eni: {{ item.uzunligi_y }}sm
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.uzunligi }}m</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.quantity }}ta</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[180px]">
                <div class="print-text">
                  {{ item.uzunligi * item.quantity }}m
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[250px]">
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(item.saledPrice.toFixed(2))} so'm`
                  }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Palasa -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Palasa'"
    >
      <div class="text-sm font-bold mb-2">Palasa</div>
      <div class="overflow-x-auto hide-scrollbar">
        <table class="w-full text-sm">
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
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Holati
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                O'lchamlari
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Umumiy Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                1 m Uchun Narx
              </th>
            </tr>
          </thead>
          <tbody v-for="item in products" :key="item._id">
            <tr
              class="hover:bg-gray-200 cursor-pointer w-full"
              v-if="item.name == 'Palasa'"
            >
              <td class="px-5 py-3 border-b border-gray-300 min-w-[170px]">
                <div class="print-text">
                  <template v-if="item.cut">
                    {{ item.name }} (kesilgan)
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.olchamlari }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.category }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.qalinligi }}mm</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.holati }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  Bo'yi: {{ item.uzunligi_x }}sm <br />
                  Eni: {{ item.uzunligi_y }}sm
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.uzunligi }}m</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.quantity }}ta</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[180px]">
                <div class="print-text">
                  {{ item.uzunligi * item.quantity }}m
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[250px]">
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(item.saledPrice.toFixed(2))} so'm`
                  }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Prut -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Prut'"
    >
      <div class="text-sm font-bold mb-2">Prut</div>
      <div class="overflow-x-auto hide-scrollbar">
        <table class="w-full text-sm">
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
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Holati
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Umumiy Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                1 m Uchun Narx
              </th>
            </tr>
          </thead>
          <tbody v-for="item in products" :key="item._id">
            <tr
              class="hover:bg-gray-200 cursor-pointer w-full"
              v-if="item.name == 'Prut'"
            >
              <td class="px-5 py-3 border-b border-gray-300 min-w-[170px]">
                <div class="print-text">
                  <template v-if="item.cut">
                    {{ item.name }} (kesilgan)
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.olchamlari }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.category }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.qalinligi }}mm</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.holati }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.uzunligi }}m</div>
              </td>

              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.quantity }}ta</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[180px]">
                <div class="print-text">
                  {{ item.uzunligi * item.quantity }}m
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[250px]">
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(item.saledPrice.toFixed(2))} so'm`
                  }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Planka -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Planka'"
    >
      <div class="text-sm font-bold mb-2">Planka</div>
      <div class="overflow-x-auto hide-scrollbar">
        <table class="w-full text-sm">
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
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Holati
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                Umumiy Uzunligi
              </th>
              <th class="px-5 py-3 text-left border-y border-gray-300">
                1 m Uchun Narx
              </th>
            </tr>
          </thead>
          <tbody v-for="item in products" :key="item._id">
            <tr
              class="hover:bg-gray-200 cursor-pointer w-full"
              v-if="item.name == 'Planka'"
            >
              <td class="px-5 py-3 border-b border-gray-300 min-w-[170px]">
                <div class="print-text">
                  <template v-if="item.cut">
                    {{ item.name }} (kesilgan)
                  </template>
                  <template v-else>
                    {{ item.name }}
                  </template>
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.olchamlari }}</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.category }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.qalinligi }}mm</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">
                  {{ item.holati }}
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.uzunligi }}m</div>
              </td>

              <td class="px-5 py-3 border-b border-gray-300">
                <div class="print-text">{{ item.quantity }}ta</div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[180px]">
                <div class="print-text">
                  {{ item.uzunligi * item.quantity }}m
                </div>
              </td>
              <td class="px-5 py-3 border-b border-gray-300 min-w-[250px]">
                <div class="print-text">
                  {{
                    item.saledPrice == null
                      ? "Narx belgilanmagan"
                      : `${numberFormat(item.saledPrice.toFixed(2))} so'm`
                  }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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

const route = useRoute();

let loading = ref(true);
let products = ref([]);
let search = ref("Hammasi");
let name = ref("");
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

onMounted(async () => {
  try {
    const res = await $host2.get("/user");
    if (res.data.user.user_level != 2) {
      window.location.href = "/";
    }
    const productsRes = await $host2.get(`/products/${route.params.id}`);
    products.value = productsRes.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const handleEditOmbor = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $host2.patch(`/sklad/${editId.value}`, {
      name: editName.value,
    });
    await Swal.fire("Ombor", "Muvaffiqatli o'zgartirildi", "success");
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
const handleClickDownloadExcel = async () => {
  loading.value = true;
  try {
    const res = await $host2.get(`/sklad/${route.params.id}/excel`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `sklad-${datetime}.xlsx`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
definePageMeta({
  layout: false,
});
</script>
<style scoped>
@media print {
  body * {
    visibility: hidden;
  }

  table {
    visibility: visible;
    position: relative;
    margin-left: -15%;
  }

  table th,
  table td {
    visibility: visible;
  }

  .print-text {
    visibility: visible;
  }
}
.hide-scrollbar {
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
</style>