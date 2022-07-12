import multer from "multer";
import { resolve } from "path";

const tmpDestination = resolve(__dirname, "..", "..", "tmp");

export default {
  storage: multer.diskStorage({
    destination: tmpDestination,
    filename: (request, file, cb) => {
      const dateNow = new Date().getTime();
      const fileName = `${dateNow}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
