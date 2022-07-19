const setEnvironment = (env = "dev") =>
  ({
    dev: "http://localhost:3333",
    prod: "https://ignite-feed-note.herokuapp.com/",
  }[env]);

export const environmentUrl = setEnvironment(import.meta.env.VITE_APP_ENV);
