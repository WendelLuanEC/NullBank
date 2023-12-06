
# NullBank Project - Bank Management System 

## Description
This project is a web application for managing bank accounts, it has a database that stores customer information and their accounts, it also has user access control, of which We have the Administrator/DBA user, who has full access to read and write all information in the database. We have other types of users, who, depending on their positions, have restricted access to the system's functionalities. Application developed in the Database discipline of the Computer Engineering course. 

## Features
The system requests "User" and "Password" to access the database right on the initial screen.
Access levels: The system has three access levels:
  - Administrator/DBA: The DBA user has full and unrestricted access to the system, being able to carry out any and all operations.
  - Manager: The manager only has access to data from the accounts he manages.
  - Attendant/Employee: The attendant/employee only has read access to the numbers and balances of their agency's accounts.
  - Cashier: The cashier has unrestricted access to transactions in his branch's accounts and can carry out operations on them.

## Technologies used
 - Front-end: ReactJS
 - Back-end: NodeJS
 - Banco de dados: MySQL

## Prerequisites

- NodeJS
- SQL
- NPM

 ### To run the project, you must install the software mentioned above, follow these steps:

1. Type in your terminal in a folder of your choice
 ```bash
git clone https://github.com/seu-nome/nullbank.git
```
2. Enter the project folder:
 ```bash
cd nullbank
```
Instale as dependências:
npm install
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=nullbank
DB_USERNAME=root
DB_PASSWORD=
Inicie o servidor:
npm start
O projeto será iniciado na porta 3000.

Exemplos de uso
Login:

Para realizar o login, abra o navegador e acesse o endereço http://localhost:3000/. Na tela inicial, insira o login e a senha e clique em "Entrar".

Acessar conta:

Após realizar o login, você será direcionado para a tela de gerenciamento da conta. No caso de cliente com mais de uma conta, selecione a conta que deseja acessar no menu suspenso.

Operações disponíveis:

As operações disponíveis para cada nível de acesso são as seguintes:

Administrador/DBA:
Inserir, remover e alterar dados em todas as entidades/tabelas.
Fazer consultas a todas as entidades/tabelas.
Gerente:
Inserir, remover e alterar dados nas contas que gerencia.
Fazer consultas às contas que gerencia.
Atendente/Funcionário:
Fazer consultas às contas da sua agência.
Caixa:
Inserir, remover e alterar dados nas transações das contas da sua agência.
Fazer consultas às transações das contas da sua agência.
Exemplos de consultas
A seguir, alguns exemplos de consultas que podem ser realizadas no sistema:

Consultar todas as contas:
SELECT * FROM contas;
Consultar as contas com saldo maior que 1000:
SELECT * FROM contas WHERE saldo > 1000;
Consultar as contas de um cliente:
SELECT * FROM contas WHERE cpf = '12345678901';
Consultar as transações de uma conta:
SELECT * FROM transacoes WHERE id_conta = 1;
Conclusão
Este projeto foi desenvolvido para fins educacionais e demonstra o uso de algumas das principais funcionalidades de um banco de dados.
