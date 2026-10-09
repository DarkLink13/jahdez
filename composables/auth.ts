import type { FormError } from "#ui/types";

export interface AuthCredentials {
  email: string;
  password: string;
}

export const useAuthForm = () => {
  const { t } = useI18n();

  const validate = (
    s: AuthCredentials,
    { minPasswordLength = 0 } = {},
  ): FormError[] => {
    const errors: FormError[] = [];
    if (!s.email) {
      errors.push({ path: "email", message: t("auth.errors.emailRequired") });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email)) {
      errors.push({ path: "email", message: t("auth.errors.emailInvalid") });
    }
    if (!s.password) {
      errors.push({
        path: "password",
        message: t("auth.errors.passwordRequired"),
      });
    } else if (s.password.length < minPasswordLength) {
      errors.push({
        path: "password",
        message: t("auth.errors.passwordTooShort", { min: minPasswordLength }),
      });
    }
    return errors;
  };

  // The server forwards EdgeDB's raw response, which is sometimes a JSON string
  // like {"error": {"message": "..."}} and sometimes plain text.
  const errorMessage = (e: any): string => {
    if (!e?.response) return t("auth.errors.network");

    let message: string = (e.data?.message ?? "").replace(
      /^Error from auth server:\s*/,
      "",
    );
    try {
      message = JSON.parse(message)?.error?.message ?? message;
    } catch {}

    if (/no identity found/i.test(message))
      return t("auth.errors.invalidCredentials");
    if (/already (been )?registered|already exists/i.test(message))
      return t("auth.errors.alreadyRegistered");
    if (/verif/i.test(message)) return t("auth.errors.unverified");
    if (e.response.status >= 500 || !message) return t("auth.errors.server");
    return message;
  };

  return { validate, errorMessage };
};
