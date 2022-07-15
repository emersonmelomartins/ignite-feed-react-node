import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database:
    process.env.NODE_ENV === "test"
      ? "./dist/database/__test__ignite-feed.sql"
      : "./dist/database/ignite-feed.sql",
  synchronize: false,
  logging: false,
  entities: ["./dist/modules/**/entities/*.js"],
  migrations: ["./dist/shared/infra/typeorm/migrations/*.js"],
  // entities: ["./src/modules/**/entities/*.ts"],
  // migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});
