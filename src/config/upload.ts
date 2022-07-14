import { AppError } from "@shared/errors/AppError";
import { Request } from "express";
import multer, { Multer } from "multer";
import path, { resolve } from "path";

const tmpDestination = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpDestination,
  storage: multer.diskStorage({
    destination: tmpDestination,
    filename: (request, file, cb) => {
      const dateNow = new Date().getTime();
      const fileName = `${dateNow}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: (
    request: Request,
    file: Express.Multer.File,
    cb: any
  ) => {
    const filetypes = /jpeg|jpg|png|gif|svg|ico/;

    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(null, false)
      return cb(
        new AppError("Incorrect file type, you have to upload only images."),
        true
      );
    }
  },
};
