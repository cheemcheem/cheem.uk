import * as express from 'express';
import listOfPCs from "./utilities";


/**
 * Handles showing the index page with a list of pcs.
 * Works as middleware for an express router.
 * @param req {express.Request}
 * @param res {express.Response}
 * @param next {Function}
 */
const handleLabs:
    (req: express.Request, res: express.Response, next: Function) => void =
    (req: express.Request, res: express.Response, next: Function) => {
        res.render('labs', {pcList: listOfPCs});
    };


/**
 * Used to route "/" and "/:pc".
 * "/" Sends the index page which requires the list of PCs.
 * "/:pc" sends a json response of the pc status and users online.
 * @type {Router} express router object.
 */
const labsRouter = express.Router();
labsRouter.get('/', handleLabs);
labsRouter.get('/:any', handleLabs);

export default labsRouter;
