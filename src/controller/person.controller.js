import { pool } from "../db.js";



export const getAllPersons = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM person");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      mesagge: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getPerson = async (req, res) => {
  try {
    const personId = parseInt(req.params.id, 10);

    if (isNaN(personId)) {
      return res.status(400).json({
        message: "Invalid person ID provided",
      });
    }
    const [rows] = await pool.query(
      "SELECT * FROM person WHERE id_person = ?",
      [personId]
    );

    if (rows.length <= 0)
      return res.status(404).json({
        mesagge: "Person not found",
      });

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mesagge: "Internal Server Error",
      error: error.message,
    });
  }
};

export const createPerson = async (req, res) => {
  const { name, last_name, email, user_name, password } = req.body;

  try {
    // Validar campos únicos
    const existingUser = await pool.query(
      "SELECT id_person FROM person WHERE email = ? OR user_name = ?",
      [email, user_name]
    );

    if (existingUser[0].length > 0) {
      return res.status(400).json({
        message: "Email or username already exists.",
      });
    }

    // Validar longitudes máximas
    const maxLengths = {
      name: 50,
      last_name: 50,
      email: 150,
      user_name: 50,
      password: 200,
    };

    for (const [field, maxLength] of Object.entries(maxLengths)) {
      if (req.body[field] && req.body[field].length > maxLength) {
        return res.status(400).json({
          message: `Invalid length for ${field}. Maximum length is ${maxLength}.`,
        });
      }
    }

    const [rows] = await pool.query(
      "INSERT INTO person ( name, last_name, email, user_name, password ) VALUES (?,?,?,?,?)",
      [name, last_name, email, user_name, password]
    );

    res.send({
      id_peson: rows.insertId,
      name,
      last_name,
      email,
      user_name,
      password,
    });
  } catch (error) {
    return res.status(500).json({
      mesagge: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deletePerson = async (req, res) => {
  try {
    if (isNaN(personId)) {
      return res.status(400).json({
        message: "Invalid person ID provided",
      });
    }
    const [result] = await pool.query(
      "DELETE FROM person WHERE id_person = ?",
      [personId]
    );

    if (result.affectedRows <= 0)
      return res.status(404).json({
        mesagge: "Person not found",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      mesagge: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updatePerson = async (req, res) => {
  const personId = parseInt(req.params.id, 10);

  if (isNaN(personId)) {
    return res.status(400).json({
      message: "Invalid person ID provided",
    });
  }
  const { name, last_name, email, user_name, password } = req.body;

  try {
    // Validar campos únicos
    const existingUser = await pool.query(
      "SELECT id_person FROM person WHERE email = ? OR user_name = ?",
      [email, user_name]
    );

    if (existingUser[0].length > 0) {
      return res.status(400).json({
        message: "Email or username already exists.",
      });
    }

    // Validar longitudes máximas
    const maxLengths = {
      name: 50,
      last_name: 50,
      email: 150,
      user_name: 50,
      password: 200,
    };

    for (const [field, maxLength] of Object.entries(maxLengths)) {
      if (req.body[field] && req.body[field].length > maxLength) {
        return res.status(400).json({
          message: `Invalid length for ${field}. Maximum length is ${maxLength}.`,
        });
      }
    }

    const [result] = await pool.query(
      "UPDATE person SET name = IFNULL(?, name), last_name = IFNULL(?, last_name), email = IFNULL(?, email), user_name = IFNULL(?, user_name), password = IFNULL(?, password) WHERE id_person = ?",
      [name, last_name, email, user_name, password, personId]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        mesagge: "Person not found",
      });

    const [rows] = await pool.query(
      "SELECT * FROM person WHERE id_person = ?",
      [personId]
    );

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      mesagge: "Internal Server Error",
      error: error.message,
    });
  }
};
