import { DataSource } from "typeorm";
import "dotenv/config";

const rootPath = process.env.APP_ENVIRONMENT === "dev" ? "./src" : "./dist";
const fileExt = process.env.APP_ENVIRONMENT === "dev" ? "*.ts" : "*.js";

const database =
  process.env.NODE_ENV === "test"
    ? `${rootPath}/database/__test__ignite-feed.sql`
    : `${rootPath}/database/ignite-feed.sql`;

export const AppDataSource = new DataSource({
  type: "sqlite",
  database,
  synchronize: false,
  logging: false,
  entities: [`${rootPath}/modules/**/entities/${fileExt}`],
  migrations: [`${rootPath}/shared/infra/typeorm/migrations/${fileExt}`],
});
