import express from "express";
import usuarioRoutes from "./routes/usuario.route.js";
import jogosRoutes from "./routes/jogos.route.js";
import playersRoutes from "./routes/players.route.js";
import partidasRoutes from "./routes/partidas.route.js"
import rankingRoutes from "./routes/rankingRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/usuarios", usuarioRoutes);
app.use("/jogos", jogosRoutes);
app.use("/players", playersRoutes);
app.use("/partidas", partidasRoutes);
app.use("/rankings", rankingRoutes);

export default app;