export default defineNuxtRouteMiddleware((to) => {
  const session = useSupabaseSession();

  // rotas públicas
  if (to.path.startsWith('/auth')) return;

  // se não há sessão, bloqueia
  if (!session.value) {
    return navigateTo('/auth', { replace: true });
  }
});