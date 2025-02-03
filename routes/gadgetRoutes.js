import { Router } from 'express';
import { getGadgets, addGadget, updateGadget, deleteGadget, selfDestructGadget, getGadgetsByStatus } from '../handlers/gadgetHandler.js';
const router = Router();

router.get('/gadgets', getGadgets);
router.post('/gadgets', addGadget);
router.patch('/gadgets/:id', updateGadget);
router.delete('/gadgets', deleteGadget);
router.post('/gadgets/:id/self-destruct', selfDestructGadget);
router.get('/gadgets', getGadgetsByStatus);

export default router;