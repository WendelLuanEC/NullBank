import { db } from "../db.js";

export const getContasParaAtendente = (req, res) => {
  const matricula = req.params.matricula;
  const query = `SELECT * FROM conta c
    INNER JOIN funcionarios f ON c.id_agencia = f.agencia_id
    WHERE f.matricula = ?`;

  db.query(query, [matricula], (err, result) => {
    console.log(err)
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(result);
  });
};
