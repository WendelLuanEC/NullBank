import express from "express";

const router = express.Router();

import { deleteFuncionario } from "../controllers/funcionario.js";
import { deleteAgencia } from "../controllers/agencia.js";
import { deleteCliente } from "../controllers/cliente.js";
import { deleteDependente } from "../controllers/dependente.js";
import { deleteConta } from "../controllers/conta.js";
import { deleteTransacao } from "../controllers/transacao.js";

router.delete("/deletarFuncionario/:id", deleteFuncionario);

router.delete("/deletarAgencia/:numero", deleteAgencia);

router.delete("/deletarCliente/:cpf", deleteCliente);

router.delete("/deletarDependente/:id", deleteDependente);

router.delete("/deletarConta/:numero_conta", deleteConta);

router.delete("/deletarTransacao/:id", deleteTransacao);

export default router;
