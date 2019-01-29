import * as express from "express";

/**
 * Handles showing the index page with a list of pcs.
 * Works as middleware for an express router.
 * @param req {express.Request}
 * @param res {express.Response}
 * @param next {Function}
 */
const handleIndex:
    (req: express.Request, res: express.Response, next: express.NextFunction) => void =
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.render("index");
    };

/**
 * Used to route "/".
 * "/" Sends the index page which requires the list of PCs.
 * "/:pc" sends a json response of the pc status and users online.
 * @type {Router} express router object.
 */
const indexRouter = express.Router();
indexRouter.get("/", handleIndex);

export default indexRouter;
