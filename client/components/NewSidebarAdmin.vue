<script setup>
const router = useRoute();
const isOpenSubMenu = ref(false);
const isOpenSubMenu2 = ref(false);

const toggleSubMenu = () => {
  isOpenSubMenu.value = !isOpenSubMenu.value;
  isOpenSubMenu2.value = false;
};
const toggleSubMenu2 = () => {
  isOpenSubMenu2.value = !isOpenSubMenu2.value;
  isOpenSubMenu.value = false;
};
</script>
<template>
  <div>
    <aside
      class="bg-white fixed left-0 w-24 top-16 h-full transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-300 shadow-inner z-10"
    >
      <ul class="mt-4">
        <li
          :class="
            router.path == '/1'
              ? 'opacity-100 text-[#34a3f1]'
              : 'hover:text-[#34a3f1] hover:opacity-100 opacity-50 text-black'
          "
        >
          <NuxtLink to="/1">
            <div><Icon name="wpf:statistics" size="28px" /></div>
            <div>Bosh sahifa</div>
          </NuxtLink>
        </li>
        <li
          :class="
            router.path == '/1/kirim'
              ? 'opacity-100 text-[#34a3f1]'
              : 'hover:text-[#34a3f1] hover:opacity-100 opacity-50 text-black'
          "
        >
          <NuxtLink to="/1/kirim">
            <div><Icon name="iconamoon:cloud-download" size="28px" /></div>
            <div>Kirim</div>
          </NuxtLink>
        </li>
        <li
          :class="
            router.path == '/1/chiqim' || router.path == '/1/chiqim/cart'
              ? 'opacity-100 text-[#34a3f1]'
              : 'hover:text-[#34a3f1] hover:opacity-100 opacity-50 text-black'
          "
        >
          <NuxtLink to="/1/chiqim">
            <div><Icon name="iconamoon:cloud-upload" size="28px" /></div>
            <div>Chiqim</div>
          </NuxtLink>
        </li>
        <li
          :class="
            router.path.indexOf('/1/sklad') !== -1
              ? 'opacity-100 text-[#34a3f1]'
              : 'hover:text-[#34a3f1] hover:opacity-100 opacity-50 text-black'
          "
        >
          <NuxtLink to="/1/sklad">
            <div><Icon name="mingcute:wardrobe-2-line" size="28px" /></div>
            <div>Ombor</div>
          </NuxtLink>
        </li>
        <li
          :class="
            router.path.indexOf('/1/sellers') !== -1
              ? 'opacity-100 text-[#34a3f1]'
              : 'hover:text-[#34a3f1] hover:opacity-100 opacity-50 text-black'
          "
        >
          <NuxtLink to="/1/sellers">
            <div><Icon name="ph:users-three-bold" size="28px" /></div>
            <div>Sotuvchilar</div>
          </NuxtLink>
        </li>

        <li
          @click="toggleSubMenu2"
          :class="{
            'opacity-100 text-[#34a3f1]': isOpenSubMenu2,
            'hover:text-[#34a3f1] hover:opacity-100 opacity-50 text-black':
              !isOpenSubMenu2,
          }"
        >
          <div>
            <div>
              <Icon name="mdi:partnership-outline" size="28px" />
            </div>
            <div>Qarzdorliklar</div>
            <div
              :class="isOpenSubMenu2 ? 'block' : 'hidden'"
              class="text-left absolute top-0 left-full bg-white border-l border-gray-300 shadow-inner py-4 min-w-[200px] block min-h-full text-gray-500"
            >
              <NuxtLink to="/1/clients">
                <div class="hover:text-[#34a3f1] px-3">Mijozlar</div>
              </NuxtLink>
              <NuxtLink to="/1/business">
                <div class="hover:text-[#34a3f1] px-3">Kompaniya</div>
              </NuxtLink>
            </div>
          </div>
        </li>
        <li
          :class="
            router.path == '/1/harajat'
              ? 'opacity-100 text-[#34a3f1]'
              : 'hover:text-[#34a3f1] hover:opacity-100 opacity-50 text-black'
          "
        >
          <NuxtLink to="/1/harajat">
            <div><Icon name="majesticons:money-hand-line" size="28px" /></div>
            <div>Harajatlar</div>
          </NuxtLink>
        </li>
        <li
          :class="
            router.path.indexOf('/1/cars') !== -1
              ? 'opacity-100 text-[#34a3f1]'
              : 'hover:text-[#34a3f1] hover:opacity-100 opacity-50 text-black'
          "
        >
          <NuxtLink to="/1/cars">
            <div>
              <Icon name="mdi:car-outline" size="28px" />
            </div>
            <div>Moshinalar</div>
          </NuxtLink>
        </li>
        <li
          :class="
            router.path == '/1/hisobot'
              ? 'opacity-100 text-[#34a3f1]'
              : 'hover:text-[#34a3f1] hover:opacity-100 opacity-50 text-black'
          "
        >
          <NuxtLink to="/1/hisobot">
            <div>
              <Icon name="fluent-emoji-high-contrast:bar-chart" size="28px" />
            </div>
            <div>Hisobotlar</div>
          </NuxtLink>
        </li>
        <li
          @click="toggleSubMenu"
          :class="{
            'opacity-100 text-[#34a3f1]': isOpenSubMenu,
            'hover:text-[#34a3f1] hover:opacity-100 opacity-50 text-black':
              !isOpenSubMenu,
          }"
        >
          <div>
            <div>
              <Icon name="material-symbols:app-badging-outline" size="28px" />
            </div>
            <div>Qo'shimcha</div>
            <div
              class="text-left absolute top-0 left-full bg-white border-l border-gray-300 py-4 min-w-[200px] block min-h-full text-gray-500"
              :class="isOpenSubMenu ? 'block' : 'hidden'"
            >
              <NuxtLink to="/1/history">
                <div class="hover:text-[#34a3f1] px-3">Tarix</div>
              </NuxtLink>
              <NuxtLink to="/1/addAlert">
                <div class="hover:text-[#34a3f1] px-3">Xabar Yuborish</div>
              </NuxtLink>
              <NuxtLink to="/1/changePassword">
                <div class="hover:text-[#34a3f1] px-3">Parolni O'zgartish</div>
              </NuxtLink>
              <NuxtLink to="/1/users">
                <div class="hover:text-[#34a3f1] px-3">Foydalanuvchilar</div>
              </NuxtLink>
              <NuxtLink to="/1/phone">
                <div class="hover:text-[#34a3f1] px-3">Telefon Raqam</div>
              </NuxtLink>
              <NuxtLink to="/about">
                <div class="hover:text-[#34a3f1] px-3">CRM Haqida</div>
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>
    </aside>
  </div>
</template>
<style scoped>
ul {
  text-align: center;
  font-size: 14px;
}
ul li div {
  padding-top: 2.5px;
  font-weight: 600;
}
ul li {
  margin-bottom: 20px;
  cursor: pointer;
}
</style>