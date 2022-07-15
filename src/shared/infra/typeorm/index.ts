import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database:
    process.env.NODE_ENV === "test"
      ? "./src/database/__test__ignite-feed.sql"
      : "./src/database/ignite-feed.sql",
  synchronize: false,
  logging: false,
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
});