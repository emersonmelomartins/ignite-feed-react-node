import { AppDataSource } from "../../../../database";
import { app } from "../../../../app";
import request from "supertest";

describe("Create User Controller", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it("should create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "Emerson",
      email: "emerson@email.com",
      password: "1234",
      role: "Web Developer",
      avatar: "",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
