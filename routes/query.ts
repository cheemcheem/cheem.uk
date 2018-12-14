import * as express from 'express';
import * as deb from 'debug';
import * as cluster from "cluster";

import listOfPCs from "./utilities";
import { execSync } from "child_process";
import roomStoreImpl from "../shared/roomStoreImpl";
import { createPCQueryResponse, PCQueryResponse } from "../shared/pcQueryResponse";

const debugW = deb('worker:query');
const debugM = deb('master:master');
const queryRouter = express.Router();
export default queryRouter;

class MessageImpl {

    lowerIndex: number;
    upperIndex: number;

    constructor(lowerIndex: number, upperIndex: number) {
        this.lowerIndex = lowerIndex;
        this.upperIndex = upperIndex;
    }

}

const handleEntireQuery:
    (req: express.Request, res: express.Response, next: Function) => void =
    (req: express.Request, res: express.Response, next: Function) => {
        res.send(roomStoreImpl);
    };

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


const numberOfProcesses = 8;
if (cluster.isMaster) {

    const list: Map<String, PCQueryResponse> = new Map<String, PCQueryResponse>();

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

                const string = listOfPCs[idIndex];
                const listElement = list.get(string);
                res.send(listElement == null ? createPCQueryResponse("down", ["not found"]) : listElement);


            } else {

                // Hand off to error handler if PC is not found
                const err = new Error("Invalid PC Number.");

                // @ts-ignore
                err.status = 404;
                next(err);

            }
        };
    const handleUserQuery:
        (req: express.Request, res: express.Response, next: Function) => void =
        (req: express.Request, res: express.Response, next: Function) => {
            const user = req.params.user;
            const users: string[] = [];
            list.forEach((pcDetails, pcName) => {
                if (pcDetails.users.includes(user)) {
                    users.push(pcName.toString());
                }
            })
            res.send(users);
        };
    queryRouter.get('/all', handleEntireQuery);
    queryRouter.get('/user/:user', handleUserQuery);
    queryRouter.get('/pc/:pc', handleQuery);

    const increment = listOfPCs.length / numberOfProcesses;

    const workers: cluster.Worker[] = [];

    for (let i = 0; i < numberOfProcesses; i++) {
        const worker = cluster.fork();
        workers.push(worker);
        worker.on("message", message => {
            const key = String(message.key);
            const value = createPCQueryResponse(message.value.status, message.value.users);
            list.set(key, value);
        });
    }

    workers.forEach((worker, index) => {
        const lower = index * increment;
        const upper = lower + increment;
        const messageImpl = new MessageImpl(lower, upper);
        worker.send(messageImpl);
    });

    cluster.on('exit', (worker, code, signal) => {
        debugM(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}.`);
    });

}

if (cluster.isWorker) {
    process.on("message", (message) => {

        const lower = message.lowerIndex;
        const upper = message.upperIndex;

        function update() {
            for (let i = lower; i < upper; i++) {
                const pcName: string = listOfPCs[i];
                // Create query WITHOUT ANY RECEIVED DATA
                // const user = process.env.USER;

                const user = "kc67";
                const command = `ssh -o "StrictHostKeyChecking no" -o ConnectTimeout=20 -o ConnectionAttempts=1 ${user}@${pcName}.cs.st-andrews.ac.uk w -h`;

                // Execute query
                try {
                    const stdout = String(execSync(command));
                    const parsed = parseExec(stdout, null);
                    process.send({ key: pcName, value: parsed });
                } catch (e) {
                    process.send({ key: pcName, value: parseExec("", e) });
                }
            }
        }

        // only run this in production
        if (process.env.NODE_ENV === "production") {
            setInterval(() => update(), 30000);
        }
        debugW(`Worker ${process.pid} started.`);

    });

}

