const express = require("express");
const sqlite3 = require("sqlite3");

const app = express();

app.get("/books", (req, res) => {
  // console.log(req.query);
  const db = new sqlite3.Database("./products.db");

  // if (!req.query || req.query.category === "All") {
  //   db.all("SELECT * FROM products", (err, rows) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).send("Internal Server Error");
  //       return;
  //     }
  //     res.json(rows);
  //     db.close();
  //     return;
  //   });
  // }
  const { category, sort, search } = req.query;
  let sqlQuery = "SELECT * FROM products";

  // Build the WHERE clause based on the provided query parameters
  const whereConditions = [];
  if (category && category !== "All") {
    whereConditions.push(`product_category = '${category}'`);
  }
  if (search && search !== "undefined") {
    whereConditions.push(`product_title LIKE '%${search}%'`);
  }

  if (whereConditions.length > 0) {
    sqlQuery += " WHERE " + whereConditions.join(" AND ");
  }

  // Append the ORDER BY clause
  if (sort == "up") {
    sqlQuery += ` ORDER BY product_price DESC`;
  }

  if (sort == "down") {
    sqlQuery += ` ORDER BY product_price`;
  }

  console.log("sqlQuery : ", sqlQuery);

  db.all(sqlQuery, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log(rows);
    res.json(rows);
    db.close();
    return;
  });
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("서버 시작");
});
