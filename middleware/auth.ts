import { useEdgeDbIdentity } from "#imports";
export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useEdgeDbIdentity();
  if (isLoggedIn.value) return;
  return "/auth/login";
});
