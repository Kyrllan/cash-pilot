<script setup lang="ts">
definePageMeta({ layout: "auth" });
const user = useSupabaseUser();
watchEffect(() => {
  if (user.value) navigateTo("/");
});
</script>

<template>
  <div
    class="px-4 flex items-center justify-center h-screen bg-[url('/images/login-background-2.png')] bg-cover bg-center"
  >
    <UCard class="w-full max-w-md bg-neutral-900 border-neutral-800">
      <div class="flex items-center gap-3 mb-6">
        <UIcon name="i-heroicons-banknotes" class="size-8 text-primary-500" />
        <h1 class="text-2xl font-semibold">Entrando...</h1>
      </div>
      <p class="text-neutral-400 text-sm">Processando autenticação. Aguarde.</p>
    </UCard>
  </div>
</template>
