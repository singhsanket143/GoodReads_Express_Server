const express = require('express');

const { ServerConfig, Logger, DBConfig } = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const setupAndStartServer = () => {
    app.listen(ServerConfig.PORT, async () => {
        console.log(`Started the server at Port : ${ServerConfig.PORT}`);
        await DBConfig.connect();
        console.log('Mongodb connected');
    });
}
setupAndStartServer();