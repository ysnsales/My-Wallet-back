# MyWallet

## Descrição
Uma aplicação básica de gerenciamento financeiro. Feita com Express, JavaScript e MongoDB como banco de dados.

## Rotas
```
POST: /sign-up
Body:{"email": "user email", "password": "userPassword", "name": "User name"}

POST: /sign-in
Body:{"email": "user email", "password": "userPassword"}

POST: /transactions/:type
Headers:{Authorization: Bearer Token}
Body:{"description":"small description", "value": 10.00}

GET: /home
Headers:{Authorization: Bearer Token}

```


## Instalação

```bash
$ git clone https://github.com/ysnsales/my-wallet-back
$ cd my-wallet-back
$ npm install
```


## Configure as variáveis de ambiente (ENVs)
Configure o arquivo .env na raiz da sua aplicação usando o arquivo .env.example como base.

## Iniciando a aplicação

```bash
# production
$ npm run start

# development
$ npm run dev

```

## Test

```bash
# e2e tests
$ npm run test:e2e
```
## Tecnologias

<p align='rigth'>
<img style='margin: 2px;' src='https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white'>
<img style='margin: 2px; width:70px' src='https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white/'>
</p>

<hr/>
