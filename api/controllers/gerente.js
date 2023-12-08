import { db } from "../db.js";

export const getContasParaGerente = (req, res) => {
  const id_gerente = req.params.id_gerente;
  const query = `SELECT * FROM conta WHERE id_gerente = ? `;

  db.query(query, [id_gerente],  (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(result);
  });
};
