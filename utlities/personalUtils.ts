import * as deb from "debug";
import express = require("express");

const debug = deb("cheem:app:index");
/**
 * Handles showing the index page with a list of pcs.
 * Works as middleware for an express router.
 * @param req {Request}
 * @param res {Response}
 */
export const handlePersonal: express.RequestHandler = (req, res) => {
    debug("Rendering Personal.");
    res.render("personal", {title: "Kathan Cheema - About"});
};
