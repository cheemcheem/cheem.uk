import * as express from "express";
import {handleIndex} from "../utlities/indexUtils";

const indexRouter = express.Router();
indexRouter.get("/", handleIndex);

export default indexRouter;
