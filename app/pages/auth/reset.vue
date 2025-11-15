<script lang="ts" setup>
import { z } from "zod";
definePageMeta({ layout: "auth" });

const toast = useToast();
const supabase = useSupabaseClient();
//const user = useSupabaseUser();

const state = reactive({
  password: "",
  confirm: "",
  showPassword: false,
  showConfirm: false,
});

const schema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Senha deve ter ao menos 6 caracteres" }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "As senhas não coincidem",
    path: ["confirm"],
  });

/* onMounted(() => {
  if (!user.value) navigateTo("/auth");
}); */

const submit = async () => {
  const { error } = await supabase.auth.updateUser({
    password: state.password,
  });

  if (error) {
    toast.add({
      title: "Erro ao atualizar senha",
      description: error.message,
      color: "error",
    });
    return;
  }

  toast.add({
    title: "Senha atualizada",
    description: "Sua senha foi redefinida com sucesso.",
    color: "success",
  });
  navigateTo("/");
};

const togglePassword = () => {
  state.showPassword = !state.showPassword;
};

const toggleConfirm = () => {
  state.showConfirm = !state.showConfirm;
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <UCard class="w-full max-w-md bg-neutral-900 border-neutral-800">
      <div class="flex items-center gap-3 mb-6">
        <UIcon name="i-heroicons-lock-open" class="size-8 text-primary-500" />
        <h1 class="text-3xl font-semibold">Definir nova senha</h1>
      </div>

      <UForm
        :state="state"
        :schema="schema"
        class="flex flex-col gap-4"
        @submit="submit"
      >
        <UFormField label="Nova senha" name="password">
          <UInput
            v-model="state.password"
            class="w-full"
            size="lg"
            :type="state.showPassword ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="state.showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="
                  state.showPassword ? 'Hide password' : 'Show password'
                "
                :aria-pressed="state.showPassword"
                aria-controls="password"
                @click="togglePassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UFormField label="Confirmar nova senha" name="confirm">
          <UInput
            v-model="state.confirm"
            class="w-full"
            size="lg"
            :type="state.showConfirm ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="state.showConfirm ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="
                  state.showConfirm ? 'Hide confirm' : 'Show confirm'
                "
                :aria-pressed="state.showConfirm"
                aria-controls="confirm"
                @click="toggleConfirm"
              />
            </template>
          </UInput>
        </UFormField>

        <UButton
          type="submit"
          block
          color="primary"
          class="h-9 hover:cursor-pointer"
          >Atualizar senha</UButton
        >
      </UForm>
    </UCard>
  </div>
</template>
