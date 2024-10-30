## Instruções para Rodar o Projeto

### 1. Configurar o Back-end (Nest.js)

Navegue até a pasta `api`:

```bash
cd api
```

Preencha o arquivo .env com as seguintes variáveis:

```bash
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=
DATABASE_URL=
JWT_SECRET=
```

Para rodar o PostgreSQL, execute o Docker Compose:

```bash
docker compose up -d
```

Ou conecte ao postgres de outra forma, se preferir.

Em seguida, instale as dependências do back-end.

```bash
npm install
```

ou

```bash
yarn install
```

Agora, inicie a API :

```bash
npm run start:dev
```

ou

```bash
yarn start:dev
```

### 2. Configurar o Front-end (Next.js)

```bash
cd ../front
```

Preencha o arquivo .env com a seguinte variável:

```bash
NEXT_PUBLIC_API_URL=
```

Instale as dependências do front-end:

```bash
npm install
```

ou

```bash
yarn install
```

Agora, inicie o servidor do Next.js:

```bash
npm install
```

ou

```bash
yarn install
```

Após seguir todas as instruções, você pode acessar em:

http://localhost:3000
