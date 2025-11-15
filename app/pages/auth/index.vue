<script lang="ts" setup>
import { z } from "zod";
definePageMeta({ layout: "auth" });

const items = [
  { label: "Login", icon: "i-heroicons-user", slot: "login" },
  { label: "Registrar", icon: "i-heroicons-user-plus", slot: "register" },
];

const loginData = reactive({ email: "", password: "", showPassword: false });
const registerData = reactive({
  full_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  showConfirmPassword: false,
});

const toast = useToast();
const supabase = useSupabaseClient();

const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter ao menos 6 caracteres" }),
});

const registerSchema = z
  .object({
    full_name: z.string().min(2, { message: "Nome muito curto" }),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter ao menos 6 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const login = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: loginData.email,
    password: loginData.password,
  });

  if (error) {
    toast.add({
      title: "Erro ao entrar",
      description: error.message,
      color: "error",
    });
    return;
  }

  toast.add({
    title: "Login realizado",
    description: "Bem-vindo!",
    color: "success",
  });

  navigateTo("/");
};

const register = async () => {
  const { error } = await supabase.auth.signUp({
    email: registerData.email,
    password: registerData.password,
    options: {
      data: {
        full_name: registerData.full_name,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    toast.add({
      title: "Erro no cadastro",
      description: error.message,
      color: "error",
    });
    return;
  }

  toast.add({
    title: "Conta criada",
    description: "Verifique seu e-mail para confirmar o cadastro.",
    color: "success",
  });
};

const toggleLoginPassword = () => {
  loginData.showPassword = !loginData.showPassword;
};

const toggleRegisterPassword = () => {
  registerData.showPassword = !registerData.showPassword;
};

const toggleRegisterConfirmPassword = () => {
  registerData.showConfirmPassword = !registerData.showConfirmPassword;
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <UCard class="w-full max-w-md bg-neutral-900 border-neutral-800">
      <div class="flex items-center gap-3 mb-6">
        <UIcon name="i-heroicons-banknotes" class="size-8 text-primary-500" />
        <h1 class="text-3xl font-semibold">Cash Pilot</h1>
      </div>

      <UTabs :items="items" class="mb-4">
        <template #login>
          <UForm
            :state="loginData"
            class="flex flex-col gap-4 mt-4"
            :schema="loginSchema"
            @submit="login"
          >
            <UFormField label="E-mail" name="email">
              <UInput
                v-model="loginData.email"
                class="w-full"
                size="lg"
                icon="i-heroicons-envelope"
              />
            </UFormField>
            <UFormField label="Senha" name="password">
              <UInput
                v-model="loginData.password"
                placeholder="Password"
                class="w-full"
                size="lg"
                :type="loginData.showPassword ? 'text' : 'password'"
                :ui="{ trailing: 'pe-1' }"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="
                      loginData.showPassword
                        ? 'i-lucide-eye-off'
                        : 'i-lucide-eye'
                    "
                    :aria-label="
                      loginData.showPassword ? 'Hide password' : 'Show password'
                    "
                    :aria-pressed="loginData.showPassword"
                    aria-controls="password"
                    @click="toggleLoginPassword"
                  />
                </template>
              </UInput>
            </UFormField>
            <div class="flex justify-end mb-4">
              <NuxtLink
                to="/auth/forgot"
                class="text-sm text-primary-400 hover:text-primary-300"
                >Esqueceu sua senha?</NuxtLink
              >
            </div>

            <UButton
              type="submit"
              block
              color="primary"
              class="h-9 hover:cursor-pointer"
              >Entrar</UButton
            >
          </UForm>
        </template>

        <template #register>
          <UForm
            :state="registerData"
            class="flex flex-col gap-4 mt-4"
            :schema="registerSchema"
            @submit="register"
          >
            <UFormField label="Nome" name="name">
              <UInput
                v-model="registerData.full_name"
                class="w-full"
                size="lg"
                icon="i-heroicons-user"
              />
            </UFormField>
            <UFormField label="E-mail" name="email">
              <UInput
                v-model="registerData.email"
                class="w-full"
                size="lg"
                icon="i-heroicons-lock-closed"
              />
            </UFormField>
            <UFormField label="Senha" name="password">
              <UInput
                v-model="registerData.password"
                class="w-full"
                size="lg"
                icon="i-heroicons-lock-closed"
                :type="registerData.showPassword ? 'text' : 'password'"
                :ui="{ trailing: 'pe-1' }"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="ghost"
                    :icon="
                      registerData.showPassword
                        ? 'i-lucide-eye-off'
                        : 'i-lucide-eye'
                    "
                    :aria-label="
                      registerData.showPassword
                        ? 'Hide password'
                        : 'Show password'
                    "
                    :aria-pressed="registerData.showPassword"
                    aria-controls="password"
                    @click="toggleRegisterPassword"
                  />
                </template>
              </UInput>
            </UFormField>
            <UFormField label="Confirmar Senha" name="confirmPassword">
              <UInput
                v-model="registerData.confirmPassword"
                class="w-full"
                size="lg"
                icon="i-heroicons-lock-closed"
                :type="registerData.showConfirmPassword ? 'text' : 'password'"
                :ui="{ trailing: 'pe-1' }"
              >
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="ghost"
                    :icon="
                      registerData.showConfirmPassword
                        ? 'i-lucide-eye-off'
                        : 'i-lucide-eye'
                    "
                    :aria-label="
                      registerData.showConfirmPassword
                        ? 'Hide confirm password'
                        : 'Show confirm password'
                    "
                    :aria-pressed="registerData.showConfirmPassword"
                    aria-controls="confirmPassword"
                    @click="toggleRegisterConfirmPassword"
                  />
                </template>
              </UInput>
            </UFormField>

            <UButton type="submit" block color="primary" class="mt-4 h-9"
              >Registrar</UButton
            >
          </UForm>
        </template>
      </UTabs>
    </UCard>
  </div>
</template>
