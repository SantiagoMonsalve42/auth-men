require('dotenv').config();

const express = require('express');
const cors= require('cors');
const app = express();
const port =process.env.PORT;
//database connection
const {dbConnection} = require('./db/config');
dbConnection();
//directorio publico
app.use( express.static("public"));
// CORS
app.use(cors());
//lectura y parseo del body
app.use(express.json());
//routes
app.use('/api/auth',require("./routes/auth"));

app.listen(port, () => {
  console.log(`Auth-Mean app listening at http://localhost:${port}`)
})


