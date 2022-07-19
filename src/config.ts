const setEnvironment = (env = "dev") =>
  ({
    dev: "http://localhost:3333",
    prod: "http://google.com.br",
  }[env]);

export const environmentUrl = setEnvironment(import.meta.env.VITE_APP_ENV);
