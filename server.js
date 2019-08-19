const express = require("express");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./appDB.db", err => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the db.");
});

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const statement = `SELECT * FROM Numbers
CROSS JOIN (SELECT COUNT(*) AS count FROM Numbers)
LEFT JOIN NumberConfiguration On Numbers.id = NumberConfiguration.number_id
LEFT JOIN UserNumbers On Numbers.id = UserNumbers.number_id
LEFT JOIN Users On UserNumbers.user_id = Users.id
ORDER BY number DESC`;

app.get("/api/data", (req, res) => {
  const { current, pageSize } = req.query;
  const offset = (current - 1) * pageSize;
  const query = `${statement} LIMIT ${pageSize} OFFSET ${offset}`;
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    return res.json(rows);
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
