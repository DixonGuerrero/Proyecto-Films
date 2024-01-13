import { pool } from "../db.js";

export const getAdmin = async (req, res) => {
  try {
    const adminId = parseInt(req.params.id, 10);

    if (isNaN(adminId)) {
      return res.status(400).json({
        message: "Invalid admin ID provided",
      });
    }
    const [rows] = await pool.query(
      "SELECT * FROM person INNER JOIN admin ON person.id_person = admin.id_person WHERE id_admin = ?",
      [adminId]
    );

    if (rows.length <= 0)
      return res.status(404).json({
        mesagge: "Admin not found",
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

export const createAdmin = async (req, res) => {
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


    if (existingPerson[0].length === 0) {
      return res.status(400).json({
        message: "Person not Exists",
      });
    }

    //Validar si ya existe admin
    
    const existingAdmin = await pool.query(
        "SELECT * FROM admin WHERE id_person = ?",
        [id_person]
      );
  
      
  
      if (existingAdmin[0] != null) {
        return res.status(400).json({
          message: "Admin already exists",
        });
      }

    const [rows] = await pool.query(
      "INSERT INTO admin (id_person) VALUES (?)",
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
