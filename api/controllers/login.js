import { db } from "../db.js";
import  jwt  from "jsonwebtoken";

export const login = (req, res) => { //role 1,2,3, = dba,funcionario,cliente
  const {login, password, role} = req.body;

  if (role === 1) {
    if (login === "Admin" && password == "Root") {
      const token = jwt.sign({role: 1, cargo: "DBA"}, 'bancodedados', {expiresIn:'2d'})
      return res.status(200).json({token});

    }
  }

  if (role === 2) {
    const q = `SELECT * FROM funcionarios WHERE matricula='${login}' and senha='${password}'`;

    db.query(q, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const funcionario = data[0];

      if (funcionario.length === 0) {
        return res.status(400).json(({error: "Usuario e/ou senha invalidos"}))
      }
      
      const token = jwt.sign({matricula:funcionario.matricula, role: 2, cargo: funcionario.cargo}, 'bancodedados', {expiresIn:'2d'})
      return res.status(200).json({...funcionario, token});
    });
  }


  if (role === 3) {
    const q = `SELECT *
    FROM conta
    JOIN cliente
    ON conta.cliente_id = cliente.cpf
    WHERE conta.cliente_cpf = '${login}'
    AND conta.senha = '${password}'
    `;

    db.query(q, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const cliente = data[0];
      console.log(cliente)
      if (cliente.length === 0) {
        return res.status(400).json(({error: "Usuario e/ou senha invalidos"}))
      }
      
      const token = jwt.sign({cpf:cliente.cpf, role: 3}, 'bancodedados', {expiresIn:'2d'})
      return res.status(200).json({...cliente, token});
    });
  }
};
