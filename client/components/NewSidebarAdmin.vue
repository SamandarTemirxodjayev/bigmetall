<template>
  <div>
    <aside
      class="bg-white fixed left-0 w-24 top-16 h-full transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-300 shadow-inner z-10"
    >
      <ul class="mt-4">
        <li>
          <NuxtLink to="/1">
            <div><Icon name="wpf:statistics" size="28px" /></div>
            <div>Bosh sahifa</div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/1/kirim">
            <div><Icon name="iconamoon:cloud-download" size="28px" /></div>
            <div>Kirim</div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/1/chiqim">
            <div><Icon name="iconamoon:cloud-upload" size="28px" /></div>
            <div>Chiqim</div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/1/sklad">
            <div><Icon name="mingcute:wardrobe-2-line" size="28px" /></div>
            <div>Ombor</div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/1/sellers">
            <div><Icon name="ph:users-three-bold" size="28px" /></div>
            <div>Sotuvchilar</div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/1/clients">
            <div><Icon name="mdi:partnership-outline" size="28px" /></div>
            <div>Mijozlar</div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/1/harajat">
            <div><Icon name="majesticons:money-hand-line" size="28px" /></div>
            <div>Harajatlar</div>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/1/hisobot">
            <div>
              <Icon name="fluent-emoji-high-contrast:bar-chart" size="28px" />
            </div>
            <div>Hisobotlar</div>
          </NuxtLink>
        </li>
        <li>
          <div>
            <div>
              <Icon name="material-symbols:app-badging-outline" size="28px" />
            </div>
            <div>Qo'shimcha</div>
            <div
              class="text-left submenu hidden absolute top-0 left-full bg-white border-l border-gray-300 shadow-inner py-4 min-w-[200px] block min-h-full text-gray-500"
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
  color: #000;
  opacity: 0.5;
}
ul li:hover {
  opacity: 1;
  color: #34a3f1;
}
ul li:hover .submenu {
  display: block;
}
.submenu {
  display: none;
}
</style>