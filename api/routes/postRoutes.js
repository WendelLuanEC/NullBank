import express from "express";

import { addFuncionario } from "../controllers/funcionario.js";
import { addAgencia } from "../controllers/agencia.js";
import { addCliente } from "../controllers/cliente.js";
import { addDependente } from "../controllers/dependente.js";
import { addConta } from "../controllers/conta.js";
import { addTransacao } from "../controllers/transacao.js";

const router = express.Router();

router.post("/addFuncionario", addFuncionario);

router.post("/addAgencia", addAgencia);

router.post("/addCliente", addCliente);

router.post("/addDependente", addDependente);

router.post("/addConta", addConta);

router.post("/addTransacao", addTransacao);

export default router;
