<template>
  <div v-if="!loading">
    <NewLayout>
      <div class="mb-2">
        <span class="text-2xl font-semibold">Chiqim</span>
      </div>
      {{ storeItems }}
      <div class="mt-8 bg-white border border-gray-50 p-8 shadow-2xl">
        <div class="flex gap-10">
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Temir Mahsulot Turi</label
            >
            <select
              v-model="mahsulotTuri"
              @change="handleChangeMahsulotTuri"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option>Hammasi</option>
              <option
                v-for="(item, id) in MahsulotName"
                :key="id"
                :value="item"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Kategoriyasi</label
            >
            <select
              v-model="category"
              @change="handleChangeCategory"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option>Hammasi</option>
              <option v-for="(item, id) in categories" :key="id" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900"
              >Qalinligi</label
            >
            <select
              v-model="qalinligi"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option>Hammasi</option>
              <option
                v-for="(item, id) in qalinliglari"
                :key="id"
                :value="item"
              >
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
              @change="handleChangeMahsulotTuri"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option>Hammasi</option>
              <option>Yangi</option>
              <option>Eski</option>
              <option>B/U</option>
            </select>
          </div>
        </div>
        <div class="text-[14px]">
          <!-- DVUXTAVR -->
          <div
            class="bg-white border border-gray-50 shadow-2xl"
            v-if="
              mahsulotTuri == 'Hammasi' ||
              mahsulotTuri == 'Dvuxtavr' ||
              mahsulotTuri == 'Ugalok' ||
              mahsulotTuri == 'Shvellir'
            "
          >
            <table class="w-full">
              <thead>
                <tr class="sticky top-16 bg-white">
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
                    1 m Uchun Tan Narxi
                  </th>
                  <th class="px-5 py-3 text-left border-y border-gray-300">
                    Batafsil
                  </th>
                </tr>
              </thead>
              <tbody v-for="item in products" :key="item._id">
                <tr
                  class="hover:bg-gray-200 cursor-pointer w-full"
                  v-if="
                    ((item.name == 'Dvuxtavr' &&
                      (mahsulotTuri == 'Hammasi' ||
                        mahsulotTuri == 'Dvuxtavr')) ||
                      (item.name == 'Ugalok' &&
                        (mahsulotTuri == 'Hammasi' ||
                          mahsulotTuri == 'Ugalok')) ||
                      (item.name == 'Shvellir' &&
                        (mahsulotTuri == 'Hammasi' ||
                          mahsulotTuri == 'Shvellir'))) &&
                    (category == 'Hammasi' || category == item.category) &&
                    (holati == 'Hammasi' || holati == item.holati) &&
                    (qalinligi == 'Hammasi' ||
                      (qalinligi.split('/')[0] == item.qalinligi_ortasi &&
                        qalinligi.split('/')[1] == item.qalinligi))
                  "
                >
                  <td class="px-5 py-3 border-b border-gray-300">
                    <div class="print-text">{{ item.name }}</div>
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
                      <div v-if="item.qalinligi_ortasi">
                        O'rta: {{ item.qalinligi_ortasi }}mm<br />
                        Chet: {{ item.qalinligi }}mm
                      </div>
                      <div v-else>{{ item.qalinligi }}mm</div>
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
                  <td class="px-5 py-3 border-b border-gray-300">
                    <div class="print-text">
                      {{ item.uzunligi * item.quantity }}m
                    </div>
                  </td>
                  <td class="px-5 py-3 border-b border-gray-300">
                    <div class="print-text">
                      {{
                        item.saledPrice == null
                          ? "Narx belgilanmagan"
                          : `${item.saledPrice} so'm`
                      }}
                    </div>
                  </td>
                  <td class="px-5 py-3 border-b border-gray-300">
                    <div class="print-text">
                      <button
                        v-if="
                          storeItems &&
                          storeItems.length > 0 &&
                          storeItems.find(
                            (items) => items._id.name === item.name
                          ) &&
                          storeItems.find(
                            (items) => items._id.name === item.name
                          ).quantity
                        "
                        @click="add(item)"
                        type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                      >
                        Qo'shish
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- LIST -->
          <div
            class="bg-white border border-gray-50 shadow-2xl"
            v-if="mahsulotTuri == 'Hammasi' || mahsulotTuri == 'List'"
          >
            <table class="w-full">
              <thead>
                <tr class="sticky top-16 bg-white">
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
                    Soni
                  </th>
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
                  v-if="
                    item.name == 'List' &&
                    (category == 'Hammasi' || category == item.category) &&
                    (holati == 'Hammasi' || holati == item.holati)
                  "
                >
                  <td class="px-5 py-3 border-b border-gray-300">
                    <div class="print-text">{{ item.name }}</div>
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
                        (item.uzunligi_y * item.uzunligi_x * item.quantity) /
                        10000
                      }}
                      m<sup>2</sup>
                    </div>
                  </td>
                  <td class="px-5 py-3 border-b border-gray-300">
                    <div class="print-text">
                      {{
                        item.saledPrice == null
                          ? "Narx belgilanmagan"
                          : `${item.saledPrice} so'm`
                      }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Armatura -->
          <div
            class="bg-white border border-gray-50 shadow-2xl"
            v-if="mahsulotTuri == 'Hammasi' || mahsulotTuri == 'Armatura'"
          >
            <table class="w-full">
              <thead>
                <tr class="sticky top-16 bg-white">
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
                    1 m Uchun Narx
                  </th>
                </tr>
              </thead>
              <tbody v-for="item in products" :key="item._id">
                <tr
                  class="hover:bg-gray-200 cursor-pointer w-full"
                  v-if="
                    item.name == 'Armatura' &&
                    (category == 'Hammasi' || category == item.category) &&
                    (holati == 'Hammasi' || holati == item.holati)
                  "
                >
                  <td class="px-5 py-3 border-b border-gray-300">
                    <div class="print-text">{{ item.name }}</div>
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
                    <div class="print-text">
                      {{ item.uzunligi * item.quantity }}m
                    </div>
                  </td>
                  <td class="px-5 py-3 border-b border-gray-300">
                    <div class="print-text">
                      {{
                        item.saledPrice == null
                          ? "Narx belgilanmagan"
                          : `${item.saledPrice} so'm`
                      }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Kvadrad prut -->
          <div
            class="bg-white border border-gray-50 shadow-2xl"
            v-if="mahsulotTuri == 'Hammasi' || mahsulotTuri == 'Kvadrat prut'"
          >
            <table class="w-full">
              <thead>
                <tr class="sticky top-16 bg-white">
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
                  <th class="px-5 py-3 text-left border-y border-gray-300">
                    Soni
                  </th>
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
                  v-if="
                    (item.name == 'Kvadrat prut' ||
                      item.name == 'Kvadrad profil') &&
                    (category == 'Hammasi' || category == item.category) &&
                    (holati == 'Hammasi' || holati == item.holati)
                  "
                >
                  <td class="px-5 py-3 border-b border-gray-300">
                    <div class="print-text">{{ item.name }}</div>
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
                    <div class="print-text">
                      {{ item.uzunligi * item.quantity }}m
                    </div>
                  </td>
                  <td class="px-5 py-3 border-b border-gray-300">
                    <div class="print-text">
                      {{
                        item.saledPrice == null
                          ? "Narx belgilanmagan"
                          : `${item.saledPrice} so'm`
                      }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Palasa -->
          <div
            class="bg-white border border-gray-50 shadow-2xl"
            v-if="mahsulotTuri == 'Hammasi' || mahsulotTuri == 'Palasa'"
          >
            <table class="w-full">
              <thead>
                <tr class="sticky top-16 bg-white">
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
                  <th class="px-5 py-3 text-left border-y border-gray-300">
                    Soni
                  </th>
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
                  v-if="
                    item.name == 'Palasa' &&
                    (category == 'Hammasi' || category == item.category) &&
                    (holati == 'Hammasi' || holati == item.holati)
                  "
                >
                  <td class="px-5 py-3 border-b border-gray-300">
                    <div class="print-text">{{ item.name }}</div>
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
                    <div class="print-text">
                      {{ item.uzunligi * item.quantity }}m
                    </div>
                  </td>
                  <td class="px-5 py-3 border-b border-gray-300">
                    <div class="print-text">
                      {{
                        item.saledPrice == null
                          ? "Narx belgilanmagan"
                          : `${item.saledPrice} so'm`
                      }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Prut -->
          <div
            class="bg-white border border-gray-50 shadow-2xl"
            v-if="
              mahsulotTuri == 'Hammasi' ||
              mahsulotTuri == 'Prut' ||
              mahsulotTuri == 'Planka'
            "
          >
            <table class="w-full">
              <thead>
                <tr class="sticky top-16 bg-white">
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
                    1 m Uchun Narx
                  </th>
                </tr>
              </thead>
              <tbody v-for="item in products" :key="item._id">
                <tr
                  class="hover:bg-gray-200 cursor-pointer w-full"
                  v-if="
                    (item.name == 'Prut' &&
                      (mahsulotTuri == 'Hammasi' || mahsulotTuri == 'Prut')) ||
                    (item.name == 'Planka' &&
                      (mahsulotTuri == 'Hammasi' || mahsulotTuri == 'Planka') &&
                      (category == 'Hammasi' || category == item.category) &&
                      (holati == 'Hammasi' || holati == item.holati))
                  "
                >
                  <td class="px-5 py-3 border-b border-gray-300">
                    <div class="print-text">{{ item.name }}</div>
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
                    <div class="print-text">
                      {{ item.uzunligi * item.quantity }}m
                    </div>
                  </td>
                  <td class="px-5 py-3 border-b border-gray-300">
                    <div class="print-text">
                      {{
                        item.saledPrice == null
                          ? "Narx belgilanmagan"
                          : `${item.saledPrice} so'm`
                      }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        v-if="isPopupOpen"
        class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-25"
      >
        <div class="bg-white p-10 rounded-md shadow-lg w-[400px]">
          <button
            @click="handleClosePopUp"
            class="relative -top-8 -right-8 float-right text-gray-500 hover:text-gray-700"
          >
            <Icon name="material-symbols:close" width="25" height="25" />
          </button>

          <div>
            <div>Mahsulot Nomi: {{ product.name }}</div>
            <div>O'lchamlari: {{ product.olchamlari }}</div>
            <div>Kategoriyasi: {{ product.category }}</div>
            <div>
              Qalinligi:
              {{
                product.qalinligi_ortasi
                  ? `${product.qalinligi_ortasi}mm/${product.qalinligi}`
                  : product.qalinligi
              }}mm
            </div>
            <div>Holati: {{ product.holati }}</div>
            <div>Uzunligi: {{ product.uzunligi }}m</div>
            <div>Tan Narxi: {{ product.price }} so'm</div>
            <form @submit="handleSubmit">
              <div class="my-4">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-700"
                >
                  Mijozni Tanglang</label
                >
                <select
                  v-model="client"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option v-for="(item, id) in clients" :key="id" :value="item">
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="flex gap-4">
                <div class="mb-4">
                  <label
                    for="quantity"
                    class="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Sotuv Narxi</label
                  >
                  <input
                    v-model="product.saledPrice"
                    required
                    step="0.01"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="quantity"
                    class="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Umumiy Narxi</label
                  >
                  <input
                    :value="product.saledPrice * product.uzunligi"
                    disabled
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div class="mb-4">
                <label
                  for="quantity"
                  class="block mb-2 text-sm font-medium text-gray-700"
                >
                  To'lov Usuli</label
                >
                <select
                  v-model="saledType"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option>Naxt</option>
                  <option>Qarz</option>
                  <option>Perechesleniya</option>
                  <option>Kartaga( terminal)</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </NewLayout>
  </div>
  <div v-else>
    <Loader />
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useCounterStore } from "~/store";

const counterStore = useCounterStore();

let storeItems = ref();

const add = (product) => {
  counterStore.add(product);
};

let loading = ref(true);
let mahsulotTuri = ref("Hammasi");
let products = ref([]);
let product = ref();
let isPopupOpen = ref(false);
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
let categories = ref([]);
let category = ref("Hammasi");
let holati = ref("Hammasi");
let qalinliglari = ref([]);
let qalinligi = ref("Hammasi");
let clients = ref([]);
let client = ref("");
let saledType = ref("");

onMounted(async () => {
  try {
    const res = await $host.get("/user");
    if (res.data.user.user_level != 1) {
      window.location.href = "/";
    }
    storeItems.value = counterStore.get();
    const productsRes = await $host.get(`/products`);
    products.value = productsRes.data;
    categories.value = products.value.map((item) => item.category);
    categories.value = [...new Set(categories.value)];
    qalinliglari.value = products.value.map((item) =>
      item.qalinligi_ortasi
        ? `${item.qalinligi_ortasi}/${item.qalinligi}`
        : `${item.qalinligi}`
    );
    qalinliglari.value = [...new Set(qalinliglari.value)];
    const clientRes = await $host.get("/clients");
    clients.value = clientRes.data;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
});
const handleChangeMahsulotTuri = () => {
  if (mahsulotTuri.value == "Hammasi") {
    categories.value = products.value.map((item) => item.category);
  } else {
    categories.value = products.value
      .filter((item) => item.name == mahsulotTuri.value)
      .map((item) => item.category);
  }

  categories.value = [...new Set(categories.value)];
};
const handleChangeCategory = () => {
  if (category.value == "Hammasi" && mahsulotTuri.value == "Hammasi") {
    qalinliglari.value = products.value.map((item) =>
      item.qalinligi_ortasi
        ? `${item.qalinligi_ortasi}/${item.qalinligi}`
        : `${item.qalinligi}`
    );
  } else if (category.value == "Hammasi") {
    qalinliglari.value =
      products.value &&
      mahsulotTuri.value !=
        "Hammasi"
          .filter((item) => item.category == category.value)
          .map((item) =>
            item.qalinligi_ortasi
              ? `${item.qalinligi_ortasi}/${item.qalinligi}`
              : `${item.qalinligi}`
          );
  } else {
    qalinliglari.value = products.value
      .filter((item) => item.category == category.value)
      .map((item) =>
        item.qalinligi_ortasi
          ? `${item.qalinligi_ortasi}/${item.qalinligi}`
          : `${item.qalinligi}`
      );
  }
  qalinliglari.value = [...new Set(qalinliglari.value)];
};
const handleProductExit = (item) => {
  isPopupOpen.value = true;
  product.value = item;
};
const handleClosePopUp = () => {
  isPopupOpen.value = false;
};
const handleChangeInput = () => {
  console.log(product.value.saledPrice);
};
const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  try {
    await $host.post("/sell", {
      id: product.value._id,
      saledPrice: product.value.saledPrice,
      client: client.value._id,
      saledType: saledType.value,
    });
    await Swal.fire("Sotildi", "", "success");
    window.location.reload();
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};
const filteredProducts = computed(() => {
  if (mahsulotTuri.value === "Hammasi") {
    return products.value;
  } else {
    return products.value.filter((item) => {
      return (
        ((mahsulotTuri.value === "Dvuxtavr" && item.name === "Dvuxtavr") ||
          (mahsulotTuri.value === "Shvellir" && item.name === "Shvellir")) &&
        (category == "Hammasi" || category === item.category) &&
        (holati == "Hammasi" || holati === item.holati) &&
        (qalinligi == "Hammasi" ||
          (qalinligi.split("/")[0] === item.qalinligi_ortasi &&
            qalinligi.split("/")[1] === item.qalinligi))
      );
    });
  }
});
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
