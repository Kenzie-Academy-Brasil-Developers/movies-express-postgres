import { Client } from "pg";

const client: Client = new Client({
  user: "postgres",
  password: "1234",
  host: "localhost",
  database: "db_movies",
  port: 5432,
});

const startDataBase = async (): Promise<void> => {
  await client.connect();
  console.log("Database connected!");
};

export { client, startDataBase };
