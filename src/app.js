import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv"
import joi from "joi";
import dayjs from "dayjs";
import { signIn, signUp } from "./controllers/user.controller.js";
import { home, transactions } from "./controllers/navigation.controller.js";

//Criação do APP Servidor
const app = express();

//Configurações do servidor
app.use(cors());
app.use(express.json());
dotenv.config();

//Conexão com o banco de dados
export let db;
const mongoClient = new MongoClient(process.env.DATABASE_URL)
mongoClient
  .connect()
  .then(() => {
  db = mongoClient.db()
  console.log ("database connected")
  })

  .catch((err) => console.log(err.message));

  
  //Schemas
export const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(3)
})

export const operationSchema = joi.object({
    description: joi.string().required(),
    value: joi.number().positive().precision(2).strict().required()
  })
  //Endpoints
app.post("/sign-up", signUp);

app.post("/sign-in", signIn);

app.get("/home", home);

app.post("/transactions/:type", transactions);


  // Deixa o app escutando, à espera de requisições
const PORT = 5000
app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`)) 