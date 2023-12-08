import express from "express";
import checkToken  from "../middlewares/checkToken.js";
import { getContasParaGerente } from "../controllers/gerente.js";
import { getContasParaAtendente } from "../controllers/atendente.js";

const router = express.Router();

router.get("/getContasParaGerente/:id_gerente", getContasParaGerente);

router.get("/getContasParaAtendente/:matricula", getContasParaAtendente);

export default router;
