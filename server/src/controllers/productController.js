import { sql } from "../config/db.js";

export async function getProducts(req, res) {
  try {
    const result = await sql.query`
      SELECT *
      FROM Products
      ORDER BY Id DESC
    `;

    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve products",
    });
  }
}

export async function createProduct(req, res) {
  try {
    const { name, description, price, quantity } = req.body;

    const result = await sql.query`
      INSERT INTO Products (Name, Description, Price, Quantity)
      OUTPUT INSERTED.*
      VALUES (${name}, ${description}, ${price}, ${quantity})
    `;

    res.status(201).json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create product",
    });
  }
}