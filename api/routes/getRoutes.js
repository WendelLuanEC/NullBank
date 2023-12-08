import express from "express";

import {
  getFuncionarios,
  getInfoFuncionario,
} from "../controllers/funcionario.js";
import { getAgencias, getInfoAgencia, getGerenteAgencia } from "../controllers/agencia.js";
import { getClientes, getInfoCliente } from "../controllers/cliente.js";
import { getDependentes } from "../controllers/dependente.js";
import { getContas } from "../controllers/conta.js";
import { getTransacoes } from "../controllers/transacao.js";
import checkToken  from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/getFuncionarios", checkToken, getFuncionarios);

router.get("/getInfoFuncionario/:matricula", checkToken, getInfoFuncionario);

router.get("/getAgencias", checkToken, getAgencias);

router.get("/getInfoAgencia/:numero", checkToken, getInfoFuncionario);

router.get("/getGerenteAgencia/:numero", getGerenteAgencia);

router.get("/getClientes", checkToken, getClientes);

router.get("/getGerenteClientes/:matricula")

router.get("/getInfoCliente/:cpf", checkToken, getInfoCliente);

router.get("/getDependentes", checkToken, getDependentes);

router.get("/getContas", checkToken, getContas);

router.get("/getTransacoes", checkToken, getTransacoes);

export default router;
