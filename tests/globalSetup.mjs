import App from "../src/app.mjs";
import mongoDB from '../src/db/MongoDB.mjs';


const startApp = async () => {
    console.log('Create new database...');
    //promise wait for isConnected to be true
    while (!await mongoDB.isConnected()) {
        console.log('Waiting for MongoDB to connect...');
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    await mongoDB.db.dropDatabase();

    console.log('Starting API server...');
    const app = new App();
    await app.start();

    return app;
}


export default startApp;
