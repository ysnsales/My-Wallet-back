import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv"
import joi from "joi";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

//Criação do APP Servidor
const app = express();

//Configurações do servidor
app.use(cors());
app.use(express.json());
dotenv.config();

//Conexão com o banco de dados
let db;
const mongoClient = new MongoClient(process.env.DATABASE_URL)
mongoClient
  .connect()
  .then(() => {
  db = mongoClient.db()
  console.log ("database connected")
  })

  .catch((err) => console.log(err.message));

  //Schemas
  const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(3)
})

  const operationSchema = joi.object({
    value: joi.number().positive().precision(2).strict().required(),
    tipo: joi.string().valid("moneyIn", "moneyOut").required()
  })
  //Endpoints
app.post("/sign-up", async (req, res) => {
  const { name, email, password} = req.body

  const validation = userSchema.validate(req.body, { abortEarly: false })
  if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
  }

  try {
      const user = await db.collection("users").findOne({ email })
      if (user) return res.status(409).send("E-mail já cadastrado")

      const hash = bcrypt.hashSync(password, 10)

      await db.collection("users").insertOne({ name, email, password: hash })
      console.log(hash)
      res.sendStatus(201)

  } catch (err) {
      res.status(500).send(err.message)
  }
})

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body

  try {
      const user = await db.collection("users").findOne({ email })
      if (!user) return res.status(404).send("E-mail não cadastrado.")

      const passwordIsCorrect = bcrypt.compareSync(password, user.password)
      if (!passwordIsCorrect) return res.status(401).send("Senha incorreta")

      const token = uuid();
      await db.collection("sessions").insertOne({ token, email : user.email, idUser : user._id })
      return res.status(200).send({token, idUser: user._id})

  } catch (err) {
      res.status(500).send(err.message)
  }
})

app.get("home", async (req, res) => {
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")

  if (!token) return res.sendStatus(401);

  try {
    const user = await db.collection("sessions").findOne({token})
    const transactions = await db.collection("transactions").find({idUser : user._id}).toArray();
    res.send(transactions)
  }catch (err) {
    res.status(500).send(err.message)
  }
})

app.post("/transactions", async (req, res) => {
  const {value, tipo} = req.body;
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")

  if (!token) return res.sendStatus(401);

  const validation = operationSchema.validate(req.body, {abortEarly: false});

  if (validation.error) {
    const errors = validation.error.details.map(detail => detail.message);
    return res.status(422).send(errors)
  };

  try {
    console.log(req.headers) 

    // Verificar se o token recebido é válido
    const session = await db.collection("sessions").findOne({token})
    console.log(session)
    if (!session) return res.sendStatus(401);
  

    // Adicionar a transação
    await db.collection("transactions").insertOne({...req.body, email : session.email})

    
  }catch (err) {
    res.status(500).send(err.message)
  }
})


  // Deixa o app escutando, à espera de requisições
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)) 