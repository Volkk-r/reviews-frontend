
import axios from "axios";

export const TOKEN_KEY = "reviews_access_token";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ?? "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function getApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Не удалось связаться с сервером. Проверьте, запущен ли backend.";
    }

    const data = error.response.data as {
      message?: string;
    } | undefined;

    return (
      data?.message ??
      "Произошла ошибка. Попробуйте ещё раз."
    );
  }

  return "Произошла непредвиденная ошибка.";
}
