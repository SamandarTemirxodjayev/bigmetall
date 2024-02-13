<template>
  <div v-if="!loading">
    <div class="mb-2">
      <span class="text-2xl font-semibold">Ombordagi Mahsulotlar Ro'yxati</span>
    </div>
    <div class="items-center bg-white shadow-xl rounded-md">
      <div class="flex p-4 justify-between">
        <form @submit="handleSearchSubmit">
          <form @submit="handleSearchItems" class="flex gap-[5%]">
            <div class="px-2">
              <USelect
                v-model="search"
                :options="
                  [{ name: 'Hammasi' }].concat(
                    MahsulotName.map((item) => ({
                      name: item,
                    }))
                  )
                "
                option-attribute="name"
                size="lg"
              />
            </div>
            <div>
              <UInput
                size="lg"
                placeholder="O'lchamilari"
                v-model="olchamlari"
              />
            </div>
            <div>
              <UButton size="lg" type="submiy">Qidirish</UButton>
            </div>
          </form>
        </form>
        <div>
          <UButton @click="handleClickDownloadExcel" class="px-3 py-2 mx-2">
            Excelda Yuklab Olish
          </UButton>
        </div>
      </div>
    </div>
    <!-- DVUXTAVR -->
    <div
      class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl"
      v-if="search == 'Hammasi' || search == 'Dvuxtavr'"
    >
      <div class="text-lg font-bold mb-2">Dvuxtavr</div>
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
              <div class="print-text">{{ item.totalUzunligi.toFixed(2) }}m</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <UButton @click="openModal(item)" class="px-3 py-2 mx-2">
                  Batafsil
                </UButton>
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
            <th class="px-5 py-3 text-left border-y border-gray-300"></th>
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
                <UButton @click="openModal(item)" class="px-3 py-2 mx-2">
                  Batafsil
                </UButton>
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
            <th class="px-5 py-3 text-left border-y border-gray-300"></th>
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
                <UButton @click="openModal(item)" class="px-3 py-2 mx-2">
                  Batafsil
                </UButton>
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
            <th class="px-5 py-3 text-left border-y border-gray-300"></th>
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
                <UButton @click="openModal(item)" class="px-3 py-2 mx-2">
                  Batafsil
                </UButton>
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
            <th class="px-5 py-3 text-left border-y border-gray-300">Soni</th>
            <th class="px-5 py-3 text-left border-y border-gray-300">
              Umumiy Maydoni
            </th>
            <th class="px-5 py-3 text-left border-y border-gray-300"></th>
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
              <div class="print-text">{{ item.quantity }}ta</div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                {{ item.totalUzunligi.toFixed(2) }}
                m<sup>2</sup>
              </div>
            </td>
            <td class="px-5 py-3 border-b border-gray-300">
              <div class="print-text">
                <UButton @click="openModal(item)" class="px-3 py-2 mx-2">
                  Batafsil
                </UButton>
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
            <th class="px-5 py-3 text-left border-y border-gray-300"></th>
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
                <UButton @click="openModal(item)" class="px-3 py-2 mx-2">
                  Batafsil
                </UButton>
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
                <UButton @click="openModal(item)" class="px-3 py-2 mx-2">
                  Batafsil
                </UButton>
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
                <UButton @click="openModal(item)" class="px-3 py-2 mx-2">
                  Batafsil
                </UButton>
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
                <UButton @click="openModal(item)" class="px-3 py-2 mx-2">
                  Batafsil
                </UButton>
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
            <th class="px-5 py-3 text-left border-y border-gray-300"></th>
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
                <UButton @click="openModal(item)" class="px-3 py-2 mx-2">
                  Batafsil
                </UButton>
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
            <th class="px-5 py-3 text-left border-y border-gray-300"></th>
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
                <UButton @click="openModal(item)" class="px-3 py-2 mx-2">
                  Batafsil
                </UButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <UModal v-model="isOpenModal" fullscreen>
      <UCard
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow overflow-auto',
          },
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              <div class="text-2xl font-bold">Batafsil</div>
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpenModal = false"
            />
          </div>
        </template>

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
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Soni
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  Umumiy Uzunligi
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300">
                  1 m Uchun Sotuv Narxi
                </th>
                <th class="px-5 py-3 text-left border-y border-gray-300"></th>
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
                    <div>{{ (item.uzunligi * item.quantity).toFixed(2) }}m</div>
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
                <td
                  class="px-5 py-3 border-b border-gray-300 text-right w-[10%] text-gray-400"
                >
                  <div>
                    <Icon
                      name="clarity:pencil-line"
                      class="mr-4 hover:text-black"
                      size="1.5rem"
                      @click="handleEditHarajat(item)"
                    />
                    <Icon
                      name="ant-design:delete-outlined"
                      class="hover:text-black"
                      size="1.5rem"
                      @click="handleDeleteHarajat(item)"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </UCard>
    </UModal>
    <UModal v-model="isOpenEditModal" fullscreen>
      <UCard
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow overflow-auto',
          },
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              <div class="text-2xl font-bold">Tahrirlash</div>
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpenEditModal = false"
            />
          </div>
        </template>

        <form @submit="handleEditProduct">
          <div class="grid grid-cols-2 gap-[5%]">
            <div
              class="w-[100%] grid grid-cols-4 gap-x-[7%] grid-span-2 grid-rows-5"
            >
              <div class="w-full col-span-4 mb-4">
                <label class="mb-[6px] block text-sm font-medium text-gray-900"
                  >Temir Mahsulot Turi</label
                >
                <div>
                  <USelect
                    v-model="editProduct.name"
                    class="w-full"
                    size="xl"
                    :options="
                      MahsulotName.map((item) => ({
                        name: item,
                      }))
                    "
                    option-attribute="name"
                    value-attribute="name"
                    disabled
                  />
                </div>
              </div>
              <div class="col-span-4 mb-4">
                <label class="mb-[6px] block text-sm font-medium text-gray-900"
                  >O'lchamlari</label
                >
                <UInput v-model="editProduct.olchamlari" size="lg" required />
              </div>

              <div class="col-span-4 mb-4">
                <label class="mb-[6px] block text-sm font-medium text-gray-900"
                  >Kategoriyasi</label
                >
                <UInput v-model="editProduct.category" size="lg" required />
              </div>

              <div
                class="w-full col-span-2 mb-4"
                v-if="editProduct.name == 'Dvuxtavr'"
              >
                <label class="mb-[6px] block text-sm font-medium text-gray-900"
                  >Qalinligi o'rtasi(mm)</label
                >
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  v-model="editProduct.qalinligiOrtasi"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div
                class="w-full col-span-2 mb-4"
                v-if="editProduct.name == 'Dvuxtavr'"
              >
                <label class="mb-[6px] block text-sm font-medium text-gray-900"
                  >Qalinligi chetlari(mm)</label
                >
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  v-model="editProduct.qalinligi"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div
                class="w-full col-span-4 mb-4"
                v-if="editProduct.name != 'Dvuxtavr'"
              >
                <label class="mb-[6px] block text-sm font-medium text-gray-900"
                  >Qalinligi(mm)</label
                >
                <input
                  type="number"
                  required
                  step="0.01"
                  v-model="editProduct.qalinligi"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div class="w-full col-span-4 mb-4">
                <label class="block mb-2 text-sm font-medium text-gray-900"
                  >Tan Narxi(1m uchun)</label
                >
                <VueNumber
                  v-model="editProduct.price"
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
                  v-model="editProduct.holati"
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
                  v-model="editProduct.sklad"
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
                  editProduct.name == 'List' ||
                  editProduct.name == 'Kvadrad profil' ||
                  editProduct.name == 'Kvadrat prut' ||
                  editProduct.name == 'Palasa'
                "
              >
                <label class="mb-[6px] block text-sm font-medium text-gray-900"
                  >Uzunligi Bo'yi(sm)</label
                >
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  v-model="editProduct.uzunligi_x"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div
                class="w-full col-span-2 mb-4"
                v-if="
                  editProduct.name == 'List' ||
                  editProduct.name == 'Kvadrad profil' ||
                  editProduct.name == 'Kvadrat prut' ||
                  editProduct.name == 'Palasa'
                "
              >
                <label class="mb-[6px] block text-sm font-medium text-gray-900"
                  >Uzunligi Eni(sm)</label
                >
                <input
                  type="number"
                  step="0.01"
                  v-model="editProduct.uzunligi_y"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div
                class="w-full col-span-4 mb-4"
                v-if="editProduct.name != 'List'"
              >
                <label class="mb-[6px] block text-sm font-medium text-gray-900"
                  >Uzunligi(m)</label
                >
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  v-model="editProduct.uzunligi"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div class="w-full col-span-4 mb-4">
                <label class="mb-[6px] block text-sm font-medium text-gray-900"
                  >Soni</label
                >
                <UInput
                  type="number"
                  v-model="editProduct.quantity"
                  :max="editedProduct.quantity"
                  size="lg"
                  required
                />
              </div>

              <div class="w-full col-span-4 mb-4">
                <label class="mb-[6px] block text-sm font-medium text-gray-900"
                  >Sotuv Narxi(1m uchun)</label
                >
                <VueNumber
                  v-model="editProduct.saledPrice"
                  v-bind="number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          <div class="text-right">
            <UButton type="submit" size="lg"> Tasdiqlash </UButton>
          </div>
        </form>
      </UCard>
    </UModal>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { component as VueNumber } from "@coders-tm/vue-number-format";

