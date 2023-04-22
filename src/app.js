import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv"
import joi from "joi";
import bcrypt from "bcrypt"

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

      res.sendStatus(200)
  } catch (err) {
      res.status(500).send(err.message)
  }
})


  // Deixa o app escutando, à espera de requisições
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)) 