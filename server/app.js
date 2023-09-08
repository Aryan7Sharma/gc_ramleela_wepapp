require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
//const bodyParser = require('body-parser')
const morgan = require("morgan");
const connectDB = require('./database/connection');
const { route } = require("./routes/admin");

//import router from './router/route.js';
const authRoute  = require('./routes/auth');
const adminRoute = require('./routes/admin');
const collectorRoute = require('./routes/collector');
/** import middlewares */
const veriftAdmin = require("./middlewares/verifyAdminCred");
const verifyCollector = require("./middlewares/collector/verifyCollectorCred");
/** middlewares */
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('tiny'));// auto logger //dev
app.disable('x-powered-by'); // less hackers know about our stack


const port = process.env.Port || 3001;

/** api routes */
app.use("/api/auth",authRoute);
app.use("/api/admin",veriftAdmin, adminRoute);
app.use("/api/collector",verifyCollector,collectorRoute);

/** start server only when we have valid connection */
connectDB().authenticate().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})
