import express from "express";
import { updateUser, deleteUser, getUser, getAllUser, getUserStats } from "../controllers/user-controller.js";
import protect from "../middleware/authMiddleware.js";



// const router = express.Router();
// router.put('/:id', protect, updateUser);
// router.delete('/:id', protect, deleteUser);
// router.get('/find/:id', getUser);
// router.get('/', getAllUser);
// router.get('/stats',protect, getUserStats);
const router = express.Router();
router.put('/:id', protect, updateUser);
router.delete('/:id',protect, deleteUser);
router.get('/find/:id', protect, getUser);
router.get('/', protect, getAllUser);
router.get('/stats', getUserStats);

export default router;