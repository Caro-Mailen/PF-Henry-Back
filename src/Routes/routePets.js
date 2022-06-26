const { Router } = require("express");
const {
  pet,
  petId,
  petName,
  petPost,
  petDelete,
  petState,
} = require("../Controllers/controllerPets");
//  Importar todos los routers;
// /Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.put("/", pet); 
// Gente, tuvimos que cambiarlo a put, porque los get no pueden recibir body 
//(si hubieramos usado post tenia conflicto con petPost, con los otros dos no porque reciben id por params.)
router.get("/", petName);
router.get("/:id", petId);
router.post("/", petPost);
router.put("/:id", petState);
router.put("/:id", petDelete);

module.exports = router;
