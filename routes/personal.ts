import * as express from "express";
import {handlePersonal} from "../utlities/personalUtils";

/**
 * Used to route "/".
 * "/" Sends the index page which requires the list of PCs.
 * "/:pc" sends a json response of the pc status and users online.
 * @type {Router} express router object.
 */
const personalRouter = express.Router();
personalRouter.get("/", handlePersonal);

export default personalRouter;
