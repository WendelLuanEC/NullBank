import express from "express";

import { updateFuncionario } from "../controllers/funcionario.js";
import { updateAgencia } from "../controllers/agencia.js";
import { updateCliente } from "../controllers/cliente.js";
import { updateDependente } from "../controllers/dependente.js";
import { updateConta } from "../controllers/conta.js";
import { updateTransacao } from "../controllers/transacao.js";

const router = express.Router();

router.put("/atualizarFuncionario/:id", updateFuncionario);

router.put("/atualizarAgencia/:numero", updateAgencia);

router.put("/atualizarCliente/:cpf", updateCliente);

router.put("/atualizarDependente/:id", updateDependente);

router.put("/atualizarConta/:numero_conta", updateConta);

router.put("/atualizarTransacao/:id", updateTransacao);

export default router;
