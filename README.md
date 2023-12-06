
# Projeto NullBank - Sistema de Gerenciamento Bancário

## Descrição
Este projeto é uma aplicação web de gerenciamento de contas bancárias, ela possui um banco de dados que armazena as informações dos clientes e suas contas, tem também um controle de acesso de usuários, dos quais temos o usuário Administrador/DBA, que tem total acesso para leitura e escrita de todas as informações da base de dados. Temos outros tipos de usuários, que de acordo com os seus cargos, têm acesso restrito às funcionalidades do sistema.  Aplicação desenvolvida na disciplina de Banco de Dados do curso de Engenharia de Computação.

## Funcionalidades
O sistema solicita "Usuário" e "Senha" de acesso ao banco de dados logo na tela inicial.
Níveis de acesso: O sistema possui três níveis de acesso:
 - Administrador/DBA: O usuário DBA possui acesso total e irrestrito ao sistema, podendo realizar toda e qualquer operação.
 - Gerente: O gerente só tem acesso aos dados das contas que gerencia.
 - Atendente/Funcionário: O atendente/funcionário só tem acesso de leitura aos números e saldos das contas de sua agência.
 - Caixa: O caixa tem acesso irrestrito às transações das contas de sua agência, podendo efetuar operações sobre as mesmas.

## Tecnologias utilizadas
 - Front-end: ReactJS
 - Back-end: NodeJS
 - Banco de dados: MySQL

## Pré requisitos

- NodeJS
- SQL
- NPM

 ### Para rodar o projeto, você precisa instalar os sotfwares mencionados anteriormente, siga os passos a seguir:

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
