export interface IStorageProvider {
  save(fileName: string, folderName: string): Promise<string>;
  delete(fileName: string, folderName: string): Promise<void>;
}
