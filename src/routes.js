import { Router } from 'express';
import swaggerSpec from './utils/swagger';
import usersController from './controllers/users';
import todoController from './controllers/todo';
import usersRegisterController from './controllers/userRegister';
import usersLoginController from './controllers/userLogin';
import usersVerifyController from './controllers/userVerify';
import usersLogoutController from './controllers/userLogout';
import tagsController from './controllers/tags';


/**
 * Contains all API routes for the application.
 */
let router = Router();

/**
 * GET /api/swagger.json
 */
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

/**
 * @swagger
 * definitions:
 *   App:
 *     title: App
 *     type: object
 *     properties:
 *       app:
 *         type: string
 *       apiVersion:
 *         type: string
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get API version
 *     description: App version
 *     produces:
 *       - application/json
 *     tags:
 *       - Base
 *     responses:
 *       200:
 *         description: Application and API version
 *         schema:
 *           title: Users
 *           type: object
 *           $ref: '#/definitions/App'
 */
router.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version
  });
});

router.use('/users', usersController);
router.use('/todo', todoController );
router.use('/register', usersRegisterController);
router.use('/login',usersLoginController);
router.use('/verify', usersVerifyController);
router.use('/logout', usersLogoutController);
router.use('/tags', tagsController);


export default router;
