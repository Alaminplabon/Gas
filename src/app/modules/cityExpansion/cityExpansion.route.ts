import { Router } from 'express';
import { cityExpansionController } from './cityExpansion.controller';

const router = Router();

router.post('/create', cityExpansionController.createCityExpansion);
router.get('/', cityExpansionController.getAllCityExpansions);
router.get('/:id', cityExpansionController.getCityExpansionById);
router.patch('/:id', cityExpansionController.updateCityExpansion);
router.delete('/:id', cityExpansionController.deleteCityExpansion);

export const cityExpansionRoutes = router;
