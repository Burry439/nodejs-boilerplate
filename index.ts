import * as express from 'express';
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import * as http from 'http'
import * as fs from "fs";

const cors = require('cors')

dotenv.config()

const instance = ( () => {

    mongoose.connect ( process.env.MONGODB_URI ,  { useNewUrlParser: true } )

    const app = express () 
    const router = express.Router () 

    /* set the body parser */
    app.use ( bodyParser.json ( { 'limit' : '50mb' } ) )
    app.use ( bodyParser.urlencoded ( { 'extended' : true , 'limit' : '50mb' } ) )

    app.use ( cors ( { 'origin' : '*' , 'methods' : [ '*' , 'DELETE' , 'GET' , 'OPTIONS' , 'PATCH' , 'POST' ] , 'allowedHeaders' : [ '*' , 'authorization' , 'content-type' ] } ) )

    app.use(router)

    const getControllers = () => {
        const controllers = {}
        fs.readdirSync ('./controllers/')
       .forEach((controller => controllers[controller.substring(controller.length,-3)] = require(`./controllers/${controller.substring(controller.length,-3)}`)))

        for(let controller in controllers){
            return controllers[controller]
        }
    }
    
    app.use ( '/' , getControllers() )
 
    app.use ( express.static ( __dirname ) )

    let server 
 
    server = http.createServer ( app )
    server.listen ( process.env.PORT )

    console.log ( '=====================================' )
    console.log ( 'SERVER SETTINGS :' )
    console.log ( `Server running at - localhost:${ process.env.PORT }` )
    console.log ( `DB - ${ process.env.MONGODB_URI }` )
    console.log ( '=====================================' )
 
        return {
            app
        }
    } ) ()

export default instance.app