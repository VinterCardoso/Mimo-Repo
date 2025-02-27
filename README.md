# Indice

- [Objetivo](#objetivo)
- [Padrão de projeto](#padrão-de-projeto)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Primeiros passos](#primeiros-passos)
- [Guia para contribuição](#guia-para-contribuição)

# Objetivo

Esse repositório tem como objetivo o desenvolvimento de um projeto colaborativo com tema de loja de pets com a utilização de um padrão de projeto proposto na matéria de Engenharia de software da UTFPR.

# Padrão de projeto

O padrão de projeto escolhido foi o Visitor.

O Visitor é um padrão comportamental que permite adicionar novas operações a uma estrutura de objetos sem modificar suas classes. Ele é útil quando se deseja separar algoritmos da estrutura de dados, facilitando a manutenção e a extensão do código.

No contexto deste projeto, o padrão Visitor é utilizado para exportação de pedidos e produtos em diferentes formatos, como PDF e Excel, sem precisar modificar as classes de domínio (Order, Product). Cada formato de exportação é tratado por um visitante específico (PDFOrderVisitor, ExcelOrderVisitor), garantindo flexibilidade e modularidade.

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