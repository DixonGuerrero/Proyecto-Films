import personRoutes from "./routes/person.routes.js";
import express from 'express'

const app = express();
app.use(express.json());

app.use("/api/", personRoutes);


export default app;