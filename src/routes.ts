import {Router} from "express";

import {authenticateUserController} from "./use-cases/authenticate-user";
import {authorizeUserMiddleware} from "./use-cases/authorize-user";
import {getUserGroupsPlansController} from "./use-cases/get-user-groups-plans";
import {createGroupPlanController} from "./use-cases/create-group-plan";
import {addMemberToGroupPlanController} from "./use-cases/add-member-to-group-plan";
import {makePaymentController} from "./use-cases/make-payment";
import {getUserPaymentsController} from "./use-cases/get-user-payments";
import {getGroupPaymentsController} from "./use-cases/get-group-payments";
import {getGroupMembersController} from "./use-cases/get-group-members";
import {registerUserController} from "./use-cases/register-user";

const router = Router()

// Register routes from controllers declared on use-cases
router.get('/', (_, res) => res.status(200).json({success: true}))
router.post('/user/register', (req, res) => registerUserController.handle(req, res))
router.post('/user/authenticate', (req, res) => authenticateUserController.handle(req, res))

router.use((req, res, next) => authorizeUserMiddleware.handle(req, res, next))
router.get('/authenticated', (req, res) => res.status(200).json({success: true, authorizedUser: req.body.authorizedUser}))
router.get('/user/group_plan/all', (req, res) => getUserGroupsPlansController.handle(req, res))
router.post('/group_plan/create', (req, res) => createGroupPlanController.handle(req, res))
router.post('/group_plan/user/add', (req, res) => addMemberToGroupPlanController.handle(req, res))
router.post('/user/payment/make', (req, res) => makePaymentController.handle(req, res))
router.get('/user/payment/all', (req, res) => getUserPaymentsController.handle(req, res))
router.get('/group_plan/payment/all', (req, res) => getGroupPaymentsController.handle(req, res))
router.get('/group_plan/user/all', (req, res) => getGroupMembersController.handle(req, res))

export {router}
