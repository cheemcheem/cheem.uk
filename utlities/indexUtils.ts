import * as deb from "debug";
import express = require("express");

const debug = deb("cheem:app:index");
/**
 * Handles showing the index page with a list of pcs.
 * Works as middleware for an express router.
 * @param req {Request}
 * @param res {Response}
 */
export const handleIndex: express.RequestHandler = (req, res) => {
    debug("Rendering Index.");
    res.render("index", {title: "Kathan Cheema - Home"});
};
