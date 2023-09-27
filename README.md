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
$ git clone https://github.com/ysnsales/My-Wallet-back
$ cd My-Wallet-back
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
