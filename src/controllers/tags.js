import { Router } from 'express';
import * as todoService from '../services/todoService';
const router = Router();
/**
 * GET /api/tags
 */
router.get('/', (req, res, next) => {
  todoService
    .getAlltags()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
