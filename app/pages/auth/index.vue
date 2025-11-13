<script lang="ts" setup>
definePageMeta({ layout: "auth" });

const tab = ref(0);
const items = [
  { label: "Login", slot: "login" },
  { label: "Registrar", slot: "register" },
];

const login = reactive({ email: "", password: "", show: false });
const register = reactive({ email: "", password: "", show: false });

const entrar = () => {
  if (!login.email || !login.password) return;
  navigateTo("/");
};

const registrar = () => {
  if (!register.email || !register.password) return;
  navigateTo("/");
};

const goRegister = () => {
  tab.value = 1;
};

const toggleLoginPassword = () => {
  login.show = !login.show;
};

const toggleRegisterPassword = () => {
  register.show = !register.show;
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh]">
    <div class="flex items-center gap-3 mb-6">
      <UIcon name="i-heroicons-banknotes" class="size-8 text-primary-500" />
      <h1 class="text-3xl font-semibold">Cash Pilot</h1>
    </div>
    <UCard class="w-full max-w-md bg-neutral-900 border-neutral-800">
      <div class="text-center mb-4">
        <h2 class="text-2xl font-semibold">Acesse sua conta</h2>
      </div>

      <UTabs v-model="tab" :items="items" class="mb-4" />

      <div>
        <template v-if="tab === 0">
          <UForm @submit.prevent="entrar">
            <UFormGroup label="E-mail" class="mb-3">
              <UInput
                v-model="login.email"
                placeholder="seuemail@exemplo.com"
                icon="i-heroicons-envelope"
              />
            </UFormGroup>

            <UFormGroup label="Senha" class="mb-1">
              <div class="flex items-center gap-2">
                <UInput
                  v-model="login.password"
                  :type="login.show ? 'text' : 'password'"
                  icon="i-heroicons-lock-closed"
                />
                <UButton
                  color="neutral"
                  variant="ghost"
                  icon="i-heroicons-eye"
                  @click="toggleLoginPassword"
                />
              </div>
            </UFormGroup>

            <div class="flex justify-end mb-4">
              <NuxtLink
                to="/auth/forgot"
                class="text-sm text-primary-400 hover:text-primary-300"
                >Esqueceu sua senha?</NuxtLink
              >
            </div>

            <UButton type="submit" block color="primary" class="h-11"
              >Entrar</UButton
            >
          </UForm>
        </template>

        <template v-else>
          <UForm @submit.prevent="registrar">
            <UFormGroup label="E-mail" class="mb-3">
              <UInput
                v-model="register.email"
                placeholder="seuemail@exemplo.com"
                icon="i-heroicons-envelope"
              />
            </UFormGroup>

            <UFormGroup label="Senha" class="mb-4">
              <div class="flex items-center gap-2">
                <UInput
                  v-model="register.password"
                  :type="register.show ? 'text' : 'password'"
                  icon="i-heroicons-lock-closed"
                />
                <UButton
                  color="neutral"
                  variant="ghost"
                  icon="i-heroicons-eye"
                  @click="toggleRegisterPassword"
                />
              </div>
            </UFormGroup>

            <UButton type="submit" block color="primary" class="h-11"
              >Registrar</UButton
            >
          </UForm>
        </template>
      </div>

      <div class="text-center text-sm mt-6">
        <span>Não tem uma conta? </span>
        <button
          class="text-primary-400 hover:text-primary-300"
          @click="goRegister"
        >
          Registre-se
        </button>
      </div>
    </UCard>
  </div>
</template>
