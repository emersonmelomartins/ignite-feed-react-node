import { app } from "./app";
import "dotenv/config";

app.listen(process.env.APP_PORT, () =>
  console.log(`Server started at port ${process.env.APP_PORT}...`)
);
