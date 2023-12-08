import { db } from "../db.js";

export const getTransacoes = (req, res) => {
  const query = `SELECT * FROM transacao`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(result);
  });
};

export const addTransacao = (req, res) => {
  const newData = req.body;
  const { tipo_transacao, data_hora, valor, numero_transacao, id_conta } =
    newData;

  const requiredFields = [
    "tipo_transacao",
    "data_hora",
    "valor",
    "numero_transacao",
    "id_conta",
  ];

  const missingFields = requiredFields.filter((campo) => !(campo in newData));

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Campos faltando: ${missingFields.join(", ")}` });
  }

  const query = `
    INSERT INTO transacao (tipo_transacao, rg, data_hora, valor, numero_transacao, id_conta)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [tipo_transacao, data_hora, valor, numero_transacao, id_conta],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      return res.status(200).json({ message: "Transacao criada com sucesso." });
    }
  );
};

export const updateTransacao = (req, res) => {
  const id = req.params.id;
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

  values.push(id);
  const query = `
    UPDATE transacao SET ${updates.join(", ")} WHERE id = ?
  `;

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res
      .status(200)
      .json({ message: "Transacao atualizada com sucesso." });
  });
};

export const deleteTransacao = (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM transacao WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json({ message: "Transacao deletada com sucesso." });
  });
};
