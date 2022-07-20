import request from "supertest";
import fs from "fs";
import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm";
import { DataSource } from "typeorm";

describe("Create User Controller", () => {

  let connection: DataSource;

  beforeAll(async () => {
    connection = await AppDataSource.initialize();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.destroy();

    let exists = false;
    const path = "./src/database/__test__ignite-feed.sql";

    try {
      await fs.promises.stat(path);
      exists = true;
    } catch (err) {}

    if (exists) {
      await fs.promises.unlink(path);
    }
  });

  it("should create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "Emerson",
      email: "emerson@email.com",
      password: "123456",
      role: "Web Developer",
      avatar: "",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
