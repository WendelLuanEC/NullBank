import { db } from "../db.js";

export const getDependentes = (_, res) => {
  const q = "SELECT * FROM dependente";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(data);
  });
};

export const addDependente = (req, res) => {
  const requiredFields = [
    "id_funcionario",
    "nome_completo",
    "parentesco",
    "data_nascimento",
    "idade",
  ];

  const missingFields = requiredFields.filter((field) => !(field in req.body));

  if (missingFields.length > 0) {
    return res.status(400).json(`Campos faltando: ${missingFields.join(", ")}`);
  }

  const q =
    "INSERT INTO dependente(`id_funcionario`, `nome_completo`, `parentesco`, `data_nascimento`, `idade`) VALUES(?, ?, ?, ?, ?)";

  const values = [
    req.body.id_funcionario,
    req.body.nome_completo,
    req.body.parentesco,
    req.body.data_nascimento,
    req.body.idade,
  ];

  db.query(q, values, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json("Dependente criado com sucesso.");
  });
};

export const updateDependente = (req, res) => {
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
  const q = `UPDATE dependente SET ${updates.join(", ")} WHERE id = ?`;

  db.query(q, values, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json("Dependente atualizado com sucesso.");
  });
};


export const deleteDependente = (req, res) => {
  const q = "DELETE FROM dependente WHERE `id` = ?";

  if (!req.params.id) {
    return res.status(400).json("Campos inválidos");
  }

  db.query(q, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json("Dependente deletado com sucesso.");
  });
};
