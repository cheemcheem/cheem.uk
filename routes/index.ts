import * as deb from "debug";
import * as express from "express";

const debug = deb("cheem:app:index");
/**
 * Handles showing the index page with a list of pcs.
 * Works as middleware for an express router.
 * @param req {express.Request}
 * @param res {express.Response}
 * @param next {Function}
 */
const handleIndex: express.RequestHandler = (req, res) => {
    debug("Rendering Index.");
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