const route = useRoute();

let loading = ref(true);
let number = ref({
  decimal: ".",
  separator: " ",
  suffix: " so'm",
  precision: 2,
  masked: false,
  min: 0,
});
let isOpenModal = ref(false);
let isOpenEditModal = ref(false);
let products = ref([]);
let fetchedProducts = ref([]);
let search = ref("Hammasi");
let name = ref("");
let ombors = ref([]);
let sellers = ref([]);
let editProduct = ref({});
let editedProduct = ref({});
let olchamlari = ref("");
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
    const productsRes = await $host.get(`/products/${route.params.id}`);
    products.value = productsRes.data;
    const omborsRes = await $host.get("/sklad");
    ombors.value = omborsRes.data;
    const resSellers = await $host.get("/sellers");
    sellers.value = resSellers.data;
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
const handleDeleteHarajat = async (item) => {
  try {
    const object = { ...item };
    object.quantity = 1;
    delete object.totalUzunligi;
    Swal.fire({
      title: "Haqiqatdan ham o'chirmoqchimisiz?",
      showCancelButton: true,
      confirmButtonText: "O'chirish",
      confirmButtonColor: "#D11A2A",
      cancelButtonText: "Bekor Qilish",
    }).then(async (result) => {
      if (result.isConfirmed) {
        loading.value = true;
        await $host.patch("/sklad/product", object);
        await Swal.fire("O'chirildi", "O'chirildi", "success");
        const reps = await $host.post("/sklad/products", {
          name: item.name,
          olchamlari: item.olchamlari,
          category: item.category,
          qalinligi: item.qalinligi,
          qalinligi_ortasi: item.qalinligi_ortasi,
          holati: item.holati,
          sklad: item.sklad,
        });
        fetchedProducts.value = reps.data;
        loading.value = false;
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const handleEditHarajat = async (item) => {
  const object = { ...item };
  delete object.totalUzunligi;
  editProduct.value = JSON.parse(JSON.stringify(object));
  editedProduct.value = JSON.parse(JSON.stringify(object));
  object.quantity = 1;
  localStorage.setItem("item", JSON.stringify(object));
  isOpenEditModal.value = true;
};
const handleEditProduct = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $host.post("/edit/product", {
      to: { ...editProduct.value },
      from: JSON.parse(localStorage.getItem("item")),
    });
    await Swal.fire("O'zgartirildi", "Muvaffiqatli o'zgartirildi", "success");
    window.location.reload();
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};
const handleSearchItems = async () => {
  loading.value = true;
  try {
    const res = await $host.post("/products/find", {
      name: search.value == "Hammasi" ? "" : search.value,
      olchamlari: olchamlari.value,
      sklad: route.params.id,
    });
    products.value = res.data;
  } catch (error) {
    return console.log(error);
  }
  loading.value = false;
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