import { db } from "../db.js";

export const getAgencias = (_, res) => {
  const q = "SELECT * FROM agencia";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(data);
  });
};

export const getInfoAgencia = (req, res) => {
  const numero = req.params.numero;
  const values = [];

  const query = `SELECT * FROM agencia WHERE numero = ?`;

  values.push(numero);

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Agencia não encontrada" });
    }

    return res.status(200).json(result);
  });
};

export const getGerenteAgencia = (req, res) => {
  const numero = req.params.numero; 
  const cargo = "gerente";

  const query = `SELECT * FROM funcionarios WHERE agencia_id = ? and cargo = ?`;

  db.query(query, [numero, cargo], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Gerente não encontrado para esta agência" });
    }

    const gerenteId = result[0].id;
    return res.status(200).json({ gerenteId });
  });
};

export const addAgencia = (req, res) => {
  const requiredFields = ["nome", "salario_montante_total", "cidade"];

  const missingFields = requiredFields.filter((field) => !(field in req.body));

  if (missingFields.length > 0) {
    return res.status(400).json(`Campos faltando: ${missingFields.join(", ")}`);
  }

  const q =
    "INSERT INTO agencia(`nome`, `salario_montante_total`, `cidade`)VALUES(?)";

  const values = [
    req.body.nome,
    req.body.salario_montante_total,
    req.body.cidade,
  ];

  db.query(q, [values], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json("Agencia criada com sucesso.");
  });
};

export const updateAgencia = (req, res) => {
  const numero = req.params.numero;
  const body = req.body;
  const updates = [];
  const values = [];

  for (const key in body) {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      updates.push(`${key} = ?`);
      values.push(body[key]);
    }
  }

  if (updates.length === 0) {
    return res.status(400).json("Nenhum campo fornecido para atualização.");
  }

  values.push(numero);
  const q = `UPDATE agencia SET ${updates.join(", ")} WHERE numero = ?`;

  db.query(q, values, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json("Agencia atualizada com sucesso.");
  });
};

export const deleteAgencia = (req, res) => {
  const q = "DELETE FROM agencia WHERE `numero` = ?";

  if (!req.params.numero) {
    return res.status(400).json("Campos inválidos");
  }

  db.query(q, [req.params.numero], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json("Agencia deletada com sucesso.");
  });
};
