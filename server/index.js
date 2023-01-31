const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const pool = require("./db");

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../build")));

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
      "SELECT * from menu Where categoryid = $1",
      [id]
    );
    res.json(categorizedMenu.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get costumer

app.get("/costumer_info/:phonenumber", async (req, res) => {
  const { phonenumber } = req.params;
  try {
    const costumers = await pool.query(
      "SELECT * FROM costumer_info WHERE phonenumber = $1",
      [phonenumber]
    );
    res.json(costumers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get likely costumers

app.get("/costumer_info_like/:phonenumber", async (req, res) => {
  const { phonenumber } = req.params;
  try {
    const costumers = await pool.query(
      "SELECT * FROM costumer_info WHERE phonenumber LIKE $1",
      [phonenumber + "%"]
    );
    res.json(costumers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//create costumer

app.post("/costumer_info", async (req, res) => {
  try {
    await pool.query(
      "INSERT INTO costumer_info(phonenumber,costumername,costumeraddress) VALUES($1,$2,$3)",
      [req.body.phoneNumber, req.body.costumerName, req.body.address]
    );
  } catch (error) {
    console.error(error.message);
  }
});

//get orderHistory

app.get("/order_history", async (req, res) => {
  try {
    const orderHistory = await pool.query("select * from order_history");
    res.json(orderHistory.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//create orderHistory
app.post("/order_history", async (req, res) => {
  try {
    await pool.query("INSERT INTO order_history(data) VALUES($1)", [req.body]);
  } catch (error) {
    console.error(error.message);
  }
});

//delete order History

app.delete("/order_history/:id", async (req, res) => {
  try {
    await pool.query("delete from order_history where id = $1", [
      req.params.id,
    ]);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("server running on server 5000");
});
