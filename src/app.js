import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import navigationRouter from "./routers/navigationRouter.js";

//Criação do APP Servidor
const app = express();
//Configurações do servidor
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(navigationRouter);


  // Deixa o app escutando, à espera de requisições
const PORT = 5000
app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`)) 

