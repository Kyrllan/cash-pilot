<template>
  <div class="min-h-screen bg-neutral-900 text-white flex">
    <!-- SIDEBAR -->
    <aside
      :class="[
        'flex flex-col border-r border-neutral-800 bg-neutral-950 transition-all duration-300 fixed top-0 left-0 h-screen z-50',
        isCollapsed ? 'w-20' : 'w-64',
      ]"
    >
      <!-- HEADER DO SIDEBAR -->
      <div
        :class="[
          'flex items-center gap-3 px-2 py-3 border-b border-neutral-800',
          isCollapsed ? 'justify-center flex-col gap-2' : 'justify-between',
        ]"
      >
        <div :class="['flex items-center gap-3', isCollapsed && 'flex-col']">
          <UAvatar
            name="João Silva"
            src="https://avatars.githubusercontent.com/u/0"
            size="xl"
          />
          <div v-if="!isCollapsed" class="flex flex-col">
            <span class="text-sm font-medium">João Silva</span>
            <span class="text-xs text-neutral-400">joao.silva@email.com</span>
          </div>
        </div>

        <button
          @click="toggleSidebar"
          class="p-2 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white hover:cursor-pointer transition-colors flex items-center"
        >
          <UIcon
            :name="
              isCollapsed
                ? 'i-heroicons-chevron-right'
                : 'i-heroicons-chevron-left'
            "
            class="size-5"
          />
        </button>
      </div>

      <!-- MENU PRINCIPAL -->
      <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
        <NuxtLink
          v-for="item in mainNavItems"
          :key="item.label"
          :to="item.to || '#'"
          :class="[
            'flex items-center gap-3 px-3 py-3 rounded-lg transition-colors',
            item.active
              ? 'bg-primary-600 text-white'
              : 'text-neutral-300 hover:bg-neutral-800',
            isCollapsed ? 'justify-center' : '',
          ]"
        >
          <UIcon :name="item.icon" class="size-5 flex-shrink-0" />
          <span v-if="!isCollapsed" class="text-sm">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- MENU INFERIOR -->
      <div class="p-3 border-t border-neutral-800 space-y-1">
        <NuxtLink
          v-for="item in bottomNavItems"
          :key="item.label"
          :to="item.to || '#'"
          :class="[
            'flex items-center gap-3 px-3 py-3 rounded-lg transition-colors',
            item.active
              ? 'bg-primary-600 text-white'
              : 'text-neutral-300 hover:bg-neutral-800',
            isCollapsed ? 'justify-center' : '',
          ]"
          @click="item.label === 'Sair' && handleLogout()"
        >
          <UIcon :name="item.icon" class="size-5 flex-shrink-0" />
          <span v-if="!isCollapsed" class="text-sm">{{ item.label }}</span>
        </NuxtLink>
      </div>
    </aside>

    <!-- CONTEÚDO -->
    <main
      :class="[
        'flex-1 transition-all duration-300 min-h-screen py-6',
        isCollapsed ? 'ml-20' : 'ml-64',
      ]"
    >
      <UContainer>
        <slot />
      </UContainer>
    </main>
  </div>
</template>

<script setup lang="ts">
interface NavigationMenuItem {
  label: string;
  icon: string;
  to?: string;
  active?: boolean;
}

const isCollapsed = ref(false);
const route = useRoute();

const mainNavItems = computed<NavigationMenuItem[]>(() => [
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
    active: route.path === "/",
  },
  {
    label: "Transações",
    icon: "i-heroicons-arrow-path",
    to: "/transactions",
    active: route.path === "/transactions",
  },
  {
    label: "Metas",
    icon: "i-heroicons-flag",
    to: "/goals",
    active: route.path === "/goals",
  },
]);

const bottomNavItems = computed<NavigationMenuItem[]>(() => [
  {
    label: "Configurações",
    icon: "i-heroicons-cog-6-tooth",
    to: "/settings",
    active: route.path === "/settings",
  },
  { label: "Sair", icon: "i-heroicons-arrow-left-start-on-rectangle" },
]);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleLogout = () => {
  console.log("Logout clicked");
  navigateTo("/auth");
};
</script>
