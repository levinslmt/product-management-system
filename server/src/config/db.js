import "dotenv/config";
import sql from "mssql/msnodesqlv8.js";

const dbConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  driver: "ODBC Driver 18 for SQL Server",
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

export async function connectDB() {
  try {
    await sql.connect(dbConfig);
    console.log("SQL Server connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

export { sql };