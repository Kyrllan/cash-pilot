<script setup lang="ts">
interface NavigationMenuItem {
  label: string;
  icon: string;
  to?: string;
  active?: boolean;
}

const isCollapsed = ref(false);
const route = useRoute();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

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

const handleLogout = async () => {
  await supabase.auth.signOut();
  await navigateTo("/auth", { replace: true });
};
</script>

<template>
  <div class="h-screen bg-neutral-900 text-white grid md:grid-cols-[auto_1fr]">
    <aside
      :class="[
        'hidden md:flex flex-col border-r border-neutral-800 bg-neutral-950 transition-all duration-300 h-screen',
        isCollapsed ? 'w-20' : 'w-64',
      ]"
    >
      <div
        :class="[
          'flex items-center gap-3 px-2 py-3 border-b border-neutral-800',
          isCollapsed ? 'justify-center flex-col gap-2' : 'justify-between',
        ]"
      >
        <div :class="['flex items-center gap-3', isCollapsed && 'flex-col']">
          <UAvatar
            v-if="user"
            :name="user?.user_metadata?.full_name"
            :src="user?.user_metadata?.avatar_url"
            size="xl"
          />
          <div v-if="!isCollapsed" class="flex flex-col">
            <span class="text-sm font-medium">
              {{ user?.user_metadata?.full_name }}
            </span>
            <span class="text-xs text-neutral-400">
              {{ user?.email }}
            </span>
          </div>
        </div>

        <button
          class="p-2 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors flex items-center"
          @click="toggleSidebar"
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

      <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
        <NuxtLink
          v-for="item in mainNavItems"
          :key="item.label"
          :to="item.to"
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

      <div class="p-3 border-t border-neutral-800 space-y-1">
        <NuxtLink
          v-for="item in bottomNavItems"
          :key="item.label"
          :to="item.to"
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

    <main class="overflow-auto pt-4 pb-24 md:pb-0 w-full">
      <UContainer>
        <slot />
      </UContainer>
    </main>

    <nav
      class="md:hidden fixed bottom-0 left-0 w-full bg-neutral-950 border-t border-neutral-800 flex justify-around py-5 z-50"
    >
      <NuxtLink
        v-for="item in mainNavItems"
        :key="item.label"
        :to="item.to"
        :class="[
          'flex flex-col items-center text-neutral-400',
          item.active && 'text-primary-500',
        ]"
      >
        <UIcon :name="item.icon" class="size-6" />
        <span class="text-xs mt-1">{{ item.label }}</span>
      </NuxtLink>
      <NuxtLink
        v-for="item in bottomNavItems"
        :key="item.label"
        :to="item.to"
        :class="[
          'flex flex-col items-center text-neutral-400',
          item.active && 'text-primary-500',
        ]"
        @click="item.label === 'Sair' && handleLogout()"
      >
        <UIcon :name="item.icon" class="size-6" />
        <span class="text-xs mt-1">{{ item.label }}</span>
      </NuxtLink>
    </nav>
  </div>
</template>
