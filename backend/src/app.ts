import { responseEncoding } from "axios";
import express, { Request, Response } from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
// const connectionString = process.env.DATABASE_URL;
// const connection = mysql.createConnection(connectionString);
// connection.connect();

// async function database() {
//   // get the client
//   const mysql = require("mysql2");
//   // create the pool
//   const pool = mysql.createPool({
//     database: "gentis",
//     username: "461sftftvkv2aqfqlndv",
//     host: "eu-central.connect.psdb.cloud",
//     password: "pscale_pw_tofEebk9P7maosfO0GFEjfIdq9CgEQVKgjs6pDfTslY",
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   });
//   // now get a Promise wrapped instance of that pool
//   const promisePool = pool.promise();
//   // query database using promises
//   const [rows, fields] = await promisePool.query("SELECT 1");
// }

//get the client

// create the pool
// const db = mysql.createPool({
//   database: "gentis",
//   user: "461sftftvkv2aqfqlndv",
//   host: "eu-central.connect.psdb.cloud",
//   password: "pscale_pw_tofEebk9P7maosfO0GFEjfIdq9CgEQVKgjs6pDfTslY",
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

const db = mysql.createPool({
  database: "gentis",
  user: "gentis_usuario",
  host: "localhost",
  password: "app",
});

app.use(express.json());
app.use(cors());

// app.get('/api/autorizacion_imagen', (req, res) => {
//     const query = 'SELECT * FROM autorizacion';
//     connection.query(query, (err, rows) => {
//         if (err) throw err;
//         return res.send(rows);
//     })
// })

app.get("/api", (req, res) => {
  res.send("It works?");
});

// app.get("/api/autorizacion_imagen", (req, res) => {
//   res.send("It works imagen");
// });

app.get("/api/autorizacion", (req, res) => {
  const query = "SELECT * FROM autorizacion";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/api/autorizacion_imagen", (req, res) => {
  const query =
    "INSERT INTO autorizacion (`nombre`, `apellido`, `dni`, `firma`) VALUES (?)";
  const values = [
    req.body.nombre,
    req.body.apellido,
    req.body.dni,
    req.body.firma,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("autorizacion");
  });
});

//settings
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("App is running");
});
