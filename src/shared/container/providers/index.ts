import { container } from "tsyringe";
import { CloudinaryStorageProvider } from "./implementations/CloudinaryStorageProvider";
import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { IStorageProvider } from "./IStorageProvider";
import "dotenv/config";

const storageProvider =
  process.env.APP_ENVIRONMENT === "dev"
    ? LocalStorageProvider
    : CloudinaryStorageProvider;

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  storageProvider
);
