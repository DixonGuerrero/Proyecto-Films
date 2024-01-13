import express from 'express'
import personRoutes from "./routes/person.routes.js";
import adminRoutes from "./routes/admin.routes.js"
import userRoutes from "./routes/user.routes.js"

const app = express();
app.use(express.json());

app.use("/api/", personRoutes);
app.use("/api/", adminRoutes);
app.use("/api/", userRoutes)



export default app;