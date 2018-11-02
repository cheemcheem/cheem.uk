import * as express from 'express';
import listOfPCs from "./utilities";
import {exec} from "child_process";
import roomStoreImpl from "../shared/roomStoreImpl";
import {createPCQueryResponse, PCQueryResponse} from "../shared/pcQueryResponse";


const list: Map<String, PCQueryResponse> = new Map<String, PCQueryResponse>();

function update() {
    listOfPCs.forEach(value => {
        // Create query WITHOUT ANY RECEIVED DATA
        const user = process.env.USER;
        const command = `ssh -o "StrictHostKeyChecking no" -o ConnectTimeout=25 -o ConnectionAttempts=1 ${user}@${value} w -h`;

        // Execute query
        exec(command, ((error, stdout) => {
            list.set(value, parseExec(stdout, error));
        }));
    });
}

setInterval(() => update(), 30000);

/**
 * Handles creating a response object depending on different combinations of error and stdout.
 * @param stdout
 * @param error
 */
const parseExec:
    (stdout: string, error: Error) => PCQueryResponse =
    (stdout: string, error: Error) => {
        // If error communicating with pc then return early saying status down
        // status = down, users = []
        if (error) return createPCQueryResponse("down", [String(error)]);

        // Split grep response into each line
        let grepResponseLines = stdout.split("\n");

        // If no error communicating with pc and no users online then return early saying status active and no users
        // status = up, users = []
        if (grepResponseLines.length == 0) return createPCQueryResponse("up", [null]);

        // If no error communicating with pc and some users online then return early saying status active and some users
        // status = up, users = [...]
        // @ts-ignore
        let users: [string] = [];
        for (let i = 0; i < grepResponseLines.length; i++) {

            // Split line of grep response by " " and take first value for user name
            grepResponseLines[i] = grepResponseLines[i].split(" ")[0];

            // If username is not null then push to users list
            if (grepResponseLines[i] && grepResponseLines[i] !== '') {
                users.push(grepResponseLines[i]);

            }

            // If last iteration then send response
            if (i == grepResponseLines.length - 1) {
                return createPCQueryResponse("up", users);

            }

        }

        return createPCQueryResponse("down", ["actually"]);


    };

/**
 * Handles querying the requested pc and handles sending the response.
 * Works as middleware for an express router.
 * @param req {express.Request}
 * @param res {express.Response}
 * @param next {Function}
 */
const handleQuery:
    (req: express.Request, res: express.Response, next: Function) => void =
    (req: express.Request, res: express.Response, next: Function) => {

        // Set up id variable
        let id = req.params.pc;
        let idIndex = listOfPCs.indexOf(id);

        // If found then execute query to see if it is online and has active users and send response with details
        if (idIndex > -1) {

            const listElement = list.get(listOfPCs[idIndex]);
            res.send(listElement == null ? createPCQueryResponse("down", ["not found"]) : listElement);


        } else {

            // Hand off to error handler if PC is not found
            const err = new Error("Invalid PC Number.");

            // @ts-ignore
            err.status = 404;
            next(err);

        }
    };


const handleEntireQuery:
    (req: express.Request, res: express.Response, next: Function) => void =
    (req: express.Request, res: express.Response, next: Function) => {
        res.send(roomStoreImpl);
    };



const queryRouter = express.Router();
queryRouter.get('/all', handleEntireQuery);
queryRouter.get('/:pc', handleQuery);

export default queryRouter;