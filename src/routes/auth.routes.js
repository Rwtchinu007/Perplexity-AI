import {Router}  from "express";
import {registerValidator,loginValidator} from "../validators/auth.validator.js";
import {registerUser,loginUser,getMe} from "../controllers/auth.controller.js";
import {verifyEmail} from "../controllers/auth.controller.js";
import {authUser} from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authRouter.post("/register", registerValidator, registerUser);


/**
 * @route POSt /api/auth/login
 * @desc Login a user
 * @access Public
 * @body { email, password }
 */
authRouter.post("/login", loginValidator, loginUser);


/**
 * @route GET /api/auth/get-me
 * @desc Get the logged-in user's information
 * @access Private
 */
authRouter.get("/get-me",authUser, getMe);


/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query { token }
 */
authRouter.get("/verify-email",verifyEmail);


export default authRouter;