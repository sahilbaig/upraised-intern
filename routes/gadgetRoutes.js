import { Router } from 'express';
import { getGadgets, addGadget, updateGadget, deleteGadget, selfDestructGadget } from '../handlers/gadgetHandler.js';
const router = Router();

router.get('/gadgets', getGadgets);
router.post('/gadgets', addGadget);
router.patch('/gadgets', updateGadget);
router.delete('/gadgets', deleteGadget);
router.post('/gadgets/:id/self-destruct', selfDestructGadget);

export default router;