const { Pool } = require("pg");
const fs = require("fs");

// const pool = new Pool({
//   user: "postgres",
//   password: "nagonad228",
//   host: "localhost",
//   port: 5432,
//   database: "postgres",
// });

const pool = new Pool({
  user: "avnadmin",
  password: "AVNS_GOnsdnzA0FusC-UiNHh",
  host: "pg-restaurant-nagonad.aivencloud.com",
  port: 13043,
  database: "restaurant",
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(__dirname + "/ca.pem").toString(),
  },
});

// const pool = new Pool({
//   user: "reader",
//   password: "NWDMCE5xdipIjRrp",
//   host: "hh-pgsql-public.ebi.ac.uk",
//   port: 5432,
//   database: "pfmegrnargs",
// });

pool.query("select * from menu").then((data) => console.log(data));

// pool.connect();

module.exports = pool;
