import { Router } from "express";
import { ComentarioController } from "../controllers/ComentarioController"


const router = Router();
const comentarioController = new ComentarioController();

router.post("/user", comentarioController.createComentario);
router.get("/user",comentarioController.getComentariosByUser)

export default router;