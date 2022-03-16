import {Router} from "express";
import path from "path"

import {authenticateUserController} from "./use-cases/authenticate-user";
import {authorizeUserMiddleware} from "./use-cases/authorize-user";
//import {createTokenController} from "./use-cases/create-token/index";
//import {getUserInfoController} from "./use-cases/get-user-info/index";

const loginFilePath = path.join(__dirname, '../public/oauthAuthenticate.html')

const router = Router()


// Register routes from controllers declared on use-cases
router.get('/', (_, res) => res.status(200).json({success: true}))
router.get('/authenticated',
  authorizeUserMiddleware.handle,
  (req, res) => res.status(200).json({success: true, user: req.body.user})
)
router.post('/authenticate', (req, res) => authenticateUserController.handle(req, res))
//router.post('/authorize', (req, res) => authorizeUserController.handle(req, res))
//router.post('/token', (req, res) => createTokenController.handle(req, res))
//router.get('/userinfo', (req, res) => getUserInfoController.handle(req, res))

export {router}
