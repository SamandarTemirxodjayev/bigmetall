<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold">Ombordagi Mahsulotlar Ro'yxati</span>
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
            class="mx-2 text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-xl font-semibold"
          >
            Excelda Yuklab Olish
          </button>
        </div>
      </div>
    </div>
    <!-- DVUXTAVR -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Dvuxtavr'"
    >
      <div class="text-xl font-bold mb-2">Dvuxtavr</div>
      <table class="w-full">
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
            <th class="px-5 py-3 text-left border-y border-gray-300"></th>
          </tr>
        </thead>
        <tbody v-for="item in products" :key="item._id">
          <tr
            class="hover:bg-gray-200 cursor-pointer w-full"
            v-if="item.name == 'Dvuxtavr'"
          >
            <td class="px-5 py-3 border-b border-gray-300">
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
              <div class="print-text">
                {{ item.minUzunligi }} - {{ item.maxUzunligi }}m
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.quantity }}ta</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.totalUzunligi }}m</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <button
                  @click="openModal(item)"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >
                  Batafsil
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- SHVELLIR -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Shvellir'"
    >
      <div class="text-xl font-bold mb-2">Shvellir</div>
      <table class="w-full">
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
              1 m Uchun Narx
            </th>
          </tr>
        </thead>
        <tbody v-for="item in products" :key="item._id">
          <tr
            class="hover:bg-gray-200 cursor-pointer w-full"
            v-if="item.name == 'Shvellir'"
          >
            <td class="px-5 py-3 border-b border-gray-300">
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
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.uzunligi * item.quantity }}m</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
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

    <!-- UGALOK -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Ugalok'"
    >
      <div class="text-xl font-bold mb-2">Ugalok</div>
      <table class="w-full">
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
              1 m Uchun Narx
            </th>
          </tr>
        </thead>
        <tbody v-for="item in products" :key="item._id">
          <tr
            class="hover:bg-gray-200 cursor-pointer w-full"
            v-if="item.name == 'Ugalok'"
          >
            <td class="px-5 py-3 border-b border-gray-300">
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
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.uzunligi * item.quantity }}m</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
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

    <!-- Truba -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Truba'"
    >
      <div class="text-xl font-bold mb-2">Truba</div>
      <table class="w-full">
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
              1 m Uchun Narx
            </th>
          </tr>
        </thead>
        <tbody v-for="item in products" :key="item._id">
          <tr
            class="hover:bg-gray-200 cursor-pointer w-full"
            v-if="item.name == 'Truba'"
          >
            <td class="px-5 py-3 border-b border-gray-300">
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
                {{ item.minUzunligi }} - {{ item.maxUzunligi }}m
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.quantity }}ta</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.totalUzunligi.toFixed(2) }}m</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
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

    <!-- LIST -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'List'"
    >
      <div class="text-xl font-bold mb-2">List</div>
      <table class="w-full">
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
            <td class="px-5 py-3 border-b border-gray-300">
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
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{
                  (item.uzunligi_y * item.uzunligi_x * item.quantity) / 10000
                }}
                m<sup>2</sup>
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
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

    <!-- Armatura -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Armatura'"
    >
      <div class="text-xl font-bold mb-2">Armatura</div>
      <table class="w-full">
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
              1 m Uchun Narx
            </th>
          </tr>
        </thead>
        <tbody v-for="item in products" :key="item._id">
          <tr
            class="hover:bg-gray-200 cursor-pointer w-full"
            v-if="item.name == 'Armatura'"
          >
            <td class="px-5 py-3 border-b border-gray-300">
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
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.uzunligi * item.quantity }}m</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
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

    <!-- Kvadrad prut -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Kvadrat prut'"
    >
      <div class="text-xl font-bold mb-2">Kvadrat prut</div>
      <table class="w-full">
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
            <td class="px-5 py-3 border-b border-gray-300">
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
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.uzunligi * item.quantity }}m</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
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

    <!-- Kvadrat Profil -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Kvadrad profil'"
    >
      <div class="text-xl font-bold mb-2">Kvadrat profil</div>
      <table class="w-full">
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
            <td class="px-5 py-3 border-b border-gray-300">
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
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.uzunligi * item.quantity }}m</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
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

    <!-- Palasa -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Palasa'"
    >
      <div class="text-xl font-bold mb-2">Palasa</div>
      <table class="w-full">
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
            <td class="px-5 py-3 border-b border-gray-300">
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
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.uzunligi * item.quantity }}m</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
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

    <!-- Prut -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Prut'"
    >
      <div class="text-xl font-bold mb-2">Prut</div>
      <table class="w-full">
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
              1 m Uchun Narx
            </th>
          </tr>
        </thead>
        <tbody v-for="item in products" :key="item._id">
          <tr
            class="hover:bg-gray-200 cursor-pointer w-full"
            v-if="item.name == 'Prut'"
          >
            <td class="px-5 py-3 border-b border-gray-300">
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
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.uzunligi * item.quantity }}m</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
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

    <!-- Planka -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Planka'"
    >
      <div class="text-xl font-bold mb-2">Planka</div>
      <table class="w-full">
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
              1 m Uchun Narx
            </th>
          </tr>
        </thead>
        <tbody v-for="item in products" :key="item._id">
          <tr
            class="hover:bg-gray-200 cursor-pointer w-full"
            v-if="item.name == 'Planka'"
          >
            <td class="px-5 py-3 border-b border-gray-300">
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
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">{{ item.uzunligi * item.quantity }}m</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
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
    <div
      v-if="isOpenModal"
      class="fixed w-full h-full bg-white top-0 left-0 z-[9999] overflow-y-auto pr-[7%] p-[4%]"
    >
      <div
        class="fixed top-5 right-10 cursor-pointer"
        @click="() => (isOpenModal = false)"
      >
        <Icon name="material-symbols:close" size="1.5rem" />
      </div>
      <div class="text-2xl font-bold">Batafsil</div>
      <div class="border border-gray-50">
        <table class="w-full text-[13px]">
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
                1 m Uchun Sotuv Narxi
              </th>
            </tr>
          </thead>
          <tbody v-for="item in fetchedProducts" :key="item._id">
            <tr class="hover:bg-gray-200 cursor-pointer w-full">
              <td class="px-5 py-3 border-b border-gray-300">
                <template v-if="item.cut">
                  {{ item.name }} (kesilgan)
                </template>
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
                      (item.uzunligi_y * item.uzunligi_x * item.quantity) /
                      10000
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
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`
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
let isOpenModal = ref(false);
let products = ref([]);
let fetchedProducts = ref([]);
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
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    const productsRes = await $host.get(`/products/${route.params.id}`);
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
    await $host.patch(`/sklad/${editId.value}`, {
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
    const res = await $host.get(`/sklad/${route.params.id}/excel`, {
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
const openModal = async (item) => {
  loading.value = true;
  try {
    const res = await $host.post("/sklad/products", {
      name: item.name,
      olchamlari: item.olchamlari,
      category: item.category,
      qalinligi: item.qalinligi,
      qalinligi_ortasi: item.qalinligi_ortasi,
      holati: item.holati,
      sklad: item.sklad,
    });
    fetchedProducts.value = res.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
  isOpenModal.value = true;
};
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
</style>