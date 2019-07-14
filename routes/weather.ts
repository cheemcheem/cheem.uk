import * as express from "express";
import {weatherRequest} from "../utlities/weatherUtils";

/**
 * Used to route "/grades"
 * "/" receives POST of grades and sends expected back.
 * @type {Router} express router object.
 */
const weatherRouter = express.Router();

weatherRouter.get("/", weatherRequest);

export default weatherRouter;
