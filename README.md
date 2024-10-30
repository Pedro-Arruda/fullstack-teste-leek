# Fullstack Test Leek Soluções

## Rode localmente

### Dependências globais

Você precisa ter uma principal dependência instalada:

- [Docker](https://www.docker.com/products/docker-desktop/) 24.0.6 (ou qualquer versão superior)

### Clone o projeto

```bash
git clone https://github.com/Pedro-Arruda/fullstack-teste-leek.git
```

Rode os serviços no docker:

```bash
docker compose --env-file ./api/.env up -d --build
```

Se tudo estiver funcionando, você conseguirá acessar em:

[http://localhost:3300/docs](http://localhost:3300/docs) (API)

[http://localhost:3000](http://localhost:3000) (Front)

_OBS_: Se você já subiu serviços do Docker na sua máquina, talvez seja necessário trocar os endereços e portas que estão sendo mapeados. Você pode alterar as variáveis no arquivo .env localizado na raiz do front-end e da API, e deve subir os serviços novamente para aplicar as alterações.
