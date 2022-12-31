const express = require("express");
const app = express();
const cors = require("cors");

const pool = require("./db");

app.use(cors());
app.use(express.json());

//get all menu
app.get("/menu", async (req, res) => {
  try {
    const menu = await pool.query("SELECT * from menu");
    res.json(menu.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get categories
app.get("/categories", async (req, res) => {
  try {
    const menu = await pool.query("SELECT * from categories");
    res.json(menu.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//categorized Menu
app.get("/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const categorizedMenu = await pool.query(
      "SELECT * from menu Where categoryid=$1",
      [id]
    );
    res.json(categorizedMenu.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get costumer

//create costumer

//get orderHistory

//create orderHistory
app.post("/orderHistory", async (req, res) => {
  try {
    await pool.query("INSERT INTO order_history(data) VALUES($1)", [req.body]);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("server running on server 5000");
});
