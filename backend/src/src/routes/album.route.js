import {Router} from 'express';
import { protectRoute, requireAdmin,checkAdmin } from '../middleware/auth.middleware.js';
import { getAllAlbums,getAlbumId } from '../controller/album.controller.js';
import { get } from 'mongoose';

const router = Router();

router.use(protectRoute);


router.get("/",getAllAlbums);
router.get("/:albumId",getAlbumId);







export default router;