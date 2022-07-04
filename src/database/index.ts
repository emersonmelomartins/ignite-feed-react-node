import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database:
    process.env.NODE_ENV === "test"
      ? "./src/database/test__ignite-feed.sql"
      : "./src/database/ignite-feed.sql",
  // synchronize: true,
  // logging: true,
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
});
