import { Router } from "express";
import { ComentarioController } from "../controllers/ComentarioController"


const router = Router();
const comentarioController = new ComentarioController();

router.get("/comentarios", comentarioController.getAll);
router.post("/comentarios", comentarioController.create);

export default router;