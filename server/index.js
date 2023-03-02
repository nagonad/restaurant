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
    const menu = await pool.query("SELECT * from menu order by productid");
    res.json(menu.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

//add menu item

app.post("/menu", async (req, res) => {
  try {
    const cevap = await pool.query(
      `insert into menu${getKeys(req.body)} values${getValues(
        req.body
      )} returning id`
    );
    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
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
    res.sendStatus(500);
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
    res.sendStatus(500);
  }
});

//get categories
app.get("/categories", async (req, res) => {
  try {
    const menu = await pool.query("SELECT * from categories");
    res.json(menu.rows);
  } catch (error) {
    res.sendStatus(500);
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
    res.sendStatus(500);
  }
});

//get costumer

app.get("/costumer_info", async (req, res) => {
  try {
    const cevap = await pool.query("select * from costumer_info");

    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

// app.get("/costumer_info/:phonenumber", async (req, res) => {
//   const { phonenumber } = req.params;
//   try {
//     const costumers = await pool.query(
//       "SELECT * FROM costumer_info WHERE phonenumber = $1",
//       [phonenumber]
//     );
//     res.json(costumers.rows);
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });

//get likely costumers

app.get("/costumer_info_like/:phonenumber", async (req, res) => {
  const { phonenumber } = req.params;
  try {
    const costumers = await pool.query(
      "SELECT * FROM costumer_info WHERE phonenumber LIKE $1 limit 10",
      [phonenumber + "%"]
    );
    res.json(costumers.rows);
  } catch (error) {
    res.sendStatus(500);
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
    res.sendStatus(500);
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
    res.sendStatus(500);
  }
});

//create orderHistory
app.post("/order_history", async (req, res) => {
  const keys = getKeys(req.body);

  const values = getValues(req.body);

  try {
    const orderHistory = await pool.query(
      `INSERT INTO order_history${keys} VALUES${values}`
    );
    res.json(orderHistory.rows);
  } catch (error) {
    res.sendStatus(500);
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
    res.sendStatus(500);
  }
});

//get sizes

app.get("/size", async (req, res) => {
  try {
    const sizes = await pool.query("select * from size");
    res.json(sizes.rows);
  } catch (error) {
    res.sendStatus(500);
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
    res.sendStatus(500);
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
    res.sendStatus(500);
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
  } catch (error) {
    res.sendStatus(500);
  }
});

//delete productsize

// app.delete("/product_sizes/:id", async (req, res) => {
//   try {
//     const cevap = await pool.query(
//       "delete from product_sizes where menutableid = $1",
//       [req.params.id]
//     );
//     res.json(cevap.rows);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// get product's sizes

app.get("/product_sizes/:id", async (req, res) => {
  try {
    const cevap = await pool.query(
      "select * from product_sizes where menutableid= $1 order by id",
      [req.params.id]
    );

    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

// update product's sizes

app.put("/product_sizes/:id", async (req, res) => {
  const { id } = req.params;

  const { query } = req.body;

  try {
    const cevap = await pool.query(
      `UPDATE product_sizes SET ${query} WHERE id = ${id}`
    );

    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

// post variants

app.post("/variantControl", async (req, res) => {
  let keys = getKeys(req.body);

  let values = getValues(req.body);

  try {
    const cevap = pool.query(`insert into variants${keys} values${values}`);

    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

// get variants

app.get("/variantControl", async (req, res) => {
  try {
    const cevap = await pool.query(
      "select * from variants order by price,variantname"
    );

    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

//delete variants

app.delete("/variantControl/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cevap = await pool.query(`delete from variants where id=${id}`);

    res.json(cevap);
  } catch (error) {
    res.sendStatus(500);
  }
});

//update variants

app.put("/variantControl/:id", async (req, res) => {
  const { id } = req.params;

  const query = getUpdateQuery(req.body);

  try {
    const cevap = await pool.query(
      `update variants set ${query} where id=${id}`
    );
    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

// post variants to product's sizes

app.post("/productSizeVariant", async (req, res) => {
  let keys = getKeys(req.body);

  let values = getValues(req.body);

  try {
    const cevap = pool.query(
      `insert into product_size_variants${keys} values${values}`
    );

    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

// get product size variants

app.get("/productSizeVariant", async (req, res) => {
  try {
    const cevap = await pool.query(
      "select * from menu inner join product_sizes on menu.id = product_sizes.menutableid  inner join product_size_variants on product_sizes.id = product_size_variants.productsizeid inner join variants on variants.id=product_size_variants.variantid "
    );
    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

// get product size variants by id

app.get("/productSizeVariant/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cevap = await pool.query(
      `select * from menu inner join product_sizes on menu.id = product_sizes.menutableid  inner join product_size_variants on product_sizes.id = product_size_variants.productsizeid inner join variants on variants.id=product_size_variants.variantid where productsizeid=${id}`
    );
    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

//delete product size's variant

app.delete("/productSizeVariant/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cevap = await pool.query(
      `delete from product_size_variants where sizevariantid=${id}`
    );

    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

// delete product size's varíant by variantgroupid

app.delete("/productSizeVariantNewTry/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cevap = await pool.query(
      `delete from product_size_variants where variantgroupid=${id}`
    );

    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

// post variant group

app.post("/variantGroupControl", async (req, res) => {
  const keys = getKeys(req.body);

  const values = getValues(req.body);

  try {
    const cevap = await pool.query(
      `insert into variant_group${keys} values${values}`
    );

    res.json(cevap);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get("/variantGroupControl", async (req, res) => {
  try {
    const cevap = await pool.query("select * from variant_group");

    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.delete("/variantGroupControl/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cevap = await pool.query(
      `delete from variant_group where variantgroupid=${id}`
    );
    res.json(cevap);
  } catch (error) {
    console.error(error.message);
  }
});

app.put("/variantGroupControl/:id", async (req, res) => {
  let { id } = req.params;

  let query = getUpdateQuery(req.body);

  try {
    const cevap = await pool.query(
      `update variant_group set ${query} where variantgroupid=${id}`
    );

    res.json(cevap);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/variantGroupControl/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cevap = await pool.query(
      `select * from variant_group inner join variant_group_variants on variant_group_variants.variantgroupid  = variant_group.variantgroupid inner join variants on variants.id= variant_group_variants.variantid where variant_group.variantgroupid =${id}`
    );

    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/variantGroupVariants", async (req, res) => {
  let keys = getKeys(req.body);

  let values = getValues(req.body);

  try {
    const cevap = await pool.query(
      `insert into variant_group_variants${keys} values${values}`
    );
    res.json(cevap);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/variantGroupVariants/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cevap = await pool.query(
      `select * from variant_group_variants where variantgroupid=${id} `
    );

    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.delete("/variantGroupVariants/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cevap = await pool.query(
      `delete from variant_group_variants where vgvid=${id}`
    );
    res.json(cevap);
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/productSizeVariantGroup", async (req, res) => {
  let keys = getKeys(req.body);

  let values = getValues(req.body);

  try {
    const cevap = await pool.query(
      `insert into product_size_variant_groups${keys} values${values}`
    );
    res.json(cevap);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/productSizeVariantGroup/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cevap = await pool.query(
      `select * from product_size_variant_groups inner join product_sizes on product_sizes.id=product_size_variant_groups.productsizeid inner join variant_group on variant_group.variantgroupid=product_size_variant_groups.variantgroupid where product_size_variant_groups.productsizeid = ${id}`
    );

    res.json(cevap.rows);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.delete("/productSizeVariantGroup/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cevap = await pool.query(
      `delete from product_size_variant_groups where productsizevariantgroupid=${id}`
    );
    res.json(cevap);
  } catch (error) {
    console.error(error.message);
  }
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

const getUpdateQuery = (obj) => {
  let query = "";

  for (const key in obj) {
    query += key + "='" + obj[key] + "',";
  }

  query = query.substring(0, query.length - 1);

  return query;
};
