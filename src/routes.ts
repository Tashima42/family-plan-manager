import {Router} from "express";

import {authenticateUserController} from "./use-cases/authenticate-user";
import {authorizeUserMiddleware} from "./use-cases/authorize-user";

const router = Router()


// Register routes from controllers declared on use-cases
router.get('/', (_, res) => res.status(200).json({success: true}))
router.post('/authenticate', (req, res) => authenticateUserController.handle(req, res))

router.use((req, res, next) => authorizeUserMiddleware.handle(req, res, next))
router.get('/authenticated', (req, res) => res.status(200).json({success: true, authorizedUser: req.body.authorizedUser}))

export {router}
