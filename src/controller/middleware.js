// validationMiddleware.js

export const validatePersonFields = (req, res, next) => {
    const { name, last_name, email, user_name, password } = req.body;
  
    const requiredFields = ['name', 'last_name', 'email', 'user_name', 'password'];
  
    const missingOrEmptyFields = requiredFields.filter((field) => !req.body[field] || req.body[field].trim() === '');
  
    if (missingOrEmptyFields.length > 0) {
      return res.status(400).json({
        message: `Missing or empty required fields: ${missingOrEmptyFields.join(", ")}.`,
      });
    }
  
    // Todos los campos requeridos están presentes y no están vacíos, pasar al siguiente middleware
    next();
  };

