import postgres from "postgres";

export const sql = postgres({
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
});

export async function connect() {
  await sql`SELECT 1;`;
}

export default sql;
