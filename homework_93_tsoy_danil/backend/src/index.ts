import express, { Express } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { healthCheckController } from "./controllers/healthCheck";
import { mongooseDB } from "./repository/mongooseDB";
import { artistsController } from "./controllers/artistsController";
import { albumsController } from "./controllers/albumsController";
import { tracksController } from "./controllers/tracksController";
import { usersController } from "./controllers/usersController";
import { trackHistoriesController } from "./controllers/trackHistoriesController";

dotenv.config()

class App {
    private app: Express
    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(cors())
    }

    public init = async(): Promise<void> => {
        try{
            this.app.use('/health-check', healthCheckController.getRouter())
            this.app.use('/artists', artistsController.getRouter())
            this.app.use('/albums', albumsController.getRouter())
            this.app.use('/tracks', tracksController.getRouter())
            this.app.use('/users', usersController.getRouter())
            this.app.use('/track_history', trackHistoriesController.getRouter())
            this.app.listen(process.env.APP_PORT, () => {
                console.log(`Server is running on http://localhost:${process.env.APP_PORT}`)
            })
            await mongooseDB.init()
            process.on('exit', () => {
                mongooseDB.close()
            })
        } catch(err: unknown){
            console.log(err); 
        }
    }
}

const app = new App();

app.init();