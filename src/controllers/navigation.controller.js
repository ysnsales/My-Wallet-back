import { db, operationSchema } from "../app.js";

export async function home(req, res){
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
  
    if (!token) return res.sendStatus(401);
  
    try {
      // Verificar se o token recebido é válido
      const session = await db.collection("sessions").findOne({token})
      if (!session) return res.sendStatus(401);
  
      // Achar o usuário
      const user = await db.collection("users").findOne({ email : session.email })
      if (!user) return res.sendStatus(401)
  
      // Pegar somente as transações do usuário logado
      const transactions = await db.collection("transactions").find({email: user.email}).toArray();
      res.send(transactions)
  
    }catch (err) {
      res.status(500).send(err.message)
    }
  };

  export async function transactions(req, res) {
    const {description, value} = req.body;
    const {type} = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "")
  
    if (!token) return res.sendStatus(401);
  
    const validation = operationSchema.validate(req.body, {abortEarly: false});
    if (validation.error) {
      const errors = validation.error.details.map(detail => detail.message);
      return res.status(422).send(errors)
    };
  
    try {
      // Verificar se o token recebido é válido
      const session = await db.collection("sessions").findOne({token})
      if (!session) return res.sendStatus(401);
    
      // Adicionar a transação
      await db.collection("transactions").insertOne({...req.body, type, date: dayjs().format("DD/MM") , email : session.email})
      res.sendStatus(201)
  
      
    }catch (err) {
      res.status(500).send(err.message)
    }
  };