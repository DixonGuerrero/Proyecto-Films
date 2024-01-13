import { pool } from "../db.js";

export const createUser = async (req, res) => {
  const { id_person } = req.body;

  try {
    // Validar longitudes máximas
    const maxLengths = {
      id_person: 20,
    };

    for (const [field, maxLength] of Object.entries(maxLengths)) {
      if (req.body[field] && req.body[field].length > maxLength) {
        return res.status(400).json({
          message: `Invalid length for ${field}. Maximum length is ${maxLength}.`,
        });
      }
    }

    // Validar Existencia de Persona
    const existingPerson = await pool.query(
      "SELECT * FROM person WHERE id_person = ?",
      [id_person]
    );

    console.log(existingPerson);

    if (existingPerson[0].length === 0) {
      return res.status(400).json({
        message: "Person not Exists",
      });
    }

    //Validar Exista de un usuario
    const existingUser = await pool.query(
        "SELECT * FROM user WHERE id_person = ?",
        [id_person]
      );
  
      
  
      if (existingUser[0] != null) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
    const [rows] = await pool.query(
      "INSERT INTO user (id_person) VALUES (?)",
      [id_person]
    );

    const person = existingPerson[0][0];

    res.send({
      id_admin: rows.insertId,
      name: person.name,
      last_name: person.last_name,
      user_name: person.user_name,
      email: person.email,
      id_person: person.id_person,
    });
  } catch (error) {
    return res.status(500).json({
      mesagge: "Internal Server Error",
      error: error.message,
    });
  }
};
