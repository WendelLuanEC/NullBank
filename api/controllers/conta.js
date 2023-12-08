import { db } from "../db.js";

export const getContas = (_, res) => {
  const query = `SELECT * FROM conta`;

  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(data);
  });
};

export const addConta = (req, res) => {
  const newAccount = req.body;
  const {
    saldo,
    senha,
    tipo_conta,
    id_agencia,
    cliente_CPF,
    id_gerente,
    cliente_id,
  } = newAccount;

  const requiredFields = [
    "saldo",
    "senha",
    "tipo_conta",
    "id_agencia",
    "cliente_CPF",
    "id_gerente",
    "cliente_id",
  ];

  const missingFields = requiredFields.filter((campo) => !(campo in newAccount));

  if (missingFields.length > 0) {

    console.log(`Campos faltando: ${missingFields.join(", ")}` )
    return res
      .status(400)
      .json({ error: `Campos faltando: ${missingFields.join(", ")}` });
  }

  const query = `
    INSERT INTO conta (saldo, senha, tipo_conta, id_agencia, cliente_CPF, id_gerente, cliente_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [saldo, senha, tipo_conta, id_agencia, cliente_CPF, id_gerente, cliente_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      return res.status(200).json({ message: "Conta criada com sucesso." });
    }
  );
};


export const updateConta = (req, res) => {
  const numero_conta = req.params.numero_conta;
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

  values.push(numero_conta);
  const query = `
    UPDATE conta SET ${updates.join(", ")} WHERE numero_conta = ?
  `;

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json({ message: "Conta atualizada com sucesso." });
  });
};

export const deleteConta = (req, res) => {
  const numero_conta = req.params.numero_conta;

  const query = `DELETE FROM conta WHERE numero_conta = ?`;

  db.query(query, [numero_conta], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json({ message: "Conta deletada com sucesso." });
  });
};
