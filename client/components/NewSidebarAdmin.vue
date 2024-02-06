<script setup>
const router = useRoute();
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
          :class="
            router.path.indexOf('/1/clients') !== -1 ||
            router.path.indexOf('/1/business') !== -1
              ? 'opacity-100 text-[#34a3f1]'
              : 'hover:text-[#34a3f1] hover:opacity-100 opacity-50 text-black'
          "
        >
          <div>
            <div>
              <Icon name="mdi:partnership-outline" size="28px" />
            </div>
            <div>Qarzdorliklar</div>
            <div
              class="text-left submenu absolute top-0 left-full bg-white border-l border-gray-300 shadow-inner py-4 min-w-[200px] block min-h-full text-gray-500"
            >
              <div class="hover:text-[#34a3f1] px-3">
                <NuxtLink to="/1/clients">Mijozlar</NuxtLink>
              </div>
              <div class="hover:text-[#34a3f1] px-3">
                <NuxtLink to="/1/business">Kompaniya</NuxtLink>
              </div>
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
          :class="
            router.path == '/1/addAlert' ||
            router.path == '/1/changePassword' ||
            router.path == '/1/users' ||
            router.path == '/1/phone'
              ? 'opacity-100 text-[#34a3f1]'
              : 'hover:text-[#34a3f1] hover:opacity-100 opacity-50 text-black'
          "
        >
          <div>
            <div>
              <Icon name="material-symbols:app-badging-outline" size="28px" />
            </div>
            <div>Qo'shimcha</div>
            <div
              class="text-left submenu absolute top-0 left-full bg-white border-l border-gray-300 shadow-inner py-4 min-w-[200px] block min-h-full text-gray-500"
            >
              <div class="hover:text-[#34a3f1] px-3">
                <NuxtLink to="/1/addAlert">Xabar Yuborish</NuxtLink>
              </div>
              <div class="hover:text-[#34a3f1] px-3">
                <NuxtLink to="/1/changePassword">Parolni O'zgartish</NuxtLink>
              </div>
              <div class="hover:text-[#34a3f1] px-3">
                <NuxtLink to="/1/users">Foydalanuvchilar</NuxtLink>
              </div>
              <div class="hover:text-[#34a3f1] px-3">
                <NuxtLink to="/1/phone">Telefon Raqam</NuxtLink>
              </div>
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
ul li:hover .submenu {
  display: block;
}
.submenu {
  display: none;
}
</style>