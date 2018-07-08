import * as express from 'express';
import {listOfPCs} from "./utilities";
import {exec} from "child_process";

/**
 * Used for response API to front end. Holds active status and list of online users per pc.
 */
interface PCQueryResponse {
    status: "up"| "down",
    users: [string | null]
}

/**
 * Create a json object to send back to as defined in API.
 * @param statusString
 * @param userArray
 * @return {PCQueryResponse}
 */
const createPCQueryResponse:
    (statusString: "up" | "down", userArray: [string | null]) => PCQueryResponse =
    (statusString: "up" | "down", userArray: [string | null]) => {
        return {
            status: statusString,
            users: userArray
        };
    };

/**
 * Handles creating a response object depending on different combinations of error and stdout.
 * @param res
 * @param stdout
 * @param error
 */
const handleSendResponse:
    (res: express.Response, stdout: string, error: Error) => void =
    (res: express.Response, stdout: string, error: Error) => {

        // Response is okay because pc not found is allowed
        res.status(200);

        // If error communicating with pc then return early saying status down
        // status = down, users = []
        if (error) return res.send(createPCQueryResponse("down", [null]));

        // Split grep response into each line
        let grepResponseLines = stdout.split("\n");


        // If no error communicating with pc and no users online then return early saying status active and no users
        // status = up, users = []
        if (grepResponseLines.length == 0) return res.send(createPCQueryResponse("up", [null]));

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
                return res.send(createPCQueryResponse("up", users));

            }

        }




    };

/**
 * Handles querying the requested pc and handles sending the response.
 * Works as middleware for an express router.
 * @param req {express.Request}
 * @param res {express.Response}
 * @param next {Function}
 */
export const handleQuery:
    (req: express.Request, res: express.Response, next: Function) => void =
    (req: express.Request, res: express.Response, next: Function) => {

        // Set up id variable
        let id = req.params.pc;
        let idIndex = listOfPCs.indexOf(id);

        // If found then execute query to see if it is online and has active users and send response with details
        if (idIndex > -1) {

            // Create query WITHOUT ANY RECEIVED DATA
            const user = process.env.USER;
            const command = `ssh -o "StrictHostKeyChecking no" -o ConnectTimeout=10 -o ConnectionAttempts=1 ${user}@${listOfPCs[idIndex]} w -h`;

            // Execute query
            exec(command, ((error, stdout, stderr) => {
                handleSendResponse(res, stdout, error);
            }));

        } else {

            // Hand off to error handler if PC is not found
            const err = new Error("Invalid PC Number.");

            // @ts-ignore
            err.status = 404;
            next(err);

        }
    };
