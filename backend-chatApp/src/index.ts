import Server from "./models/server.models.js";
import dotenv from 'dotenv';

//Sirve para cargar las variables de entorno
dotenv.config();
const server = new Server();