"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mysql2_1 = __importDefault(require("mysql2"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
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
var db = mysql2_1.default.createPool({
    database: "gentis",
    user: "gentis_usuario",
    host: "localhost",
    password: "app",
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.get('/api/autorizacion_imagen', (req, res) => {
//     const query = 'SELECT * FROM autorizacion';
//     connection.query(query, (err, rows) => {
//         if (err) throw err;
//         return res.send(rows);
//     })
// })
app.get("/api", function (req, res) {
    res.send("It works?");
});
// app.get("/api/autorizacion_imagen", (req, res) => {
//   res.send("It works imagen");
// });
app.get("/api/autorizacion", function (req, res) {
    var query = "SELECT * FROM autorizacion";
    db.query(query, function (err, data) {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});
app.post("/api/autorizacion_imagen", function (req, res) {
    var query = "INSERT INTO autorizacion (`nombre`, `apellido`, `dni`, `firma`) VALUES (?)";
    var values = [
        req.body.nombre,
        req.body.apellido,
        req.body.dni,
        req.body.firma,
    ];
    db.query(query, [values], function (err, data) {
        if (err)
            return res.json(err);
        return res.json("autorizacion");
    });
});
//settings
var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log("App is running");
});
//# sourceMappingURL=app.js.map