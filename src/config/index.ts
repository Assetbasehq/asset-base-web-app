const rawClientUrl = import.meta.env.VITE_CLIENT_BASE_URL ?? "";

const env = {
  SERVER_BASE_URL: import.meta.env.VITE_SERVER_BASE_URL ?? "",
  CLIENT_BASE_URL: rawClientUrl,
  CLIENT_BASE_DOMAIN: rawClientUrl
    ? rawClientUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "",
  WEB3_SERVICE_BASE_URL: import.meta.env.VITE_WEB3_SERVICE_BASE_URL ?? "",
  DOJAH_APP_ID: import.meta.env.VITE_DOJAH_APP_ID ?? "",
  DOJAH_PUBLIC_KEY: import.meta.env.VITE_DOJAH_PUBLIC_KEY ?? "",
  DOJAH_WIDGET_ID: import.meta.env.VITE_DOJAH_WIDGET_ID ?? "",
};

export default env;
