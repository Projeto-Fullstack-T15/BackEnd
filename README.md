# 🚀 Projeto com NestJS

## Configuração e Instalação

### 1. **Instalando as Dependências**

No diretório raiz do projeto, instale as dependências necessárias:

```bash
# Usando npm:
npm install

# Usando yarn:
yarn
```

### 3. Rodando o Servidor NestJS
No diretório raiz, inicie o servidor NestJS:

```bash
# Usando npm:
npm run start dev

# Usando yarn:
yarn start dev
```

## 🛠️ API Endpoints

### Usuários

- **Criar Usuário**:  
  `[POST] /users`  
  Campos:
  - name
  - email
  - password
  - cpf
  - phone
  - birthday
  - description
  - account_type
  - state
  - city
  - street
  - number
  - complement
  - zip_code

  ⚠️ *Evite criar um usuário com email, cpf ou telefone que já estejam cadastrados.*

- **Login**:  
  `[POST] /login`  
  Campos:
  - email
  - password

- **Obter Usuário por ID**:  
  `[GET] /users/:id`  

- **Atualizar Usuário**:  
  `[PATCH] /users/:id`  

- **Excluir Usuário**:  
  `[DELETE] /users/`  
  ⚠️ *Forneça a senha para confirmar a exclusão.*

### Carros

- **Adicionar Carro**:  
  `[POST] /cars`  
  Campos:
  - brand
  - model
  - year
  - fuel_type
  - mileage
  - color
  - cover_image
  - price
  - description
  - images
  
- **Adicionar Imagem de Capa**:  
  `[PATCH] /cars/:id/upload`  

- **Adicionar Imagens de Galeria**:  
  `[POST] /cars/:id/upload`  

- **Listar Carros**:  
  `[GET] /cars`  

- **Remover Imagens do Carro**:  
  `[DELETE] /cars/:id/images/delete`  

- **Excluir Carro**:  
  `[DELETE] /cars/:id`  

## Link para documentação do postman:
- https://documenter.getpostman.com/view/29095863/2s9Y5VVjz7
