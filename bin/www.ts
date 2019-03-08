#!/usr/bin/env node

import * as deb from "debug";
import * as http from "http";
/**
 * Module dependencies.
 */
import app from "../app";

const debug = deb("cheem:http");

/**
 * Get port from environment and store in Express.
 */
const port: string | number = normalizePort("8080");
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network shared.
 */
debug("Starting server.");
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
    const portVal = parseInt(val, 10);

    if (isNaN(portVal)) {
        // named pipe
        return val;
    }

    if (portVal >= 0) {
        // port number
        return portVal;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
    debug(`HTTP server error. Reason: ${JSON.stringify(error, null, 4)}.`);
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            debug(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            debug(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    debug(`Listening on ${bind}.`);
}
