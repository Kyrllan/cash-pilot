<script lang="ts" setup>
import { z } from "zod";
definePageMeta({ layout: "auth" });

const toast = useToast();
const supabase = useSupabaseClient();

const state = reactive({ email: "" });

const schema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
});

const submit = async () => {
  const { error } = await supabase.auth.resetPasswordForEmail(state.email, {
    redirectTo: `${window.location.origin}/auth/reset#`,
  });

  if (error) {
    toast.add({
      title: "Erro ao enviar e-mail",
      description: error.message,
      color: "error",
    });
    return;
  }

  toast.add({
    title: "E-mail enviado",
    description: "Verifique sua caixa de entrada para redefinir a senha.",
    color: "success",
  });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <UCard class="w-full max-w-md bg-neutral-900 border-neutral-800">
      <div class="flex items-center gap-3 mb-6">
        <UIcon name="i-heroicons-key" class="size-8 text-primary-500" />
        <h1 class="text-3xl font-semibold">Redefinir senha</h1>
      </div>

      <UForm
        :state="state"
        :schema="schema"
        class="flex flex-col gap-4"
        @submit="submit"
      >
        <UFormField label="E-mail" name="email">
          <UInput
            v-model="state.email"
            class="w-full"
            size="lg"
            icon="i-heroicons-envelope"
          />
        </UFormField>

        <UButton
          type="submit"
          block
          color="primary"
          class="h-9 hover:cursor-pointer"
          >Enviar link</UButton
        >

        <NuxtLink
          to="/auth"
          class="text-sm text-primary-400 hover:text-primary-300 text-center"
          >Voltar ao login</NuxtLink
        >
      </UForm>
    </UCard>
  </div>
</template>
