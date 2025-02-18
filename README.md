# Indice

- [Objetivo](#objetivo)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Primeiros passos](#primeiros-passos)
- [Guia para contribuição](#guia-para-contribuição)

# Objetivo

Esse repositório tem como objetivo o desenvolvimento de um projeto colaborativo com tema de loja de pets com a utilização de um padrão de projeto proposto na matéria de Engenharia de software da UTFPR.

# Tecnologias utilizadas
Ambos os repositórios foram criados utilizando Typescript e o banco de dados escolhido foi MySQL.

Um docker-compose.yml está disponível na pasta do backend para facilitar o desenvolvimento, não necessitando muitas configurações para acessar o banco.

Para front-end foram utilizadas as seguintes tecnologias:
- React
- Material-ui
- Axios

Para back-end foram utilizados:
- Fastify
- Prisma

# Primeiros passos
- Instalar o node 20.10.0
- Instalar docker e docker compose
- Instalar dependencias no back e no front utilizando o comando ```yarn```
- Criar o arquivo ```.env``` nas pastas do backend e frontend baseados no arquivo ```env.example```
- Na pasta backend utilizar o comando ```docker compose up``` para disponibilizar o banco
- Nas pastas de cada projeto utilizar o comando ```yarn dev``` para disponibilizar os serviços na máquina local

# Guia para contribuição
Verificar [Contributing.md](/CONTRIBUTING.md) para mais informações