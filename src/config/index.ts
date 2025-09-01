const rawClientUrl = import.meta.env.VITE_CLIENT_BASE_URL ?? "";

const config = {
  SERVER_BASE_URL: import.meta.env.VITE_SERVER_BASE_URL ?? "",
  CLIENT_BASE_URL: rawClientUrl,
  CLIENT_BASE_DOMAIN: rawClientUrl
    ? rawClientUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "",
  CLIENT_NEW_API_URL: import.meta.env.VITE_NEW_API_URL ?? "",
};

export default config;
