import { db } from "../db.js";

export const getFuncionarios = (_, res) => {
  const q = "SELECT * FROM funcionarios";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(data);
  });
};

export const getInfoFuncionario = (req, res) => {
  const matricula = req.params.matricula;
  const values = [];

  const q = "SELECT * FROM funcionarios WHERE matricula = ?"; 

  if (!matricula) {
    return res.status(400).json({ message: "Campos inválidos" });
  }

  values.push(matricula);

  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Funcionário não encontrado" });
    }

    return res.status(200).json(data);
  });
};

export const addFuncionario = (req, res) => {
  const requiredFields = [
    "nome_completo",
    "senha",
    "endereco",
    "cidade",
    "cargo",
    "sexo",
    "data_nascimento",
    "salario",
    "agencia_id",
  ];

  const missingFields = requiredFields.filter((field) => !(field in req.body));

  if (missingFields.length > 0) {
    console.log(`Campos faltando: ${missingFields.join(", ")}`);
    return res.status(400).json(`Campos faltando: ${missingFields.join(", ")}`);
  }

  const q =
    "INSERT INTO funcionarios(`nome_completo`, `senha`, `endereco`, `cidade`, `cargo`, `sexo`, `data_nascimento`, `salario`, `agencia_id`)VALUES(?)";

  const values = [
    req.body.nome_completo,

    req.body.senha,
    req.body.endereco,
    req.body.cidade,
    req.body.cargo,
    req.body.sexo,
    req.body.data_nascimento,
    req.body.salario,
    req.body.agencia_id,
  ];

  db.query(q, [values], (err) => {
    if (err) {
      console.log(err);
      if (err.code == "ER_SIGNAL_EXCEPTION") {
        return res.status(412).json({error: "Salario inferior ao permitido"});
      }
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json("Usuário criado com sucesso.");
  });
};

export const updateFuncionario = (req, res) => {
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
  const q = `UPDATE funcionarios SET ${updates.join(", ")} WHERE matricula = ?`;

  db.query(q, values, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json("Funcionário atualizado com sucesso.");
  });
};

export const deleteFuncionario = (req, res) => {
  const q = "DELETE FROM funcionarios WHERE `matricula` = ?";

  if (!req.params.id) {
    return res.status(400).json("Campos inválidos");
  }

  db.query(q, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json("Funcionario deletado com sucesso.");
  });
};
