import "reflect-metadata";
import "express-async-errors";
import express from "express";
import cors from "cors";

import { serve, setup } from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { handleError } from "./middlewares/handleError";
import { showLogInfo } from "./middlewares/showLogInfo";

import { AppDataSource } from "../typeorm";

import { routes } from "./routes";

import uploadConfig from "@config/upload";

import "@shared/container";

AppDataSource.initialize();

const app = express();

app.use(express.json());

app.use(cors());

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ignite Feed API",
      version: "0.0.1",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
  },
  apis: ["./src/routes/*.routes.ts"],
};
const swaggerSpec = swaggerJsdoc(options);
app.use("/swagger", serve, setup(swaggerSpec));

app.use(showLogInfo);

app.use("/avatar", express.static(`${uploadConfig.tmpDestination}/avatar`));

app.use(routes);

app.use(handleError);

export { app };
