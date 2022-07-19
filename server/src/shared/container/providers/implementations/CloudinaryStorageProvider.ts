import { IStorageProvider } from "../IStorageProvider";
import { resolve } from "path";
import fs from "fs";

import uploadConfig from "@config/upload";
import { cloudinary } from "@utils/cloudinary";

export class CloudinaryStorageProvider implements IStorageProvider {
  async save(fileName: string, folderName: string): Promise<string> {
    const oldFilePath = resolve(uploadConfig.tmpDestination, fileName);

    const res = await cloudinary.uploader.upload(oldFilePath, {
      folder: folderName,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    await fs.promises.unlink(oldFilePath);

    return fileName;
  }

  async delete(fileName: string, folderName: string): Promise<void> {
    const fileWithoutExt = fileName.split(".")[0];
    const filePath = `${folderName}/${fileWithoutExt}`;

    await cloudinary.uploader.destroy(filePath);
  }
}
