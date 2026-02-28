export const Environment = {
  API_URL:
    typeof window !== "undefined"
      ? "/api"
      : process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://quickhire.dirasah.org/api",
};
