import fs from "fs";
import { resolve } from "path";
import { IStorageProvider } from "../IStorageProvider";
import uploadConfig from "@config/upload";

export class LocalStorageProvider implements IStorageProvider {
  async save(fileName: string, folderName: string): Promise<string> {

    const folderPath = resolve(uploadConfig.tmpDestination, folderName);

    const oldFilePath = resolve(uploadConfig.tmpDestination, fileName);
    
    const newFilePath = resolve(
      folderPath,
      fileName
    );

        
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    await fs.promises.rename(oldFilePath, newFilePath);

    return fileName;
  }

  async delete(fileName: string, folderName: string): Promise<void> {
    const folderPath = resolve(uploadConfig.tmpDestination, folderName);

    const currentFilePath = resolve(folderPath, fileName);
    
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    try {

      await fs.promises.stat(currentFilePath);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(currentFilePath);
  }
}
