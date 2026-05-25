# Kermit Store

<img width="800" height="500" alt="kermit_store" src="https://github.com/user-attachments/assets/4f24e2b8-a781-408b-a24f-177a019c6f7d" />


O **Kermit Store** é uma aplicação Full-Stack desenvolvida para a gestão e visualização de produtos de um e-commerce. O projeto é estruturado utilizando uma API RESTful robusta em Java com Spring Boot e uma interface web moderna, responsiva e interativa construída com React e Vite.

---

## 🏗️ Estrutura do Projeto

O repositório está organizado no modelo mono-repositório da seguinte forma:

```text
kermit-store/
├── kermit-store-api/     # Backend (API RESTful em Spring Boot)
├── kermit-store-web/     # Frontend (Aplicação Web em React + Vite)
└── docs/                 # Documentação, diagramas e inspirações do projeto
```

---

## 🛠️ Tecnologias Utilizadas

### Backend (API)

- Java 26 & Spring Boot 4.0.6
- Spring Data JPA (Persistência e mapeamento objeto-relacional)
- PostgreSQL (Base de dados relacional robusta)
- Lombok (Redução de código boilerplate através de anotações)
- Springdoc OpenAPI (Swagger) (Geração automatizada de documentação dos endpoints)

### Frontend (Web)

- React 19 & Vite
- Axios (Consumo simplificado dos endpoints da API)
- Bootstrap 5 (Estilização global rápida e grelha responsiva)
- Framer Motion (Criação de animações e transições fluidas de páginas)
- React Router Dom 7 (Sistema avançado de rotas declarativas)
- React Icons
- React Responsive Modal

---

## 🚀 Como Executar a Aplicação

### 📋 Pré-requisitos

Certifique-se de que tem as seguintes ferramentas configuradas no seu ambiente de desenvolvimento:

- Java JDK 26
- Maven 3.x (ou utilize o Maven Wrapper `./mvnw` integrado)
- Node.js (versão LTS)
- Servidor PostgreSQL ativo

---

## 🔧 1. Configuração do Servidor / API (Backend)

Aceda ao terminal e navegue até à pasta correspondente:

```bash
cd kermit-store-api
```

Crie uma base de dados local no seu PostgreSQL com o nome:

```text
postgres
```

Se necessário, ajuste as propriedades de ligação no ficheiro:

```text
src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=admin
```

Compile e execute o servidor Spring Boot:

```bash
./mvnw spring-boot:run
```

O backend estará ativo no porto padrão:

```text
http://localhost:8080
```

Para testar e validar os endpoints criados, pode aceder à interface do Swagger em:

```text
http://localhost:8080/swagger-ui.html
```

---

## 💻 2. Configuração do Cliente / Interface (Frontend)

Abra uma nova janela no seu terminal e navegue para a pasta web:

```bash
cd kermit-store-web
```

Instale todos os pacotes e dependências listados no projeto:

```bash
npm install
```

Inicie o ecossistema Vite em modo de desenvolvimento local:

```bash
npm run dev
```

O terminal irá disponibilizar um endereço local (normalmente):

```text
http://localhost:5173
```

Abra-o no navegador para interagir com a plataforma.

---

## 📦 Detalhes Técnicos Importantes

### 🖼️ Gestão de Média

A API está explicitamente configurada para aceitar ficheiros e imagens de produtos até:

```text
10MB
```

por requisição.

---

### 🗂️ Categorias Integradas

O sistema utiliza uma estrutura estrita de `CategoryEnum` para classificar os produtos em grupos específicos, como:

- ELECTRONICS
- CLOTHING
- FOOD
- BOOKS
- HOME
- SPORTS
- entre outros.

---

### 🛢️ Persistência Dinâmica

A base de dados está configurada em modo:

```properties
spring.jpa.hibernate.ddl-auto=update
```

adaptando tabelas e colunas automaticamente sempre que os modelos sofrem alterações durante o desenvolvimento.

---

## 👨‍💻 Autor

Desenvolvido por Gustavo Gomes 🚀
