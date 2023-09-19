require("dotenv").config();
const express = require("express");
const app = express();
// const http = require('http');
// const chatSocket = require('./routes/socket'); // Import your authentication routes
// const server = http.createServer(app);
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require('body-parser')
const morgan = require("morgan");
const connectDB = require('./database/connection');

//const httpServer = require('http').createServer(app);
//const io = require('socket.io')(httpServer);


//import router from './router/route.js';
const authRoute  = require('./routes/auth');
const adminRoute = require('./routes/admin');
const collectorRoute = require('./routes/collector');
const commonRoute = require('./routes/common');
/** import middlewares */
const veriftAdmin = require("./middlewares/verifyAdminCred");
const verifyCollector = require("./middlewares/collector/verifyCollectorCred");
const validateAlltypeUser = require('./middlewares/auth/verifyAllTypeUser');
/** middlewares */
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('tiny'));// auto logger //dev
app.disable('x-powered-by'); // less hackers know about our stack


const port = process.env.Port || 3001;

const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (data) => {
    // Broadcast the message to all connected clients
    io.emit('message', data);

    // Optionally, save the message to a database
    //saveMessageToDB(data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Mount the Socket.io server under a specific route
//chatSocket(server);
/** api routes */
// Use the authentication routes defined in authRoutes.js
//app.use('/api/chatting',validateAlltypeUser,chatSocket);
app.use("/api/auth",authRoute);
app.use("/api/admin",veriftAdmin, adminRoute);
app.use("/api/collector",verifyCollector,collectorRoute);
app.use("/api/common",validateAlltypeUser,commonRoute);

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