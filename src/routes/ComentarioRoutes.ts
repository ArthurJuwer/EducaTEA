import { Router } from "express";
import { ComentarioController } from "../controllers/ComentarioController"


const router = Router();
const comentarioController = new ComentarioController();

router.get("/api/comentarios", comentarioController.getAll);
router.post("/api/comentarios", comentarioController.create);

export default router;