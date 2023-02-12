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
    const menu = await pool.query(
      "SELECT * from menu order by productid,unitprice"
    );
    res.json(menu.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//add menu item

app.post("/menu", async (req, res) => {
  // let values = "";
  // let keys = "";

  // for (const key in req.body) {
  //   if (typeof req.body[key] === "string") {
  //     values += "'" + req.body[key] + "'";
  //   } else {
  //     values += req.body[key];
  //   }

  //   values += ",";
  //   keys += key + ",";
  // }

  // values = values.substring(0, values.length - 1);
  // keys = keys.substring(0, keys.length - 1);

  try {
    const cevap = await pool.query(
      `insert into menu${getKeys(req.body)} values${getValues(
        req.body
      )} returning id`
    );
    res.json(cevap.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// delete menu item

app.delete("/menu/:id", async (req, res) => {
  try {
    const cevap = await pool.query("delete from menu where id = $1", [
      req.params.id,
    ]);
    res.json(cevap.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//update menu item

app.put("/menu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { query } = req.body;

    await pool.query(`UPDATE menu SET ${query} WHERE id = ${id}`);

    res.json("menu item updated");
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
      "SELECT * FROM costumer_info WHERE phonenumber LIKE $1 LIMIT 5",
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
    const costumerInfo = await pool.query(
      "INSERT INTO costumer_info(phonenumber,costumername,costumeraddress) VALUES($1,$2,$3)",
      [req.body.phoneNumber, req.body.costumerName, req.body.address]
    );
    res.json(costumerInfo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get orderHistory

app.get("/order_history", async (req, res) => {
  try {
    const orderHistory = await pool.query(
      " select * from order_history order by id desc"
    );
    res.json(orderHistory.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//create orderHistory
app.post("/order_history", async (req, res) => {
  try {
    const orderHistory = await pool.query(
      "INSERT INTO order_history(data) VALUES($1)",
      [req.body]
    );
    res.json(orderHistory.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//delete order History

app.delete("/order_history/:id", async (req, res) => {
  try {
    const cevap = await pool.query("delete from order_history where id = $1", [
      req.params.id,
    ]);
    res.json(cevap.json);
  } catch (error) {
    console.error(error.message);
  }
});

//get sizes

app.get("/size", async (req, res) => {
  try {
    const sizes = await pool.query("select * from size");
    res.json(sizes.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// add size

app.post("/size", async (req, res) => {
  try {
    const cevap = await pool.query("insert into size(size) values ($1)", [
      req.body.size,
    ]);
    res.json(cevap.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// delete size

app.delete("/size/:id", async (req, res) => {
  try {
    const cevap = await pool.query("delete from size where id = $1", [
      req.params.id,
    ]);
    res.json(cevap.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// add productsize

app.post("/product_sizes", async (req, res) => {
  let keys = getKeys(req.body);

  let values = getValues(req.body);

  try {
    const cevap = await pool.query(
      `insert into product_sizes${keys} values${values}`
    );

    res.json(cevap.rows);
  } catch (error) {}
});

//delete productsize

app.delete("/product_sizes/:id", async (req, res) => {
  try {
    const cevap = await pool.query(
      "delete from product_sizes where menutableid = $1",
      [req.params.id]
    );
    res.json(cevap.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/product_sizes/:id", async (req, res) => {
  try {
    const cevap = await pool.query(
      "select * from product_sizes where menutableid= $1 order by id",
      [req.params.id]
    );

    res.json(cevap.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.put("/product_sizes/:id", async (req, res) => {
  const { id } = req.params;

  const { query } = req.body;

  try {
    const cevap = await pool.query(
      `UPDATE product_sizes SET ${query} WHERE id = ${id}`
    );

    res.json(cevap.rows);
  } catch (error) {}
});

app.listen(5000, () => {
  console.log("server running on server 5000");
});

const getKeys = (reqJson) => {
  let keys = "(";

  if (reqJson.length > 1) {
    for (const key in reqJson[0]) {
      keys += key + ",";
    }
  } else {
    for (const key in reqJson) {
      keys += key + ",";
    }
  }
  keys = keys.substring(0, keys.length - 1);

  keys += ")";

  return keys;
};

const getValues = (reqJson) => {
  let values = "";

  let perObj = "(";

  if (!Array.isArray(reqJson)) {
    for (const key in reqJson) {
      if (typeof reqJson[key] === "string") {
        perObj += "'" + reqJson[key] + "'";
      } else {
        perObj += reqJson[key];
      }
      perObj += ",";
    }
    perObj = perObj.substring(0, perObj.length - 1);
    perObj += "),";
    values += perObj;

    values = values.substring(0, values.length - 1);
  } else {
    reqJson.forEach((obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "string") {
          perObj += "'" + obj[key] + "'";
        } else {
          perObj += obj[key];
        }
        perObj += ",";
      }
      perObj = perObj.substring(0, perObj.length - 1);
      perObj += "),";
      values += perObj;
      perObj = "(";
    });
    values = values.substring(0, values.length - 1);
  }

  return values;
};
