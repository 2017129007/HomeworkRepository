const express = require("express");
const sqlite3 = require("sqlite3");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
// body-parser 미들웨어 사용
app.use(bodyParser.json());

app.get("/books", (req, res) => {
  const db = new sqlite3.Database("./products.db");
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

  db.all(sqlQuery, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    // console.log(rows);
    res.json(rows);
    db.close();
    return;
  });
});

app.get("/product/:id", async (req, res) => {
  const db = new sqlite3.Database("./products.db");

  const productId = req.params.id;
  // let productData;
  const productData = await new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM products WHERE product_id=${productId}`,
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      }
    );
  });
  // res.send("hi")
  const product = productData[0];

  fs.readFile("comments.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    let comments = [];
    if (data) {
      comments = JSON.parse(data);
    }

    const filteredComments = comments.filter(
      (comment) => comment.productId === productId
    );
    const commentArray = filteredComments.map((comment) => comment.comment);
    // 동적으로 생성된 <div> 태그들을 담을 변수
    let divTags = "";

    commentArray.forEach((comment) => {
      // 동적으로 생성할 <div> 태그를 문자열로 작성하여 divTags에 추가
      divTags += `<div>${comment}</div>`;
    });

    fs.readFile(
      path.join(__dirname, "/public/detail.html"),
      "utf8",
      (err, data) => {
        if (err) {
          console.error(err);
          // res.status(500).send("Internal Server Error");
          // return;
        }

        console.log("PRODUCT", product);

        // HTML 파일 내용을 가져와서 상품 정보를 삽입합니다
        const renderedHtml = data
          .replace("{{title}}", product.product_title)
          .replace("{{id}}", product.product_id)
          .replace("{{price}}", product.product_price)
          .replace("{{img}}", product.product_image.replace(".", ""))
          .replace("{{category}}", product.product_category)
          .replace("{{comments}}", divTags);
        res.send(renderedHtml);
        // res.send(data);
        return;
      }
    );
  });
});

// app.post("/comment", (req, res) => {
//   console.log("req.body", req.body);

//   // comments.json에 데이터 저장
//   // 예를 들어, 파일 시스템을 사용하여 저장하는 경우
//   const fs = require("fs");
//   const newComments = req.body;

//   fs.readFile("comments.json", "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }

//     let comments = [];
//     if (data) {
//       comments = JSON.parse(data);
//     }

//     comments.push(comment);

//     fs.writeFile("comments.json", JSON.stringify(comments), (err) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Internal Server Error");
//         return;
//       }
//     res.status(200).send("Comment saved successfully");
//   });

// });

app.post("/comment", (req, res) => {
  console.log("req.body", req.body);

  // comments.json에 데이터 저장
  // 예를 들어, 파일 시스템을 사용하여 저장하는 경우
  const fs = require("fs");
  const newComment = req.body;

  fs.readFile("comments.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    let comments = [];
    if (data) {
      comments = JSON.parse(data);
    }

    comments.push(newComment);

    fs.writeFile("comments.json", JSON.stringify(comments), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(200).send("Comment saved successfully");
    });
  });
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("서버 시작");
});
