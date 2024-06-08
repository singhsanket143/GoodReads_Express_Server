const express = require('express');

const { ServerConfig, Logger, DBConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    return res.json({ message: 'I am alive'})
})

const setupAndStartServer = () => {
    app.listen(ServerConfig.PORT, async () => {
        console.log(`Started the server at Port : ${ServerConfig.PORT}`);
        await DBConfig.connect();
        console.log('Mongodb connected');
    });
}
setupAndStartServer();