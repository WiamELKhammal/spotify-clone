import {Router} from 'express';
import { protectRoute, requireAdmin,checkAdmin } from '../middleware/auth.middleware.js';
import { createSong,deleteSong,createAlbum,deleteAlbum } from '../controller/admin.controller.js';

const router = Router();

router.use(protectRoute,requireAdmin);

router.get("/checkadmin",checkAdmin);

router.post("/songs",createSong);
router.delete("/songs/:id",deleteSong);

router.post("/albums",createAlbum);
router.delete("/albums/:id",deleteAlbum);





export default router;