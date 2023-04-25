import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv"
import userRouter from "./routes/user.routes.js";
import navigationRouter from "./routes/navigation.routes.js";


//Criação do APP Servidor
const app = express();

//Configurações do servidor
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(navigationRouter);
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

  // Deixa o app escutando, à espera de requisições
const PORT = 5000
app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`)) 