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

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const result = await sql.query`
      UPDATE Products
      SET
        Name = ${name},
        Description = ${description},
        Price = ${price},
        Quantity = ${quantity}
      OUTPUT INSERTED.*
      WHERE Id = ${id}
    `;

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update product",
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const result = await sql.query`
      DELETE FROM Products
      OUTPUT DELETED.*
      WHERE Id = ${id}
    `;

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
      product: result.recordset[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete product",
    });
  }
}

export async function getProductReport(req, res) {
  try {
    const result = await sql.query`
      SELECT
        COUNT(*) AS totalProducts,
        COALESCE(SUM(Quantity), 0) AS totalQuantity,
        COALESCE(SUM(Price * Quantity), 0) AS totalInventoryValue
      FROM Products
    `;

    res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to generate product report",
    });
  }
}