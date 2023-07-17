const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 4000;
const morgan = require('morgan');
const { mysqlConn } = require('./database-MySQL');

//Middleware
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use(require('./routes/routes'));

//Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`);
});



