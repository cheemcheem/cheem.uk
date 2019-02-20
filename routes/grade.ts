import * as express from "express";
import {grades, gradesHelp} from "../utlities/gradeUtils";

/**
 * Used to route "/grades"
 * "/" receives POST of grades and sends expected back.
 * @type {Router} express router object.
 */
const gradeRouter = express.Router();

gradeRouter.post("/", grades);
gradeRouter.get("/", gradesHelp);

export default gradeRouter;
