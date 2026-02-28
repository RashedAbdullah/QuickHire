export const Environment = {
  API_URL: typeof window !== "undefined"
    ? "/api"
    : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3004/api",
};
